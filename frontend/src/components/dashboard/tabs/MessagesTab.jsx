import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  X,
  Bell,
  Search,
  ChevronRight,
  Scale,
  MessageSquare,
  Circle,
} from "lucide-react";

/* ─── Same design tokens as FirTab / ConsultationsTab ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .msg-root * { box-sizing: border-box; }

  .msg-root {
    --gold: #C9A84C;
    --gold-light: #E2C070;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.25);
    --bg: #0A0A0B;
    --surface: #111114;
    --surface2: #18181C;
    --surface3: #222228;
    --text: #F0EDE6;
    --text-muted: #7A7880;
    --text-dim: #4A4855;
    --red: #E05A4E;
    --green: #4EBF8A;
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
  }

  .msg-root ::-webkit-scrollbar { width: 4px; }
  .msg-root ::-webkit-scrollbar-track { background: transparent; }
  .msg-root ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  .msg-root .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .msg-root .radial-glow {
    position: fixed; pointer-events: none; z-index: 0;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: -200px;
  }

  .msg-root .layout {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
  }

  /* Header */
  .msg-root .header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 32px;
  }
  .msg-root .header-left { display: flex; align-items: center; gap: 14px; }
  .msg-root .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .msg-root .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 24px); font-weight: 700; letter-spacing: -0.3px;
    color: var(--text); margin: 0;
  }
  .msg-root .header-subtitle {
    font-size: 12px; color: var(--text-muted); margin: 2px 0 0; letter-spacing: 0.3px;
  }

  /* Info tiles */
  .msg-root .info-tiles {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;
  }
  @media (max-width: 600px) { .msg-root .info-tiles { grid-template-columns: 1fr 1fr; } }
  .msg-root .info-tile {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
  }
  .msg-root .info-tile-label {
    font-size: 10px; letter-spacing: 0.6px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 4px;
  }
  .msg-root .info-tile-val { font-size: 14px; font-weight: 600; color: var(--text); }

  /* Content grid */
  .msg-root .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 768px) { .msg-root .content-grid { grid-template-columns: 1fr; } }

  /* Cards */
  .msg-root .card {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
  }
  .msg-root .card-header {
    padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .msg-root .card-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .msg-root .card-title { font-size: 14px; font-weight: 600; color: var(--text); margin: 0; }
  .msg-root .card-body { padding: 20px; }

  /* Search bar */
  .msg-root .search-row {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 9px 14px; margin-bottom: 14px;
  }
  .msg-root .search-row input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif;
  }
  .msg-root .search-row input::placeholder { color: var(--text-dim); }

  /* Message thread list */
  .msg-root .thread-list {
    display: flex; flex-direction: column; gap: 8px;
    max-height: 400px; overflow-y: auto;
  }
  .msg-root .thread-item {
    display: flex; align-items: flex-start; gap: 12px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
    cursor: pointer; transition: border-color 0.2s;
  }
  .msg-root .thread-item:hover { border-color: var(--gold-border); }
  .msg-root .thread-item.active { border-color: var(--gold-border); background: rgba(201,168,76,0.06); }

  .msg-root .avatar {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: var(--gold);
    letter-spacing: 0.5px;
  }
  .msg-root .avatar.support {
    background: rgba(78,191,138,0.1); border-color: rgba(78,191,138,0.25); color: var(--green);
  }

  .msg-root .thread-content { flex: 1; min-width: 0; }
  .msg-root .thread-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 4px;
  }
  .msg-root .thread-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .msg-root .thread-time { font-size: 11px; color: var(--text-dim); white-space: nowrap; flex-shrink: 0; }
  .msg-root .thread-preview {
    font-size: 12px; color: var(--text-muted); line-height: 1.4;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .msg-root .unread-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
    flex-shrink: 0; margin-top: 5px;
    box-shadow: 0 0 6px rgba(201,168,76,0.5);
  }

  /* Chat panel */
  .msg-root .chat-panel { display: flex; flex-direction: column; height: 100%; }

  /* Chat header inside card */
  .msg-root .chat-meta {
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border); border-radius: 12px;
    padding: 14px 18px; display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .msg-root .chat-meta-name { font-size: 14px; font-weight: 600; color: var(--text); }
  .msg-root .chat-meta-role { font-size: 11px; color: var(--text-muted); margin-top: 1px; }
  .msg-root .status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.6); animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* Bubbles */
  .msg-root .bubbles-area {
    flex: 1; max-height: 260px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px;
    margin-bottom: 16px;
  }
  .msg-root .bubble-wrap { display: flex; flex-direction: column; }
  .msg-root .bubble-wrap.mine { align-items: flex-end; }

  .msg-root .bubble {
    max-width: 80%; border-radius: 12px;
    padding: 10px 14px; font-size: 13px; line-height: 1.5;
  }
  .msg-root .bubble.theirs {
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    color: var(--text); border-bottom-left-radius: 4px;
  }
  .msg-root .bubble.mine {
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    color: var(--text); border-bottom-right-radius: 4px;
  }
  .msg-root .bubble-sender {
    font-size: 10px; font-weight: 600; letter-spacing: 0.4px;
    color: var(--gold); margin-bottom: 3px; text-transform: uppercase;
  }
  .msg-root .bubble-time { font-size: 10px; color: var(--text-dim); margin-top: 4px; }

  .msg-root .msg-empty {
    text-align: center; padding: 32px 16px; color: var(--text-muted); font-size: 13px;
  }

  /* Input row */
  .msg-root .input-row { display: flex; gap: 10px; align-items: flex-end; }
  .msg-root .msg-input {
    flex: 1; background: var(--surface2); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 10px 14px; color: var(--text); font-size: 13px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
  }
  .msg-root .msg-input:focus { border-color: var(--gold-border); }
  .msg-root .msg-input::placeholder { color: var(--text-dim); }
  .msg-root .btn-send {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    color: var(--gold); display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.2s;
  }
  .msg-root .btn-send:hover { background: var(--gold); color: #0A0A0B; }

  /* Unread badge */
  .msg-root .unread-badge {
    background: var(--gold); color: #0A0A0B;
    font-size: 10px; font-weight: 700;
    padding: 1px 6px; border-radius: 10px; margin-left: auto;
  }
`;

/* ── Data ── */
const THREADS = [
  {
    id: 1,
    from: "Adv. Rajesh Kumar",
    role: "Criminal Law",
    initials: "RK",
    preview: "Please upload your ID proof.",
    time: "2h ago",
    unread: true,
    messages: [
      { id: 1, sender: "Adv. Rajesh Kumar", text: "Hello, I've reviewed your case documents.", time: "10:00 AM", mine: false },
      { id: 2, sender: "You", text: "Thank you for getting back to me.", time: "10:05 AM", mine: true },
      { id: 3, sender: "Adv. Rajesh Kumar", text: "Please upload your ID proof so we can proceed.", time: "10:08 AM", mine: false },
    ],
  },
  {
    id: 2,
    from: "Support Team",
    role: "LegalEase Support",
    initials: "ST",
    preview: "Your FIR draft is under review.",
    time: "1d ago",
    unread: false,
    isSupport: true,
    messages: [
      { id: 1, sender: "Support Team", text: "Your FIR draft has been received.", time: "Yesterday", mine: false },
      { id: 2, sender: "Support Team", text: "Your FIR draft is currently under review by our team.", time: "Yesterday", mine: false },
    ],
  },
];

/* ════════════════════════════════ */
const MessagesTab = () => {
  const [selected, setSelected] = useState(THREADS[0]);
  const [threads, setThreads] = useState(THREADS);
  const [newMsg, setNewMsg] = useState("");
  const [search, setSearch] = useState("");

  const filtered = threads.filter((t) =>
    t.from.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = threads.filter((t) => t.unread).length;

  const selectThread = (t) => {
    setSelected(t);
    setThreads((prev) =>
      prev.map((th) => (th.id === t.id ? { ...th, unread: false } : th))
    );
  };

  const sendMsg = () => {
    if (!newMsg.trim() || !selected) return;
    const msg = { id: Date.now(), sender: "You", text: newMsg, time: "Just now", mine: true };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selected.id
          ? { ...t, messages: [...t.messages, msg], preview: newMsg }
          : t
      )
    );
    setSelected((p) => ({ ...p, messages: [...p.messages, msg] }));
    setNewMsg("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="msg-root">
        <div className="grid-bg" />
        <div className="radial-glow" />

        <div className="layout">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <div className="header-icon">
                <MessageCircle size={20} color="var(--gold)" />
              </div>
              <div>
                <h1 className="header-title">Messages</h1>
                <p className="header-subtitle">Case communications & support</p>
              </div>
            </div>
          </div>

          {/* Info Tiles */}
          <div className="info-tiles">
            {[
              { label: "Total Threads", val: threads.length },
              { label: "Unread", val: unreadCount },
              { label: "Active Cases", val: 1 },
            ].map((t) => (
              <div className="info-tile" key={t.label}>
                <div className="info-tile-label">{t.label}</div>
                <div className="info-tile-val">{t.val}</div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="content-grid">
            {/* Left — thread list */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <MessageSquare size={15} color="var(--gold)" />
                </div>
                <h2 className="card-title">Conversations</h2>
                {unreadCount > 0 && (
                  <span className="unread-badge" style={{ marginLeft: "auto" }}>{unreadCount} new</span>
                )}
              </div>
              <div className="card-body">
                {/* Search */}
                <div className="search-row">
                  <Search size={14} color="var(--text-dim)" />
                  <input
                    placeholder="Search conversations…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* List */}
                <div className="thread-list">
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <Bell size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No conversations found</div>
                    </div>
                  ) : filtered.map((t) => (
                    <div
                      key={t.id}
                      className={`thread-item ${selected?.id === t.id ? "active" : ""}`}
                      onClick={() => selectThread(t)}
                    >
                      <div className={`avatar ${t.isSupport ? "support" : ""}`}>{t.initials}</div>
                      <div className="thread-content">
                        <div className="thread-top">
                          <div className="thread-name">{t.from}</div>
                          <div className="thread-time">{t.time}</div>
                        </div>
                        <div className="thread-preview">{t.preview}</div>
                      </div>
                      {t.unread && <div className="unread-dot" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — active chat */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(78,191,138,0.1)" }}>
                  <MessageCircle size={15} color="var(--green)" />
                </div>
                <h2 className="card-title">
                  {selected ? selected.from : "Open Chat"}
                </h2>
              </div>

              <div className="card-body chat-panel">
                {selected ? (
                  <>
                    {/* Chat meta banner */}
                    <div className="chat-meta">
                      <div className="status-dot" />
                      <div className={`avatar ${selected.isSupport ? "support" : ""}`} style={{ width: 32, height: 32, fontSize: 11 }}>
                        {selected.initials}
                      </div>
                      <div>
                        <div className="chat-meta-name">{selected.from}</div>
                        <div className="chat-meta-role">{selected.role}</div>
                      </div>
                    </div>

                    {/* Bubbles */}
                    <div className="bubbles-area">
                      {selected.messages.map((m) => (
                        <div key={m.id} className={`bubble-wrap ${m.mine ? "mine" : ""}`}>
                          {!m.mine && <div className="bubble-sender">{m.sender}</div>}
                          <div className={`bubble ${m.mine ? "mine" : "theirs"}`}>{m.text}</div>
                          <div className="bubble-time">{m.time}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="msg-empty">
                    <MessageCircle size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                    <div>Select a conversation to start chatting</div>
                  </div>
                )}

                {/* Input */}
                <div className="input-row" style={{ marginTop: "auto" }}>
                  <input
                    className="msg-input"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Type a message…"
                    onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  />
                  <button className="btn-send" onClick={sendMsg}>
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesTab;