"use client";

import { useEffect, useState } from "react";
import { MODERN_SQUADS, ENHANCED_STADIUMS } from "./squads-data";

export default function Cricket07Page() {
  const [showRosters, setShowRosters] = useState(false);
  const [showStadiums, setShowStadiums] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [teamCategory, setTeamCategory] = useState<"ipl" | "international">("ipl");
  const [selectedTeam, setSelectedTeam] = useState("csk");
  const [selectedStadium, setSelectedStadium] = useState("wankhede");

  useEffect(() => {
    // Load netplay and c07 scripts in order with duplicate protection
    const loadScript = (src: string) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    };

    (async () => {
      try {
        await loadScript("/netplay.js");
        await loadScript("/c07.js");
      } catch (err) {
        console.error("Failed to load game scripts:", err);
      }
    })();
  }, []);

  const launchGame = () => {
    const playBtn = document.getElementById("play");
    if (playBtn) playBtn.click();
  };

  const filteredSquads = MODERN_SQUADS.filter((t) => t.category === teamCategory);
  const currentTeam = filteredSquads.find((t) => t.id === selectedTeam) || filteredSquads[0] || MODERN_SQUADS[0];
  const currentStadium = ENHANCED_STADIUMS.find((s) => s.id === selectedStadium) || ENHANCED_STADIUMS[0];

  return (
    <>
      <main>
        <div id="stage">
          <canvas id="canvas" width="1024" height="768" tabIndex={0}></canvas>
          <div id="netstatus" className="hidden"></div>
          <div id="boot" className="hidden" role="status" aria-live="polite">
            <div className="boot-box">
              <img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" />
              <div className="bar"></div>
              <div id="boot-msg"></div>
              <p id="boot-hint" className="hidden">Still loading. On a phone this can take up to a minute.</p>
            </div>
          </div>
          <button id="fs" title="Fullscreen (Alt+Enter)" aria-label="Toggle fullscreen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path id="fs-icon" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
          <div id="touch" aria-hidden="true">
            <div id="tpad"><svg viewBox="0 0 132 132" fill="currentColor"><path d="M66 10l7 9h-14zM66 122l7-9h-14zM10 66l9-7v14zM122 66l-9-7v14z" /></svg><div className="knob"></div></div>
            <div id="tdpad">
              <div data-dir="ArrowUp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l7 10H5z" /></svg></div>
              <div data-dir="ArrowLeft"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 12l10-7v14z" /></svg></div>
              <div className="hub"></div>
              <div data-dir="ArrowRight"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 12L8 5v14z" /></svg></div>
              <div data-dir="ArrowDown"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l7-10H5z" /></svg></div>
            </div>
            <div id="tleft">
              <button className="shoulder" data-code="ControlLeft" tabIndex={-1}>Ctrl</button>
              <button data-code="Space" tabIndex={-1}>Space</button>
            </div>
            <div id="tright">
              <button className="shoulder" data-code="ShiftLeft" tabIndex={-1}>Shift</button>
              <button className="shoulder" data-code="AltLeft" tabIndex={-1}>Alt</button>
            </div>
            <div id="tbtns">
              <button className="face" data-code="KeyW" tabIndex={-1}>W</button>
              <button className="face" data-code="KeyA" tabIndex={-1}>A</button>
              <button className="face" data-code="KeyD" tabIndex={-1}>D</button>
              <button className="face" data-code="KeyS" tabIndex={-1}>S</button>
            </div>
            <div id="tmid">
              <button id="tpause" data-code="Escape" tabIndex={-1}>Esc</button>
              <button data-code="Enter" tabIndex={-1}>Enter</button>
            </div>
          </div>
          <div id="gate" className="hidden" role="dialog" aria-modal="true" aria-labelledby="gate-title">
            <div className="gate-box">
              <img className="gate-logo" src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" />
              <svg className="gate-rotate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" />
              </svg>
              <h2 id="gate-title"></h2>
              <div id="gate-text"></div>
              <button id="gate-btn" className="btn hidden" type="button"></button>
            </div>
          </div>
          <div id="fstip" className="hidden">Press <kbd>Alt</kbd> + <kbd>Enter</kbd> for fullscreen</div>
          <div id="panel">
            <div id="install" className="hidden"></div>

            <section id="view-loading" className="view">
              <div className="brand"><img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" /></div>
              <p id="status">Checking your browser…</p>
              <progress id="progress" className="hidden" max="1" value="0" />
              <div>
                <label id="pick" className="btn hidden" style={{ marginTop: "16px" }}>Choose game folder
                  <input id="folder" type="file" {...({ webkitdirectory: "" } as Record<string, string>)} multiple hidden />
                </label>
              </div>
              <p id="help" className="hidden small">Pick the folder that holds <b>Data</b>, <b>Audio</b> and the game&apos;s executable. It is copied
                into this browser&apos;s private storage once and never leaves your computer.</p>
            </section>

            <section id="view-mode" className="view hidden">
              <div className="brand"><img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" /></div>
              <div className="modes">
                <button id="mode-full" className="mode primary">
                  <span className="mode-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M4 19h16" /></svg></span>
                  <span className="mode-head"><b>Remastered Edition</b><span id="mode-full-size" className="mode-size"></span></span>
                  <span className="mode-desc">High fidelity WebGPU 4x MSAA, Richie Benaud commentary, and 48kHz audio.</span>
                </button>
                <button id="mode-lite" className="mode lite">
                  <span className="mode-head"><b>Lite</b><span id="mode-lite-size" className="mode-size"></span></span>
                  <span className="mode-desc">Fast download without commentary.</span>
                </button>
              </div>
            </section>

            <section id="view-home" className="view hidden">
              <div className="brand"><img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" /></div>

              {/* Remastered Feature Tags */}
              <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "14px" }}>
                <span style={{ fontSize: "0.72rem", background: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.4)", color: "#93c5fd", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 }}>
                  ⚡ WebGPU 4x MSAA
                </span>
                <span style={{ fontSize: "0.72rem", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#6ee7b7", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 }}>
                  🎨 16x Anisotropic Shaders
                </span>
                <span style={{ fontSize: "0.72rem", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.4)", color: "#fcd34d", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 }}>
                  🏆 IPL &amp; World Cup
                </span>
                <span style={{ fontSize: "0.72rem", background: "rgba(168, 85, 247, 0.2)", border: "1px solid rgba(168, 85, 247, 0.4)", color: "#d8b4fe", padding: "3px 8px", borderRadius: "12px", fontWeight: 600 }}>
                  🔊 48kHz Resampled Audio
                </span>
              </div>

              {/* Quick Launch Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px", width: "100%", maxWidth: "680px", margin: "0 auto 16px" }}>
                <div
                  onClick={launchGame}
                  style={{
                    background: "linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(2, 132, 199, 0.15))",
                    border: "1px solid rgba(234, 179, 8, 0.4)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.95rem", color: "#fef08a" }}>
                    <span>🏏</span> IPL El Clásico (CSK vs MI)
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#d4d4d8", marginTop: "4px" }}>
                    Dhoni, Jadeja vs Rohit, Bumrah at Wankhede Stadium.
                  </div>
                </div>

                <div
                  onClick={launchGame}
                  style={{
                    background: "linear-gradient(135deg, rgba(29, 78, 216, 0.15), rgba(234, 179, 8, 0.15))",
                    border: "1px solid rgba(59, 130, 246, 0.4)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.95rem", color: "#93c5fd" }}>
                    <span>🌍</span> World Cup: India vs Australia
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#d4d4d8", marginTop: "4px" }}>
                    Kohli, Rohit, Bumrah vs Cummins, Head, Starc at Ahmedabad.
                  </div>
                </div>
              </div>

              <div className="choices">
                <button id="play" className="choice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14.5 3.5l6 6-9.5 9.5-3 .5-3.5-3.5.5-3z" /><path d="M4.5 19.5L3 21" /><circle cx="18.5" cy="18.5" r="2" /></svg>
                  <b>Play Solo</b>
                  <span>Offline match, IPL Tournament &amp; World Cup campaigns.</span>
                </button>
                <button id="go-online" className="choice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M2.5 19c.7-3 2.9-5 5.5-5s4.8 2 5.5 5" /><path d="M13.5 14.6c.8-.4 1.6-.6 2.5-.6 2.6 0 4.8 2 5.5 5" /></svg>
                  <b>Play Multiplayer</b>
                  <span>Online 1v1 with WebRTC P2P low-latency netplay.</span>
                  <span id="mp-notice" className="choice-notice" style={{ color: "#4ade80" }}>⚡ Multiplayer Active · Free WebRTC Direct P2P &amp; Cloudflare Relay</span>
                </button>
              </div>

              {/* Hub Modals Buttons */}
              <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setShowRosters(true)}
                  className="btn ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", fontSize: "0.85rem" }}
                >
                  <span>📋</span> <b>2026 IPL &amp; International Squads</b>
                </button>
                <button
                  type="button"
                  onClick={() => setShowStadiums(true)}
                  className="btn ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", fontSize: "0.85rem" }}
                >
                  <span>🏟️</span> <b>Enhanced Stadiums &amp; Pitches</b>
                </button>
                <button
                  type="button"
                  onClick={() => setShowControls(true)}
                  className="btn ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", cursor: "pointer", fontSize: "0.85rem" }}
                >
                  <span>🎮</span> <b>Controls &amp; Gameplay Guide</b>
                </button>
              </div>

              <p id="lite-note" className="small hidden" style={{ marginTop: "18px" }}>You&apos;re playing the lite version.
                <button id="get-full" className="btn ghost" style={{ marginLeft: "8px", padding: "6px 12px" }}></button></p>
              <p className="small" style={{ marginTop: "20px" }}>
                <span className="kbd-hint">Keyboard: Arrows (Footwork / Pitch marker) · W/A/S/D/Space (Shots / Bowling) · Shift (Advance/Loft)</span>
                <span className="touch-hint">On-screen controls appear once the game starts; gamepads supported natively with haptic rumble.</span>
                <span className="fs-hint"><br />
                  Fullscreen: <kbd>Alt</kbd> + <kbd>Enter</kbd> (<kbd>⌥</kbd> + <kbd>Enter</kbd> on Mac) or the corner icon.</span>
              </p>
            </section>

            <section id="view-online" className="view hidden">
              <button className="back" data-go="home">← Back</button>
              <div className="stack">
                <div>
                  <h2 className="title">Play Multiplayer</h2>
                  <p className="small" style={{ margin: "4px 0 0" }}>Online 1v1. Each player needs a controller or the keyboard.</p>
                </div>
                <label className="field">Your name
                  <input id="np-name" placeholder="Player" maxLength={24} autoComplete="nickname" />
                </label>
                <div className="card">
                  <h2>Host a game</h2>
                  <p className="small" style={{ margin: "0 0 12px" }}>Get a room code to send to your friend.</p>
                  <button id="np-host" className="btn" style={{ width: "100%" }}>Create room</button>
                  <details>
                    <summary>Server location</summary>
                    <label>Room server
                      <select id="np-region" defaultValue="auto">
                        <option value="auto">Nearest to me</option><option value="weur">Western Europe</option>
                        <option value="eeur">Eastern Europe</option><option value="enam">Eastern North America</option>
                        <option value="wnam">Western North America</option><option value="sam">South America</option>
                        <option value="apac">Asia-Pacific</option><option value="apac-ne">Northeast Asia</option>
                        <option value="apac-se">Southeast Asia</option><option value="oc">Oceania</option>
                      </select>
                    </label>
                    <p className="small" style={{ margin: "8px 0 0" }}>For friends in another country, a server between you is fairest.</p>
                  </details>
                </div>
                <div className="or">or</div>
                <div className="card">
                  <h2>Join a game</h2>
                  <p className="small" style={{ margin: "0 0 12px" }}>Enter the code your friend sent you.</p>
                  <div className="row">
                    <input id="np-code" placeholder="ROOM CODE" maxLength={12} autoCapitalize="characters" autoComplete="off" spellCheck={false} />
                    <button id="np-join" className="btn ghost">Join</button>
                  </div>
                </div>
                <p id="np-msg" className="msg"></p>
                <button id="np-retry" className="btn ghost hidden" style={{ justifySelf: "center" }}>Try the download again</button>
              </div>
            </section>

            <section id="view-lobby" className="view hidden">
              <button id="np-leave" className="back">← Leave room</button>
              <div className="stack">
                <div>
                  <p className="small" style={{ margin: "0" }}>Room code</p>
                  <div className="code" id="np-room"></div>
                  <p className="small" style={{ margin: "0" }}><span id="np-colo"></span></p>
                  <button id="np-copy" className="btn ghost" style={{ marginTop: "12px" }}>Copy invite link</button>
                  <span id="invite" className="hidden"></span>
                </div>
                <ul className="players" id="np-players"></ul>
                <div id="np-wait" className="small" style={{ textAlign: "center", color: "#a1a1aa" }}>Waiting for players to join…</div>
                <p id="np-lobbymsg" className="msg"></p>
                <div id="np-hostctl" className="hidden">
                  <button id="np-start" className="btn" style={{ width: "100%" }}>Start match</button>
                  <details>
                    <summary>Input delay</summary>
                    <label>Delay
                      <select id="np-delay" defaultValue="auto">
                        <option value="auto">Auto</option><option value="2">2 frames (33 ms)</option>
                        <option value="3">3 frames (50 ms)</option><option value="4">4 frames (67 ms)</option>
                        <option value="5">5 frames (83 ms)</option><option value="6">6 frames (100 ms)</option>
                        <option value="8">8 frames (133 ms)</option><option value="10">10 frames (167 ms)</option>
                        <option value="12">12 frames (200 ms)</option><option value="18">18 frames (300 ms)</option>
                      </select>
                    </label>
                    <p className="small" style={{ margin: "8px 0 0" }}>Auto picks lowest delay. Higher is smoother on a high ping connection.</p>
                  </details>
                </div>
              </div>
            </section>
            <div id="kbd-panel" className="hidden">
              <button id="kbd-close" type="button" aria-hidden="true"></button>
              <button id="kbd-show" type="button" aria-hidden="true"></button>
            </div>
          </div>
        </div>

        {/* ── 1. ROSTER & SQUADS MODAL ── */}
        {showRosters && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "16px", width: "100%", maxWidth: "860px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f4f4f5", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>🏏 Modern 2026 Squads &amp; Ratings</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#a1a1aa" }}>Authentic player ratings, bowling styles, and roles (IPL 10 Teams + World Cup Top Nations)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRosters(false)}
                  style={{ background: "#27272a", border: "none", color: "#e4e4e7", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>

              {/* Tournament category toggle */}
              <div style={{ display: "flex", gap: "8px", padding: "10px 20px", background: "#121214", borderBottom: "1px solid #27272a" }}>
                <button
                  type="button"
                  onClick={() => { setTeamCategory("ipl"); setSelectedTeam("csk"); }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: teamCategory === "ipl" ? "#facc15" : "transparent",
                    color: teamCategory === "ipl" ? "#000" : "#a1a1aa",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  🏆 IPL (14 Franchises)
                </button>
                <button
                  type="button"
                  onClick={() => { setTeamCategory("international"); setSelectedTeam("ind"); }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: teamCategory === "international" ? "#3b82f6" : "transparent",
                    color: teamCategory === "international" ? "#fff" : "#a1a1aa",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  🌍 World Cup (8 Nations)
                </button>
              </div>

              {/* Team list selector */}
              <div style={{ display: "flex", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #27272a", overflowX: "auto" }}>
                {filteredSquads.map((team) => (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => setSelectedTeam(team.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: selectedTeam === team.id ? `2px solid ${team.jerseyColor}` : "1px solid #3f3f46",
                      background: selectedTeam === team.id ? "rgba(255,255,255,0.12)" : "#27272a",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <span>{team.flag}</span>
                    <span>{team.shortName}</span>
                  </button>
                ))}
              </div>

              {/* Players table */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{currentTeam.flag}</span> {currentTeam.name} ({currentTeam.players.length} Players)
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
                    Captain: <b style={{ color: "#fff" }}>{currentTeam.captain}</b> · WK: <b style={{ color: "#fff" }}>{currentTeam.wicketkeeper}</b>
                  </div>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #3f3f46", textAlign: "left", color: "#a1a1aa" }}>
                      <th style={{ padding: "8px 12px" }}>#</th>
                      <th style={{ padding: "8px 12px" }}>Player</th>
                      <th style={{ padding: "8px 12px" }}>Role</th>
                      <th style={{ padding: "8px 12px" }}>Style</th>
                      <th style={{ padding: "8px 12px", textAlign: "right" }}>OVR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeam.players.map((p, idx) => (
                      <tr key={p.name} style={{ borderBottom: "1px solid #27272a", background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                        <td style={{ padding: "8px 12px", color: "#71717a" }}>{idx + 1}</td>
                        <td style={{ padding: "8px 12px", fontWeight: 600, color: "#fff" }}>{p.name}</td>
                        <td style={{ padding: "8px 12px", color: "#d4d4d8" }}>{p.role}</td>
                        <td style={{ padding: "8px 12px", color: "#a1a1aa" }}>{p.style}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right" }}>
                          <span style={{ background: p.rating >= 94 ? "#15803d" : p.rating >= 89 ? "#1e40af" : "#3f3f46", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem" }}>
                            {p.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>Auto-installed to OPFS on startup · Direct playable in Exhibition &amp; Tournaments</span>
                <button
                  type="button"
                  onClick={() => setShowRosters(false)}
                  className="btn primary"
                  style={{ padding: "6px 20px", fontSize: "0.9rem" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. STADIUMS & PITCHES MODAL ── */}
        {showStadiums && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "16px", width: "100%", maxWidth: "800px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f4f4f5", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>🏟️ Reworked &amp; Enhanced Stadiums</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#a1a1aa" }}>Top 4 IPL &amp; World Cup Venues with authentic pitch characteristics and bounce profiles</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowStadiums(false)}
                  style={{ background: "#27272a", border: "none", color: "#e4e4e7", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>

              {/* Stadium selection tabs */}
              <div style={{ display: "flex", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #27272a", overflowX: "auto" }}>
                {ENHANCED_STADIUMS.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStadium(st.id)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: selectedStadium === st.id ? "1px solid #10b981" : "1px solid #3f3f46",
                      background: selectedStadium === st.id ? "#065f46" : "#27272a",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {st.name}
                  </button>
                ))}
              </div>

              {/* Stadium details */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: "1.3rem", color: "#34d399" }}>{currentStadium.name}</h3>
                <p style={{ margin: "0 0 16px", color: "#a1a1aa", fontSize: "0.9rem" }}>{currentStadium.city} · Home of {currentStadium.homeTeam}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ background: "#27272a", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#a1a1aa", textTransform: "uppercase" }}>Capacity &amp; Boundary</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: "4px" }}>{currentStadium.capacity}</div>
                    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>{currentStadium.boundary}</div>
                  </div>
                  <div style={{ background: "#27272a", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#a1a1aa", textTransform: "uppercase" }}>Pitch Type &amp; Soil</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, marginTop: "4px", color: "#fcd34d" }}>{currentStadium.pitchType}</div>
                    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>{currentStadium.soil}</div>
                  </div>
                  <div style={{ background: "#27272a", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#a1a1aa", textTransform: "uppercase" }}>Pace, Bounce &amp; Spin</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, marginTop: "4px" }}>{currentStadium.paceBounce}</div>
                    <div style={{ fontSize: "0.85rem", color: "#a7f3d0" }}>{currentStadium.spinLevel}</div>
                  </div>
                </div>

                <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "8px", padding: "14px" }}>
                  <h4 style={{ margin: "0 0 6px", fontSize: "0.95rem", color: "#6ee7b7" }}>Match Environment &amp; Conditions</h4>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#d1fae5", lineHeight: 1.5 }}>{currentStadium.description}</p>
                </div>
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowStadiums(false)}
                  className="btn primary"
                  style={{ padding: "6px 20px", fontSize: "0.9rem" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. CONTROLS CHEATSHEET MODAL ── */}
        {showControls && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            <div style={{ background: "#18181b", border: "1px solid #3f3f46", borderRadius: "16px", width: "100%", maxWidth: "760px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f4f4f5", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>🎮 Controls &amp; Gameplay Cheatsheet</h2>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#a1a1aa" }}>Master Century batting strokes, yorker lengths, and fielding throws</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowControls(false)}
                  style={{ background: "#27272a", border: "none", color: "#e4e4e7", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {/* Batting */}
                <div style={{ background: "#27272a", borderRadius: "10px", padding: "14px" }}>
                  <h3 style={{ margin: "0 0 10px", fontSize: "1rem", color: "#60a5fa", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>🏏</span> Batting Controls
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", lineHeight: 1.8, color: "#e4e4e7" }}>
                    <li><b>Arrow Keys / Left Stick:</b> Footwork (Front foot / Back foot)</li>
                    <li><b>S Key / Ⓧ Button:</b> Defensive stroke / Block</li>
                    <li><b>D Key / Ⓨ Button:</b> Standard drive / Ground shot</li>
                    <li><b>W Key / Ⓑ Button:</b> Attacking lofted stroke / Six hitting</li>
                    <li><b>Shift + Direction:</b> Charge down the pitch / Step out</li>
                    <li><b>Spacebar:</b> Cancel run / Back to crease</li>
                  </ul>
                </div>

                {/* Bowling */}
                <div style={{ background: "#27272a", borderRadius: "10px", padding: "14px" }}>
                  <h3 style={{ margin: "0 0 10px", fontSize: "1rem", color: "#34d399", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>🎯</span> Bowling Controls
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.85rem", lineHeight: 1.8, color: "#e4e4e7" }}>
                    <li><b>Arrow Keys:</b> Aim pitch target circle (Yorker/Bouncer)</li>
                    <li><b>S / D / W Keys:</b> Select delivery (Outswing, Inswing, Cutter)</li>
                    <li><b>Action Button (Timing Bar):</b> Tap in green zone for max pace</li>
                    <li><b>Left / Right on release:</b> Fine seam / wrist orientation</li>
                    <li><b>Ctrl / Shoulder:</b> Change bowling side (Over/Around wicket)</li>
                  </ul>
                </div>

                {/* Gamepad / Vibration */}
                <div style={{ background: "#27272a", borderRadius: "10px", padding: "14px", gridColumn: "1 / -1" }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1rem", color: "#facc15" }}>🕹️ Gamepad Support &amp; Haptic Rumble</h3>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#d4d4d8", lineHeight: 1.5 }}>
                    Connect any Xbox, PlayStation, or generic USB/Bluetooth controller. Dual analog deadzone filtering is active (0.12 deadzone with non-linear curve) to prevent stick drift, and dual-motor haptic vibration triggers on edges, wicket knocks, and boundary hits!
                  </p>
                </div>
              </div>

              <div style={{ padding: "12px 20px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowControls(false)}
                  className="btn primary"
                  style={{ padding: "6px 20px", fontSize: "0.9rem" }}
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
