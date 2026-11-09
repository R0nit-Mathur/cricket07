"use client";

import { useEffect, useState } from "react";
import { MODERN_SQUADS } from "./squads-data";

export default function Cricket07Page() {
  const [showRosters, setShowRosters] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("ind");
  

  useEffect(() => {
    // Hire banner dismissed state
    try {
      const KEY = "c07.hireDismissed";
      if (localStorage.getItem(KEY) !== "1") {
        document.body.classList.add("hire-on");
      }
      document.getElementById("hire-close")?.addEventListener("click", () => {
        document.body.classList.remove("hire-on");
        try { localStorage.setItem(KEY, "1"); } catch {}
        document.getElementById("canvas")?.focus();
      });
    } catch {}

    // Load netplay and c07 scripts in order
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    };

    let mounted = true;
    (async () => {
      try {
        await loadScript("/netplay.js");
        if (mounted) {
          await loadScript("/c07.js");
          
        }
      } catch (err) {
        console.error("Failed to load game scripts:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

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
        <path id="fs-icon" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
    </button>
    <div id="touch" aria-hidden="true">
      <div id="tpad"><svg viewBox="0 0 132 132" fill="currentColor"><path d="M66 10l7 9h-14zM66 122l7-9h-14zM10 66l9-7v14zM122 66l-9-7v14z"/></svg><div className="knob"></div></div>
      <div id="tdpad">
        <div data-dir="ArrowUp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l7 10H5z"/></svg></div>
        <div data-dir="ArrowLeft"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 12l10-7v14z"/></svg></div>
        <div className="hub"></div>
        <div data-dir="ArrowRight"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 12L8 5v14z"/></svg></div>
        <div data-dir="ArrowDown"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l7-10H5z"/></svg></div>
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
          <rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>
        <h2 id="gate-title"></h2>
        <div id="gate-text"></div>
        <button id="gate-btn" className="btn hidden" type="button"></button>
      </div>
    </div>
    <div id="fstip" className="hidden">Press <kbd>Alt</kbd> + <kbd>Enter</kbd> for fullscreen</div>
    <div id="panel">
      <div id="hire" role="region" aria-label="Hiring note">
        <span>I built this project and I’m open to new opportunities (engineering roles).</span>
        <a href="https://twitter.com/dhaiwat" target="_blank" rel="noopener">Shoot me a message</a>
        <button id="hire-close" type="button" aria-label="Dismiss" title="Dismiss">×</button>
      </div>
      

      
      <div id="install" className="hidden"></div>

      
      <section id="view-loading" className="view">
        <div className="brand"><img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" /></div>
        <p id="status">Checking your browser…</p>
        <progress id="progress" className="hidden" max="1" value="0" />
        <div>
          <label id="pick" className="btn hidden" style={{marginTop: "16px"}}>Choose game folder
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
              <path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg></span>
            <span className="mode-head"><b>Regular</b><span id="mode-full-size" className="mode-size"></span></span>
            <span className="mode-desc">The whole game, with commentary and the full soundtrack.</span>
          </button>
          <button id="mode-lite" className="mode lite">
            <span className="mode-head"><b>Lite</b><span id="mode-lite-size" className="mode-size"></span></span>
            <span className="mode-desc">No commentary and only one song. Get the full version anytime later.</span>
          </button>
        </div>
      </section>

      
      <section id="view-home" className="view hidden">
        <div className="brand"><img src="/cricket07-logo.png" width="520" height="306" alt="EA Sports Cricket 07" /></div>
        <p className="tagline">Pick how you want to play.</p>
        <div className="choices">
          <button id="play" className="choice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14.5 3.5l6 6-9.5 9.5-3 .5-3.5-3.5.5-3z"/><path d="M4.5 19.5L3 21"/><circle cx="18.5" cy="18.5" r="2"/></svg>
            <b>Play Solo</b>
            <span>Offline, against the computer or with controllers on this device.</span>
          </button>
          <button id="go-online" className="choice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2.5 19c.7-3 2.9-5 5.5-5s4.8 2 5.5 5"/><path d="M13.5 14.6c.8-.4 1.6-.6 2.5-.6 2.6 0 4.8 2 5.5 5"/></svg>
            <b>Play Multiplayer</b>
            <span>Online 1v1 with a friend, wherever they are.</span>
            <span id="mp-notice" className="choice-notice" style={{color: "#4ade80"}}>⚡ Multiplayer Online Active · Free WebRTC Direct P2P &amp; Cloudflare Relay</span>
          </button>
        </div>

        <div style={{marginTop: "16px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap"}}>
          <button
            type="button"
            onClick={() => setShowRosters(true)}
            className="btn ghost"
            style={{display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer"}}
          >
            <span>🏏</span> <b>View 2026 Squads &amp; Rosters (SENA, India, Pak)</b>
          </button>
        </div>

        <p id="lite-note" className="small hidden" style={{marginTop: "18px"}}>You&apos;re playing the lite version.
          <button id="get-full" className="btn ghost" style={{marginLeft: "8px", padding: "6px 12px"}}></button></p>
        <p className="small" style={{marginTop: "22px"}}><span className="kbd-hint">Use a controller, or the keyboard: arrows to move, S to select.</span><span className="touch-hint">On-screen controls appear once the game starts; a controller works too.</span><span className="fs-hint"><br />
          Fullscreen: <kbd>Alt</kbd> + <kbd>Enter</kbd> (<kbd>⌥</kbd> + <kbd>Enter</kbd> on Mac) or the button in the corner.</span></p>
      </section>

      
      <section id="view-online" className="view hidden">
        <button className="back" data-go="home">← Back</button>
        <div className="stack">
          <div>
            <h2 className="title">Play Multiplayer</h2>
            <p className="small" style={{margin: "4px 0 0"}}>Online 1v1. Each player needs a controller or the keyboard.</p>
          </div>
          <label className="field">Your name
            <input id="np-name" placeholder="Player" maxLength={24} autoComplete="nickname" />
          </label>
          <div className="card">
            <h2>Host a game</h2>
            <p className="small" style={{margin: "0 0 12px"}}>Get a room code to send to your friend.</p>
            <button id="np-host" className="btn" style={{width: "100%"}}>Create room</button>
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
              <p className="small" style={{margin: "8px 0 0"}}>For friends in another country, a server between you is fairest.</p>
            </details>
          </div>
          <div className="or">or</div>
          <div className="card">
            <h2>Join a game</h2>
            <p className="small" style={{margin: "0 0 12px"}}>Enter the code your friend sent you.</p>
            <div className="row">
              <input id="np-code" placeholder="ROOM CODE" maxLength={12} autoCapitalize="characters" autoComplete="off" spellCheck={false} />
              <button id="np-join" className="btn ghost">Join</button>
            </div>
          </div>
          <p id="np-msg" className="msg"></p>
          <button id="np-retry" className="btn ghost hidden" style={{justifySelf: "center"}}>Try the download again</button>
        </div>
      </section>

      
      <section id="view-lobby" className="view hidden">
        <button id="np-leave" className="back">← Leave room</button>
        <div className="stack">
          <div>
            <p className="small" style={{margin: "0"}}>Room code</p>
            <div className="code" id="np-room"></div>
            <p className="small" style={{margin: "0"}}><span id="np-colo"></span></p>
            <button id="np-copy" className="btn ghost" style={{marginTop: "12px"}}>Copy invite link</button>
            <span id="invite" className="hidden"></span>
          </div>
          <ul className="players" id="np-players"></ul>
          <div id="np-hostctl" className="hidden">
            <button id="np-start" className="btn" style={{width: "100%"}}>Start match</button>
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
              <p className="small" style={{margin: "8px 0 0"}}>Auto picks the lowest delay your connection allows. Higher is smoother on a bad link; 2 or 3 frames need a direct connection in the same city or country.</p>
            </details>
          </div>
          <p id="np-wait" className="hidden small"><span className="spinner"></span>Waiting for the host to start.</p>
          <p id="np-lobbymsg" className="msg"></p>
        </div>
      </section>

    </div>
  </div>
  <aside id="kbd" aria-label="Keyboard controls">
    <div className="kbd-head"><b>Keyboard controls</b>
      <button id="kbd-close" type="button" aria-label="Hide keyboard controls" title="Hide">×</button>
    </div>
    <h3>Batting</h3>
    <div className="row"><span className="label">Normal shot</span><div className="keys"><kbd>S</kbd></div></div>
    <div className="row"><span className="label">Lofted shot (hold)</span><div className="keys"><kbd>Shift</kbd></div></div>
    <div className="row"><span className="label">Advanced shot</span><div className="keys"><kbd>D</kbd></div></div>
    <div className="row"><span className="label">Shot direction</span><div className="keys"><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd></div></div>
    <div className="row"><span className="label">Take run</span><div className="keys"><kbd>D</kbd></div></div>
    <div className="row"><span className="label">Cancel run</span><div className="keys"><kbd>A</kbd></div></div>
    <h3>Bowling (Deliveries 1–8)</h3>
    <div className="row"><span className="label">Delivery 1 (Stock)</span><div className="keys"><kbd>1</kbd> / <kbd>S</kbd></div></div>
    <div className="row"><span className="label">Delivery 2 (Variation)</span><div className="keys"><kbd>2</kbd> / <kbd>D</kbd></div></div>
    <div className="row"><span className="label">Delivery 3 (Variation)</span><div className="keys"><kbd>3</kbd> / <kbd>A</kbd></div></div>
    <div className="row"><span className="label">Delivery 4 (Variation)</span><div className="keys"><kbd>4</kbd> / <kbd>W</kbd></div></div>
    <div className="row"><span className="label">Delivery 5 (Variation)</span><div className="keys"><kbd>5</kbd> / <kbd>Shift</kbd></div></div>
    <div className="row"><span className="label">Delivery 6 (Variation)</span><div className="keys"><kbd>6</kbd> / <kbd>Alt</kbd></div></div>
    <div className="row"><span className="label">Delivery 7–8</span><div className="keys"><kbd>7</kbd> <kbd>8</kbd></div></div>
    <div className="row"><span className="label">Place ball</span><div className="keys"><kbd>←</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>→</kbd></div></div>
    <h3>Menu</h3>
    <div className="row"><span className="label">Select</span><div className="keys"><kbd>S</kbd></div></div>
    <div className="row"><span className="label">Back</span><div className="keys"><kbd>W</kbd></div></div>
    <div className="row"><span className="label">Pause</span><div className="keys"><kbd>Esc</kbd></div></div>
    <div className="row"><span className="label">Fullscreen</span><div className="keys"><kbd>Alt</kbd>+<kbd>Enter</kbd></div></div>
    <h3>Load / Save</h3>
    <div className="row"><span className="label">Save type</span><div className="keys"><kbd>Shift</kbd> <kbd>Space</kbd></div></div>
    <div className="row"><span className="label">Delete save</span><div className="keys"><kbd>D</kbd></div></div>
    <div className="row"><span className="label">Name a save</span><div className="keys"><kbd>Enter</kbd></div></div>
  </aside>
  <p className="credit">Original game copyright of EA Sports · Ported to browser by <a href="https://twitter.com/dhaiwat" target="_blank" rel="noopener">Dhaiwat</a>
    <span id="visits">4,073,673 visits</span></p>
  <button id="kbd-show" type="button" aria-label="Show keyboard controls" title="Show keyboard controls">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M7 14h10" />
    </svg>
  </button>

  {showRosters && (
    <div style={{position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px"}}>
      <div style={{background: "#18181b", border: "1px solid #3f3f46", borderRadius: "16px", width: "100%", maxWidth: "820px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f4f4f5", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"}}>
        <div style={{padding: "16px 20px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <h2 style={{margin: 0, fontSize: "1.25rem", fontWeight: 700}}>🏏 Updated Modern 2026 Squads &amp; Rosters</h2>
            <p style={{margin: "4px 0 0", fontSize: "0.85rem", color: "#a1a1aa"}}>Authentic original names, modern stats &amp; ratings for SENA, India, Pakistan &amp; more</p>
          </div>
          <button
            type="button"
            onClick={() => setShowRosters(false)}
            style={{background: "#27272a", border: "none", color: "#e4e4e7", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center"}}
          >
            ✕
          </button>
        </div>

        <div style={{padding: "12px 20px", background: "rgba(59, 130, 246, 0.12)", borderBottom: "1px solid rgba(59, 130, 246, 0.25)", fontSize: "0.85rem", color: "#93c5fd", display: "flex", alignItems: "center", gap: "10px"}}>
          <span style={{fontSize: "1.2rem"}}>💡</span>
          <div>
            <b>How to load in-game:</b> Modern roster is auto-installed! In the main menu, go to <b>My Cricket ➔ Load / Save ➔ Load Roster</b> and select <b>MODERN26</b>!
          </div>
        </div>

        <div style={{display: "flex", gap: "8px", padding: "12px 20px", borderBottom: "1px solid #27272a", overflowX: "auto"}}>
          {MODERN_SQUADS.map((team) => (
            <button
              key={team.id}
              type="button"
              onClick={() => setSelectedTeam(team.id)}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: selectedTeam === team.id ? "1px solid #3b82f6" : "1px solid #3f3f46",
                background: selectedTeam === team.id ? "#1d4ed8" : "#27272a",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap"
              }}
            >
              <span>{team.flag}</span>
              <span>{team.name}</span>
            </button>
          ))}
        </div>

        <div style={{flex: 1, overflowY: "auto", padding: "16px 20px"}}>
          {(() => {
            const current = MODERN_SQUADS.find((t) => t.id === selectedTeam) || MODERN_SQUADS[0];
            return (
              <div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px"}}>
                  <h3 style={{margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px"}}>
                    <span>{current.flag}</span> {current.name} Squad ({current.players.length} Players)
                  </h3>
                  <div style={{fontSize: "0.85rem", color: "#a1a1aa"}}>
                    Captain: <b style={{color: "#fff"}}>{current.captain}</b> · WK: <b style={{color: "#fff"}}>{current.wicketkeeper}</b>
                  </div>
                </div>

                <table style={{width: "100%", borderCollapse: "collapse", fontSize: "0.9rem"}}>
                  <thead>
                    <tr style={{borderBottom: "1px solid #3f3f46", textAlign: "left", color: "#a1a1aa"}}>
                      <th style={{padding: "8px 12px"}}>#</th>
                      <th style={{padding: "8px 12px"}}>Player</th>
                      <th style={{padding: "8px 12px"}}>Role</th>
                      <th style={{padding: "8px 12px"}}>Style</th>
                      <th style={{padding: "8px 12px", textAlign: "right"}}>OVR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.players.map((p, idx) => (
                      <tr key={p.name} style={{borderBottom: "1px solid #27272a", background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"}}>
                        <td style={{padding: "8px 12px", color: "#71717a"}}>{idx + 1}</td>
                        <td style={{padding: "8px 12px", fontWeight: 600, color: "#fff"}}>{p.name}</td>
                        <td style={{padding: "8px 12px", color: "#d4d4d8"}}>{p.role}</td>
                        <td style={{padding: "8px 12px", color: "#a1a1aa"}}>{p.style}</td>
                        <td style={{padding: "8px 12px", textAlign: "right"}}>
                          <span style={{background: p.rating >= 93 ? "#15803d" : p.rating >= 88 ? "#1e40af" : "#3f3f46", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontWeight: 700, fontSize: "0.8rem"}}>
                            {p.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>

        <div style={{padding: "12px 20px", borderTop: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <a
            href="/rosters/MODERN26.ros/MODERN26.ros"
            download="MODERN26.ros"
            className="btn ghost"
            style={{padding: "6px 14px", fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px"}}
          >
            ⬇ Download MODERN26.ros
          </a>
          <button
            type="button"
            onClick={() => setShowRosters(false)}
            className="btn primary"
            style={{padding: "6px 20px", fontSize: "0.9rem"}}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )}
</main>

    </>
  );
}
