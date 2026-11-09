# cricket07

<div align="center">

# 🏏 EA SPORTS™ Cricket 07 — Web Port

### Made by Sarang Studios (Ronit Mathur)

A modern, high-performance web port of **EA Sports Cricket 07 (2006)** running directly in modern web browsers via WebAssembly, WebGPU, WebAudio, and WebRTC.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🌟 Key Features

- **🎮 1:1 Gameplay Experience:** Complete recreation of the legendary PC classic with 60 FPS gameplay, authentic commentary, replays, camera cuts, and stadium environments.
- **🏏 2026 Modern Squads & Rosters:** Updated rosters (`MODERN26.ros`) featuring authentic names and accurate ratings for **India, SENA (South Africa, England, New Zealand, Australia), and Pakistan**:
  - **India:** Rohit Sharma (C - 92), Virat Kohli (96), Jasprit Bumrah (97), Shubman Gill (88), Yashasvi Jaiswal (89), Rishabh Pant (89), Hardik Pandya (88), Ravindra Jadeja (90), Mohammed Shami (91), Mohammed Siraj (88), Kuldeep Yadav (89), Axar Patel (86).
  - **Australia:** Pat Cummins (C - 95), Travis Head (92), Steve Smith (94), Marnus Labuschagne (88), Glenn Maxwell (89), Mitchell Starc (93), Josh Hazlewood (93), Adam Zampa (90), Nathan Lyon (91).
  - **England:** Jos Buttler (C - 91), Ben Stokes (93), Joe Root (95), Harry Brook (90), Jonny Bairstow (87), Chris Woakes (87), Jofra Archer (91), Mark Wood (90), Adil Rashid (89).
  - **South Africa:** Temba Bavuma (C - 86), Quinton de Kock (92), Aiden Markram (89), Heinrich Klaasen (92), David Miller (89), Kagiso Rabada (94), Anrich Nortje (90), Keshav Maharaj (88).
  - **New Zealand:** Kane Williamson (C - 94), Devon Conway (88), Daryl Mitchell (89), Glenn Phillips (87), Rachin Ravindra (89), Trent Boult (91), Tim Southee (88), Matt Henry (88).
  - **Pakistan:** Babar Azam (C - 93), Mohammad Rizwan (90), Fakhar Zaman (87), Saim Ayub (85), Shaheen Shah Afridi (93), Naseem Shah (89), Haris Rauf (88).
- **⚡ Fixed Bowling Controls (Keys 1–8):** Direct 1:1 mapping from number row / numpad keys **1 through 8** directly to bowling delivery variations on the bowling HUD:
  - <kbd>1</kbd>: Stock delivery
  - <kbd>2</kbd>–<kbd>8</kbd>: Delivery variations & special balls
- **🌐 100% Free-Tier Deployment:**
  - **Vercel:** Frontend, static assets, WASM binaries & roster files
  - **Cloudflare Workers:** Ticket and signaling authentication (`/_netplay_ticket`)
  - **Cloudflare Durable Objects:** Netplay room lobbies & input relays
  - **WebRTC DataChannels:** Deterministic peer-to-peer 60 FPS online gameplay
  - **Public STUN:** NAT traversal via Cloudflare (`stun.cloudflare.com:3478`) and Google (`stun.l.google.com:19302`)

---

## 🕹️ Controls Guide

### Batting
- **Normal shot:** <kbd>S</kbd>
- **Lofted shot (hold):** <kbd>Shift</kbd>
- **Advanced / footwork:** <kbd>D</kbd>
- **Shot direction:** Arrow keys (<kbd>←</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>→</kbd>)
- **Take run / Cancel run:** <kbd>D</kbd> / <kbd>A</kbd>

### Bowling (Deliveries 1–8)
- **Delivery 1 (Stock):** <kbd>1</kbd> or <kbd>S</kbd>
- **Delivery 2 (Variation 2):** <kbd>2</kbd> or <kbd>D</kbd>
- **Delivery 3 (Variation 3):** <kbd>3</kbd> or <kbd>A</kbd>
- **Delivery 4 (Variation 4):** <kbd>4</kbd> or <kbd>W</kbd>
- **Delivery 5 (Variation 5):** <kbd>5</kbd> or <kbd>Shift</kbd>
- **Delivery 6 (Variation 6):** <kbd>6</kbd> or <kbd>Alt</kbd>
- **Delivery 7–8:** <kbd>7</kbd>, <kbd>8</kbd> or <kbd>Ctrl</kbd>, <kbd>Space</kbd>
- **Pitch marker position:** Arrow keys (<kbd>←</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>→</kbd>)

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/R0nit-Mathur/cricket07.git
cd cricket07

# Install dependencies (using pnpm)
pnpm install

# Start development / production server
PORT=8007 node server/start.mjs
```

Open [http://localhost:8007](http://localhost:8007) in any modern browser supporting WebGPU.

---

## ☁️ Deployment

### 1. Vercel (Frontend & WebAssembly)
Connect this repository to Vercel. Required headers are pre-configured in `vercel.json` and `next.config.ts`:
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Resource-Policy: cross-origin`

### 2. Cloudflare Workers (Multiplayer Rooms)
```bash
cd server
npx wrangler deploy
npx wrangler secret put NETPLAY_SECRET
```

---

## 👤 Author & Owner

**Sharang Studios (Ronit Mathur)**
- GitHub: [@R0nit-Mathur](https://github.com/R0nit-Mathur)

---

## 📜 Legal & Disclaimer

EA SPORTS™ Cricket 07 is a trademark of Electronic Arts Inc. This open-source preservation and web recompilation project is built for educational, research, and non-commercial archival purposes.
