// Node.js WebSocket netplay server for Cricket 07
import { WebSocketServer } from "ws";

const TICKET_SECRET = process.env.NETPLAY_SECRET || "cricket07-secret-salt-2026";
const MAX_PLAYERS = 4;
const REJOIN_GRACE_MS = 15000;

class Room {
  constructor(code) {
    this.code = code;
    this.peers = new Map(); // ws -> { slot, name, version, rtt, p2p, via }
    this.started = null;
    this.away = {};
    this.colo = "local";
  }

  getPlayers() {
    return Array.from(this.peers.values())
      .filter((p) => p.slot >= 0)
      .map(({ slot, name, version, rtt, p2p, via }) => ({
        slot,
        name,
        version,
        rtt: rtt || 0,
        p2p: p2p || {},
        via: via || "local",
      }))
      .sort((a, b) => a.slot - b.slot);
  }

  send(ws, msg) {
    if (ws.readyState === 1) {
      try {
        ws.send(JSON.stringify(msg));
      } catch {
        // closed
      }
    }
  }

  broadcastLobby() {
    const players = this.getPlayers();
    for (const [ws, p] of this.peers) {
      if (p.slot >= 0) {
        this.send(ws, {
          t: "lobby",
          you: p.slot,
          host: p.slot === 0,
          players,
          started: this.started,
          colo: this.colo,
        });
      }
    }
  }

  handleMessage(ws, data) {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      return;
    }
    const me = this.peers.get(ws);
    if (!me) return;

    if (msg.t === "hello" && me.slot < 0) {
      if (this.started) {
        this.send(ws, { t: "error", msg: "This game has already started." });
        ws.close(4000, "started");
        return;
      }
      const used = new Set(Array.from(this.peers.values()).map((p) => p.slot));
      let slot = 0;
      while (used.has(slot)) slot++;
      if (slot >= MAX_PLAYERS) {
        this.send(ws, { t: "error", msg: "The room is full." });
        ws.close(4001, "full");
        return;
      }
      me.slot = slot;
      me.name = String(msg.name || `Player ${slot + 1}`).slice(0, 24);
      me.version = String(msg.version || "");
      me.rtt = 0;
      this.broadcastLobby();
      return;
    }

    if (msg.t === "ping") {
      this.send(ws, { t: "pong", ts: msg.ts });
      return;
    }

    if (msg.t === "rejoin" && me.slot < 0) {
      const slot = Number(msg.slot);
      if (!this.started || !(slot in this.away) || Array.from(this.peers.values()).some((p) => p.slot === slot)) {
        this.send(ws, { t: "error", msg: "Could not rejoin the game." });
        ws.close(4002, "rejoin");
        return;
      }
      me.slot = slot;
      delete this.away[slot];
      this.send(ws, { t: "rejoined", slot });
      return;
    }

    if (me.slot < 0) return;

    if (msg.t === "rtt") {
      me.rtt = Math.max(0, Math.min(5000, Math.round(Number(msg.ms) || 0)));
      if (!this.started) this.broadcastLobby();
      return;
    }

    if (msg.t === "p2p") {
      const p2p = {};
      for (const [k, v] of Object.entries(msg.rtt || {})) {
        p2p[Number(k)] = Math.max(0, Math.min(5000, Math.round(Number(v) || 0)));
      }
      me.p2p = p2p;
      if (!this.started) this.broadcastLobby();
      return;
    }

    if (msg.t === "start" && me.slot === 0 && !this.started) {
      const players = this.getPlayers();
      const versions = new Set(players.map((p) => p.version));
      if (versions.size > 1) {
        this.send(ws, {
          t: "error",
          msg: "Players have different game builds or files; everyone must reload the page.",
        });
        return;
      }
      const slots = players.map((p) => p.slot).sort((a, b) => a - b);
      if (slots.some((s, i) => s !== i)) {
        this.send(ws, { t: "error", msg: "Waiting for the player list to settle; try again." });
        return;
      }
      this.started = { players: players.length, delay: Math.max(2, Math.min(30, Number(msg.delay) || 6)) };
      for (const [peerWs, p] of this.peers) {
        if (p.slot >= 0) {
          this.send(peerWs, { t: "start", ...this.started, you: p.slot });
        }
      }
      return;
    }

    if (msg.t === "sig") {
      for (const [peerWs, p] of this.peers) {
        if (p.slot === msg.to) {
          this.send(peerWs, { t: "sig", from: me.slot, data: msg.data });
        }
      }
      return;
    }

    if (msg.t === "in") {
      // Relay input frame to all other peers
      for (const [peerWs, p] of this.peers) {
        if (p.slot !== me.slot && peerWs.readyState === 1) {
          try {
            peerWs.send(data);
          } catch {
            // closed
          }
        }
      }
    }
  }

  handleClose(ws) {
    const me = this.peers.get(ws);
    if (!me || me.slot < 0) {
      this.peers.delete(ws);
      return;
    }
    const slot = me.slot;
    this.peers.delete(ws);

    if (!this.started) {
      for (const [peerWs, p] of this.peers) {
        this.send(peerWs, { t: "left", slot });
      }
      this.broadcastLobby();
    } else {
      this.away[slot] = { slot, at: Date.now() };
      setTimeout(() => {
        if (this.away[slot]) {
          delete this.away[slot];
          for (const [peerWs, p] of this.peers) {
            this.send(peerWs, { t: "left", slot });
          }
        }
      }, REJOIN_GRACE_MS);
    }
  }
}

const rooms = new Map();

function getRoom(code) {
  const norm = code.toUpperCase();
  if (!rooms.has(norm)) {
    rooms.set(norm, new Room(norm));
  }
  return rooms.get(norm);
}

export function setupNetplayWebSocket(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname.startsWith("/netplay/")) {
      const code = url.pathname.slice("/netplay/".length);
      if (!/^[A-Z0-9]{4,12}$/i.test(code)) {
        socket.destroy();
        return;
      }
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request, code);
      });
    }
  });

  wss.on("connection", (ws, request, code) => {
    const room = getRoom(code);
    room.peers.set(ws, { slot: -1, name: "", version: "", rtt: 0, via: "local" });

    ws.on("message", (data) => room.handleMessage(ws, data));
    ws.on("close", () => {
      room.handleClose(ws);
      if (room.peers.size === 0 && !room.started) {
        rooms.delete(code.toUpperCase());
      }
    });
    ws.on("error", () => room.handleClose(ws));
  });

  return wss;
}

