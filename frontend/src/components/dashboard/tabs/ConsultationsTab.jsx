import React, { useState } from "react";
import {
  X,
  Video,
  Building2,
  Send,
  ChevronRight,
  AlertCircle,
  Calendar,
  Clock,
  Bell,
  Plus,
  Scale,
  MessageSquare,
} from "lucide-react";

/* ─── Styles — identical design tokens as FirTab ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .cons-root * { box-sizing: border-box; }

  .cons-root {
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

  .cons-root ::-webkit-scrollbar { width: 4px; }
  .cons-root ::-webkit-scrollbar-track { background: transparent; }
  .cons-root ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  .cons-root .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .cons-root .radial-glow {
    position: fixed; pointer-events: none; z-index: 0;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: -200px;
  }

  .cons-root .layout {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
  }

  /* ── Header ── */
  .cons-root .header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 32px;
  }
  .cons-root .header-left { display: flex; align-items: center; gap: 14px; }
  .cons-root .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .cons-root .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 24px); font-weight: 700; letter-spacing: -0.3px;
    color: var(--text); margin: 0;
  }
  .cons-root .header-subtitle {
    font-size: 12px; color: var(--text-muted); margin: 2px 0 0; letter-spacing: 0.3px;
  }

  /* ── Buttons ── */
  .cons-root .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 10px; border: none;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px; white-space: nowrap;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3); font-family: 'DM Sans', sans-serif;
  }
  .cons-root .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.4); }

  .cons-root .btn-ghost {
    background: transparent; border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-muted); font-size: 13px; padding: 8px 14px;
    border-radius: 8px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .cons-root .btn-ghost:hover { border-color: var(--gold-border); color: var(--gold); }

  /* ── Info Tiles ── */
  .cons-root .info-tiles {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;
  }
  @media (max-width: 600px) { .cons-root .info-tiles { grid-template-columns: 1fr 1fr; } }
  .cons-root .info-tile {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
  }
  .cons-root .info-tile-label {
    font-size: 10px; letter-spacing: 0.6px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 4px;
  }
  .cons-root .info-tile-val { font-size: 14px; font-weight: 600; color: var(--text); }

  /* ── Content Grid ── */
  .cons-root .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 768px) { .cons-root .content-grid { grid-template-columns: 1fr; } }

  /* ── Cards ── */
  .cons-root .card {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
  }
  .cons-root .card-header {
    padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .cons-root .card-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .cons-root .card-title { font-size: 14px; font-weight: 600; color: var(--text); margin: 0; }
  .cons-root .card-body { padding: 20px; }

  /* ── Status Banner ── */
  .cons-root .status-banner {
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border); border-radius: 12px;
    padding: 16px 20px; display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px; flex-wrap: wrap;
  }
  .cons-root .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.6); animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* ── Consultation list items ── */
  .cons-root .cons-list {
    display: flex; flex-direction: column; gap: 10px;
    max-height: 380px; overflow-y: auto;
  }
  .cons-root .cons-item {
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
    cursor: pointer; transition: border-color 0.2s;
  }
  .cons-root .cons-item:hover { border-color: var(--gold-border); }
  .cons-root .cons-item.active { border-color: var(--gold-border); background: rgba(201,168,76,0.06); }
  .cons-root .cons-item-top {
    display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;
  }
  .cons-root .cons-lawyer { font-size: 14px; font-weight: 600; color: var(--text); }
  .cons-root .badge {
    font-size: 10px; padding: 3px 9px; border-radius: 20px; font-weight: 500; white-space: nowrap;
  }
  .cons-root .badge-upcoming { background: rgba(96,165,250,0.12); color: #60a5fa; }
  .cons-root .badge-completed { background: rgba(78,191,138,0.12); color: var(--green); }
  .cons-root .badge-cancelled { background: rgba(224,90,78,0.12); color: var(--red); }

  .cons-root .cons-meta {
    display: flex; gap: 14px; flex-wrap: wrap;
    font-size: 12px; color: var(--text-muted); margin-bottom: 12px;
  }
  .cons-root .meta-item { display: flex; align-items: center; gap: 5px; }

  /* ── Filter pills ── */
  .cons-root .filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .cons-root .pill {
    padding: 5px 12px; border-radius: 20px; border: 1px solid;
    font-size: 11px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .cons-root .pill.on { border-color: var(--gold); background: rgba(201,168,76,0.15); color: var(--gold); }
  .cons-root .pill.off { border-color: rgba(255,255,255,0.08); background: transparent; color: var(--text-dim); }
  .cons-root .pill.off:hover { border-color: var(--gold-border); color: var(--text-muted); }

  /* ── Detail rows ── */
  .cons-root .detail-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 13px;
  }
  .cons-root .detail-row:last-of-type { border-bottom: none; }
  .cons-root .detail-label { color: var(--text-muted); }
  .cons-root .detail-val { color: var(--text); font-weight: 500; text-align: right; max-width: 60%; }

  /* ── Messages ── */
  .cons-root .messages-area {
    max-height: 200px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
  }
  .cons-root .msg-bubble {
    background: var(--surface2); border-radius: 10px; padding: 10px 14px;
    font-size: 13px; line-height: 1.5; border: 1px solid rgba(255,255,255,0.04); color: var(--text);
  }
  .cons-root .msg-sender { font-size: 11px; color: var(--gold); font-weight: 600; margin-bottom: 3px; }
  .cons-root .msg-empty {
    text-align: center; padding: 28px 16px; color: var(--text-muted); font-size: 13px;
  }
  .cons-root .msg-input-row { display: flex; gap: 10px; align-items: flex-end; }
  .cons-root .msg-input {
    flex: 1; background: var(--surface2); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 10px 14px; color: var(--text); font-size: 13px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
  }
  .cons-root .msg-input:focus { border-color: var(--gold-border); }
  .cons-root .msg-input::placeholder { color: var(--text-dim); }
  .cons-root .btn-send {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    color: var(--gold); display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.2s;
  }
  .cons-root .btn-send:hover { background: var(--gold); color: #0A0A0B; }

  /* ── Modal ── */
  .cons-root .modal-overlay {
    position: fixed; inset: 0; z-index: 50;
    display: flex; align-items: center; justify-content: center; padding: 16px;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
  }
  .cons-root .modal-box {
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    background: var(--surface); border: 1px solid var(--gold-border);
    border-radius: 20px; position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1);
  }
  .cons-root .modal-header {
    position: sticky; top: 0; z-index: 2;
    padding: 20px 24px 16px; background: var(--surface);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .cons-root .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: var(--text);
    display: flex; align-items: center; gap: 10px;
  }
  .cons-root .modal-close {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,0.06); border: none; color: var(--text-muted);
    cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;
  }
  .cons-root .modal-close:hover { background: rgba(255,255,255,0.12); color: var(--text); }
  .cons-root .modal-body { padding: 20px 24px 24px; }

  /* ── Form ── */
  .cons-root .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 500px) { .cons-root .form-grid { grid-template-columns: 1fr; } }
  .cons-root .form-grid .full { grid-column: 1 / -1; }
  .cons-root .field { display: flex; flex-direction: column; gap: 6px; }
  .cons-root .field label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.6px;
    text-transform: uppercase; color: var(--text-muted);
  }
  .cons-root .field label .req { color: var(--gold); }
  .cons-root .fld-input {
    width: 100%; background: var(--surface2); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 10px 14px; color: var(--text); font-size: 13px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
    -webkit-appearance: none; appearance: none;
  }
  .cons-root .fld-input option { background: #18181C; }
  .cons-root .fld-input:focus { border-color: var(--gold-border); }
  .cons-root .fld-input::placeholder { color: var(--text-dim); }
  .cons-root textarea.fld-input { resize: vertical; min-height: 72px; }

  .cons-root .section-divider { display: flex; align-items: center; gap: 10px; margin: 4px 0; }
  .cons-root .section-divider span {
    font-size: 10px; font-weight: 600; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--gold); white-space: nowrap;
  }
  .cons-root .section-divider::before, .cons-root .section-divider::after {
    content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05);
  }

  .cons-root .btn-submit {
    width: 100%; padding: 13px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-size: 14px; font-weight: 700; letter-spacing: 0.2px;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3); font-family: 'DM Sans', sans-serif;
  }
  .cons-root .btn-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.45); }
`;

/* ── Data ── */
const DATA = [
  {
    id: 1, lawyer: "Adv. Rajesh Kumar", date: "15 Feb 2026", time: "4:00 PM",
    type: "Video Call", status: "Upcoming", spec: "Criminal Law",
    notes: "Bring all relevant documents and prior case files.",
  },
  {
    id: 2, lawyer: "Adv. Priya Sharma", date: "10 Feb 2026", time: "2:00 PM",
    type: "Office Visit", status: "Completed", spec: "Family Law",
    notes: "Discussion regarding divorce proceedings and asset division.",
  },
  {
    id: 3, lawyer: "Adv. Mehta & Associates", date: "20 Feb 2026", time: "11:00 AM",
    type: "Video Call", status: "Upcoming", spec: "Property Law",
    notes: "Review of property dispute documents.",
  },
];

const FILTERS = ["All", "Upcoming", "Completed", "Cancelled"];

/* ── Modal wrapper ── */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">{children}</div>
    </div>
  );
};

/* ── Badge helper ── */
const Badge = ({ status }) => {
  const cls =
    status === "Upcoming" ? "badge badge-upcoming" :
    status === "Completed" ? "badge badge-completed" :
    "badge badge-cancelled";
  return <span className={cls}>{status}</span>;
};

/* ════════════════════════════════════════ */
const ConsultationsTab = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(DATA[0]);
  const [msgs, setMsgs] = useState([]);
  const [msgsLoaded, setMsgsLoaded] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ lawyerName: "", spec: "", date: "", time: "", type: "Video Call", notes: "" });

  const setF = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const filtered = filter === "All" ? DATA : DATA.filter((c) => c.status === filter);

  const loadMsgs = () => {
    setMsgs([
      { sender: selected?.lawyer || "Lawyer", text: "Please bring all original documents." },
      { sender: "You", text: "Understood, I will be prepared." },
    ]);
    setMsgsLoaded(true);
  };

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setMsgs((p) => [...p, { sender: "You", text: newMsg }]);
    setNewMsg("");
  };

  const pickConsultation = (c) => {
    setSelected(c);
    setMsgs([]);
    setMsgsLoaded(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cons-root">
        <div className="grid-bg" />
        <div className="radial-glow" />

        <div className="layout">
          {/* ── Header ── */}
          <div className="header">
            <div className="header-left">
              <div className="header-icon">
                <Calendar size={20} color="var(--gold)" />
              </div>
              <div>
                <h1 className="header-title">Consultation Management</h1>
                <p className="header-subtitle">Schedule & track your legal consultations</p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <Plus size={15} />
              Book New Consultation
            </button>
          </div>

          {/* ── Info Tiles ── */}
          <div className="info-tiles">
            {[
              { label: "Total Consultations", val: DATA.length },
              { label: "Upcoming", val: DATA.filter((c) => c.status === "Upcoming").length },
              { label: "Completed", val: DATA.filter((c) => c.status === "Completed").length },
            ].map((t) => (
              <div className="info-tile" key={t.label}>
                <div className="info-tile-label">{t.label}</div>
                <div className="info-tile-val">{t.val}</div>
              </div>
            ))}
          </div>

          {/* ── Main Grid ── */}
          <div className="content-grid">
            {/* Left — list */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Scale size={15} color="var(--gold)" />
                </div>
                <h2 className="card-title">Scheduled Consultations</h2>
              </div>
              <div className="card-body">
                {/* Filters */}
                <div className="filter-row">
                  {FILTERS.map((f) => (
                    <button key={f} className={`pill ${filter === f ? "on" : "off"}`} onClick={() => setFilter(f)}>
                      {f}
                    </button>
                  ))}
                </div>

                {/* List */}
                <div className="cons-list">
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <AlertCircle size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No consultations found</div>
                    </div>
                  ) : filtered.map((c) => (
                    <div
                      key={c.id}
                      className={`cons-item ${selected?.id === c.id ? "active" : ""}`}
                      onClick={() => pickConsultation(c)}
                    >
                      <div className="cons-item-top">
                        <div className="cons-lawyer">{c.lawyer}</div>
                        <Badge status={c.status} />
                      </div>
                      <div className="cons-meta">
                        <div className="meta-item"><Calendar size={11} />{c.date}</div>
                        <div className="meta-item"><Clock size={11} />{c.time}</div>
                        <div className="meta-item">
                          {c.type === "Video Call" ? <Video size={11} /> : <Building2 size={11} />}
                          {c.type}
                        </div>
                      </div>
                      <button
                        className="btn-ghost"
                        style={{ width: "100%", fontSize: 12, padding: "7px 12px" }}
                        onClick={(e) => { e.stopPropagation(); pickConsultation(c); }}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — detail + messages */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(78,191,138,0.1)" }}>
                  <MessageSquare size={15} color="var(--green)" />
                </div>
                <h2 className="card-title">Case Messages</h2>
                {selected && !msgsLoaded && (
                  <button className="btn-ghost" style={{ marginLeft: "auto" }} onClick={loadMsgs}>
                    Load
                  </button>
                )}
              </div>

              <div className="card-body">
                {selected ? (
                  <>
                    {/* Status banner */}
                    <div className="status-banner">
                      <div className="status-dot" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{selected.lawyer}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                          {selected.spec} · {selected.type}
                        </div>
                      </div>
                      <Badge status={selected.status} />
                    </div>

                    {/* Detail rows */}
                    <div style={{ marginBottom: 16 }}>
                      {[
                        { label: "Date", val: selected.date },
                        { label: "Time", val: selected.time },
                        { label: "Mode", val: selected.type },
                        { label: "Notes", val: selected.notes },
                      ].map((r) => (
                        <div className="detail-row" key={r.label}>
                          <span className="detail-label">{r.label}</span>
                          <span className="detail-val" style={{ fontSize: r.label === "Notes" ? 12 : 13, color: r.label === "Notes" ? "var(--text-muted)" : "var(--text)" }}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
                    <AlertCircle size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Select a consultation to view details</div>
                  </div>
                )}

                {/* Messages area */}
                <div className="messages-area">
                  {!msgsLoaded ? (
                    <div className="msg-empty">
                      <Bell size={24} color="var(--text-dim)" style={{ margin: "0 auto 8px" }} />
                      <div>Load messages to view case updates</div>
                    </div>
                  ) : msgs.length === 0 ? (
                    <div className="msg-empty">No messages yet</div>
                  ) : msgs.map((m, i) => (
                    <div key={i} className="msg-bubble">
                      <div className="msg-sender">{m.sender}</div>
                      {m.text}
                    </div>
                  ))}
                </div>

                {/* Input row */}
                <div className="msg-input-row">
                  <input
                    className="msg-input"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Type a message…"
                    onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  />
                  <button className="btn-send" onClick={sendMsg}><Send size={15} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Book Consultation Modal ── */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="modal-header">
            <div className="modal-title">
              <Calendar size={18} color="var(--gold)" />
              Book New Consultation
            </div>
            <button className="modal-close" onClick={() => setModalOpen(false)}><X size={16} /></button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }} className="modal-body">
            <div className="form-grid">
              <div className="section-divider full"><span>Lawyer Details</span></div>

              <div className="field full">
                <label>Lawyer Name <span className="req">*</span></label>
                <input required value={form.lawyerName} onChange={setF("lawyerName")} className="fld-input" placeholder="Enter lawyer's name" />
              </div>

              <div className="field full">
                <label>Specialization</label>
                <input value={form.spec} onChange={setF("spec")} className="fld-input" placeholder="e.g. Criminal Law, Family Law" />
              </div>

              <div className="section-divider full"><span>Schedule</span></div>

              <div className="field">
                <label>Date <span className="req">*</span></label>
                <input type="date" required value={form.date} onChange={setF("date")} className="fld-input" />
              </div>

              <div className="field">
                <label>Time <span className="req">*</span></label>
                <input type="time" required value={form.time} onChange={setF("time")} className="fld-input" />
              </div>

              <div className="field full">
                <label>Consultation Type</label>
                <select value={form.type} onChange={setF("type")} className="fld-input">
                  <option value="Video Call">Video Call</option>
                  <option value="Office Visit">Office Visit</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>

              <div className="section-divider full"><span>Additional Notes</span></div>

              <div className="field full">
                <label>Notes</label>
                <textarea value={form.notes} onChange={setF("notes")} className="fld-input" placeholder="Any special instructions or documents to bring..." />
              </div>

              <div className="full" style={{ marginTop: 4 }}>
                <button type="submit" className="btn-submit">
                  <ChevronRight size={16} />
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ConsultationsTab;