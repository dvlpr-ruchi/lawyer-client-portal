import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  MessageSquare,
  Send,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Scale,
  Shield,
  Upload,
  Calendar,
  MapPin,
  User,
  ChevronDown,
  Bell,
  Clock,
} from "lucide-react";
import api from "../../../network/api";

/* ─── Inject Global Styles ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .fir-root * { box-sizing: border-box; }

  .fir-root {
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

  /* Scrollbar */
  .fir-root ::-webkit-scrollbar { width: 4px; }
  .fir-root ::-webkit-scrollbar-track { background: transparent; }
  .fir-root ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  /* Overlay shimmer effect */
  .fir-root .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .fir-root .radial-glow {
    position: fixed; pointer-events: none; z-index: 0;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: -200px;
  }

  /* Layout */
  .fir-root .layout {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
  }

  /* Header */
  .fir-root .header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 32px;
  }
  .fir-root .header-left { display: flex; align-items: center; gap: 14px; }
  .fir-root .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .fir-root .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 700; letter-spacing: -0.3px;
    color: var(--text); margin: 0;
  }
  .fir-root .header-subtitle {
    font-size: 12px; color: var(--text-muted); margin: 2px 0 0;
    letter-spacing: 0.3px;
  }

  /* CTA Button */
  .fir-root .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 10px; border: none;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.2px;
    white-space: nowrap;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3);
  }
  .fir-root .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(201,168,76,0.4);
  }
  .fir-root .btn-primary:active { transform: translateY(0); }

  /* Content Grid */
  .fir-root .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 768px) {
    .fir-root .content-grid { grid-template-columns: 1fr; }
  }

  /* Cards */
  .fir-root .card {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
  }
  .fir-root .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .fir-root .card-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .fir-root .card-title {
    font-size: 14px; font-weight: 600; color: var(--text); margin: 0;
  }
  .fir-root .card-body { padding: 20px; }

  /* Status Banner */
  .fir-root .status-banner {
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border); border-radius: 12px;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px; flex-wrap: wrap;
  }
  .fir-root .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.6);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
  }

  /* Message area */
  .fir-root .messages-area {
    max-height: 300px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px;
    margin-bottom: 16px;
  }
  .fir-root .msg-bubble {
    background: var(--surface2); border-radius: 10px;
    padding: 10px 14px; font-size: 13px; line-height: 1.5;
    border: 1px solid rgba(255,255,255,0.04);
    color: var(--text);
  }
  .fir-root .msg-empty {
    text-align: center; padding: 32px 16px;
    color: var(--text-muted); font-size: 13px;
  }

  .fir-root .msg-input-row {
    display: flex; gap: 10px; align-items: flex-end;
  }
  .fir-root .msg-input {
    flex: 1; background: var(--surface2); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 10px 14px;
    color: var(--text); font-size: 13px; resize: none;
    font-family: 'DM Sans', sans-serif; outline: none;
    transition: border-color 0.2s;
  }
  .fir-root .msg-input:focus { border-color: var(--gold-border); }
  .fir-root .msg-input::placeholder { color: var(--text-dim); }

  .fir-root .btn-send {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    color: var(--gold); display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; transition: all 0.2s;
  }
  .fir-root .btn-send:hover { background: var(--gold); color: #0A0A0B; }

  .fir-root .btn-ghost {
    background: transparent; border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-muted); font-size: 13px; padding: 8px 14px;
    border-radius: 8px; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .fir-root .btn-ghost:hover { border-color: var(--gold-border); color: var(--gold); }

  /* ── Modal ── */
  .fir-root .modal-overlay {
    position: fixed; inset: 0; z-index: 50;
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(12px);
  }
  .fir-root .modal-box {
    width: 100%; max-width: 560px; max-height: 90vh;
    overflow-y: auto;
    background: var(--surface);
    border: 1px solid var(--gold-border);
    border-radius: 20px;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1);
  }
  .fir-root .modal-header {
    position: sticky; top: 0; z-index: 2;
    padding: 20px 24px 16px;
    background: var(--surface);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .fir-root .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: var(--text);
    display: flex; align-items: center; gap: 10px;
  }
  .fir-root .modal-close {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,0.06); border: none;
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .fir-root .modal-close:hover { background: rgba(255,255,255,0.12); color: var(--text); }

  .fir-root .modal-body { padding: 20px 24px 24px; }

  /* Form */
  .fir-root .form-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  @media (max-width: 500px) {
    .fir-root .form-grid { grid-template-columns: 1fr; }
  }
  .fir-root .form-grid .full { grid-column: 1 / -1; }

  .fir-root .field { display: flex; flex-direction: column; gap: 6px; }
  .fir-root .field label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.6px;
    text-transform: uppercase; color: var(--text-muted);
    display: flex; align-items: center; gap: 4px;
  }
  .fir-root .field label .req { color: var(--gold); }

  .fir-root .fld-input {
    width: 100%; background: var(--surface2);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
    padding: 10px 14px; color: var(--text); font-size: 13px;
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
  }
  .fir-root .fld-input:focus { border-color: var(--gold-border); }
  .fir-root .fld-input::placeholder { color: var(--text-dim); }
  .fir-root textarea.fld-input { resize: vertical; min-height: 80px; }

  /* File upload */
  .fir-root .file-upload {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface2); border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 10px; padding: 10px 14px; cursor: pointer;
    transition: border-color 0.2s;
  }
  .fir-root .file-upload:hover { border-color: var(--gold-border); }
  .fir-root .file-upload input[type="file"] { display: none; }
  .fir-root .file-upload-label {
    font-size: 12px; color: var(--text-muted); flex: 1;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }

  /* Checkbox */
  .fir-root .checkbox-row {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; background: var(--surface2);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
  }
  .fir-root .checkbox-row input[type="checkbox"] {
    width: 16px; height: 16px; margin-top: 1px;
    accent-color: var(--gold); flex-shrink: 0; cursor: pointer;
  }
  .fir-root .checkbox-row span { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

  /* Divider */
  .fir-root .section-divider {
    display: flex; align-items: center; gap: 10px;
    margin: 4px 0;
  }
  .fir-root .section-divider span {
    font-size: 10px; font-weight: 600; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--gold); white-space: nowrap;
  }
  .fir-root .section-divider::before,
  .fir-root .section-divider::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(255,255,255,0.05);
  }

  /* Loading */
  .fir-root .loading-pane {
    padding: 60px 24px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
  }
  .fir-root .loading-spinner {
    width: 52px; height: 52px; border-radius: 50%;
    border: 2px solid var(--gold-border);
    border-top-color: var(--gold);
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fir-root .loading-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: var(--text);
  }
  .fir-root .loading-sub { font-size: 13px; color: var(--text-muted); }

  /* Submit btn */
  .fir-root .btn-submit {
    width: 100%; padding: 13px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-size: 14px; font-weight: 700;
    letter-spacing: 0.2px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3);
    font-family: 'DM Sans', sans-serif;
  }
  .fir-root .btn-submit:hover {
    transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.45);
  }

  /* Info tiles */
  .fir-root .info-tiles {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    margin-bottom: 20px;
  }
  @media (max-width: 600px) {
    .fir-root .info-tiles { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .fir-root .info-tiles { grid-template-columns: 1fr; }
  }
  .fir-root .info-tile {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
  }
  .fir-root .info-tile-label {
    font-size: 10px; letter-spacing: 0.6px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 4px;
  }
  .fir-root .info-tile-val {
    font-size: 14px; font-weight: 600; color: var(--text);
  }
`;

/* ─── Modal ─── */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
};

/* ─── FileField ─── */
const FileField = ({ label, required, accept, onChange, value }) => (
  <div className="field full">
    <label>
      {label} {required && <span className="req">*</span>}
    </label>
    <label className="file-upload">
      <input type="file" accept={accept} onChange={onChange} required={required} />
      <Upload size={14} color="var(--gold)" />
      <span className="file-upload-label">
        {value ? value.name : `Choose file (PDF / Image)`}
      </span>
      <ChevronRight size={14} color="var(--text-dim)" />
    </label>
  </div>
);

/* ═══════════════════════════════ */
const FirTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("");
  const [requestId, setRequestId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  const [form, setForm] = useState({
    complainantName: "",
    caseType: "",
    policeStation: "",
    state: "",
    district: "",
    incidentDate: "",
    incidentDescription: "",
    legalDeclarationAccepted: false,
    uploadedFirCopy: null,
    idProof: null,
  });

  const set = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "file"
          ? e.target.files[0]
          : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      setSubmitStep("draft");
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) fd.append(key, value);
      });
      const draftRes = await api.post("api/v1/fir/draft", fd);
      const draftId = draftRes.data.draftId;
      setRequestId(draftId);
      localStorage.setItem("activeFirId", draftId);
      setSubmitStep("payment");
      const payRes = await api.post("api/v1/fir/payment", { draftId });
      window.location.href = payRes.data.url;
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      setSubmitting(false);
      setSubmitStep("");
    }
  };

  const fetchMessages = async () => {
    if (!requestId) return alert("No active FIR found");
    const res = await api.get(`api/v1/fir/${requestId}/messages`);
    setMessages(res.data.data || []);
    setMessagesLoaded(true);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const fd = new FormData();
    fd.append("message", newMessage);
    await api.post(`api/v1/fir/${requestId}/user/message`, fd);
    setNewMessage("");
    fetchMessages();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fir-root">
        <div className="grid-bg" />
        <div className="radial-glow" />

        <div className="layout">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <div className="header-icon">
                <Scale size={20} color="var(--gold)" />
              </div>
              <div>
                <h1 className="header-title">FIR Management</h1>
                <p className="header-subtitle">First Information Report Portal</p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <FileText size={15} />
              File a New FIR
            </button>
          </div>

          {/* Info tiles */}
          <div className="info-tiles">
            {[
              { label: "Active FIRs", val: requestId ? "1" : "0" },
              { label: "Pending Review", val: "0" },
              { label: "Resolved", val: "0" },
            ].map((t) => (
              <div className="info-tile" key={t.label}>
                <div className="info-tile-label">{t.label}</div>
                <div className="info-tile-val">{t.val}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="content-grid">
            {/* FIR Status */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <Shield size={15} color="var(--gold)" />
                </div>
                <h2 className="card-title">Case Status</h2>
              </div>
              <div className="card-body">
                {requestId ? (
                  <>
                    <div className="status-banner">
                      <div className="status-dot" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>FIR Under Review</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                          ID: {requestId}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                      Your FIR has been submitted and is currently being reviewed by the assigned officer.
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <AlertCircle size={32} color="var(--text-dim)" style={{ margin: "0 auto 12px" }} />
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>No Active FIR</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      File a new FIR using the button above to get started.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(78,191,138,0.1)" }}>
                  <MessageSquare size={15} color="var(--green)" />
                </div>
                <h2 className="card-title">Case Messages</h2>
                {!messagesLoaded && (
                  <button className="btn-ghost" style={{ marginLeft: "auto" }} onClick={fetchMessages}>
                    Load
                  </button>
                )}
              </div>
              <div className="card-body">
                <div className="messages-area">
                  {!messagesLoaded ? (
                    <div className="msg-empty">
                      <Bell size={24} color="var(--text-dim)" style={{ margin: "0 auto 8px" }} />
                      <div>Load messages to view case updates</div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="msg-empty">No messages yet</div>
                  ) : (
                    messages.map((m, i) => (
                      <div key={i} className="msg-bubble">
                        {m.message}
                      </div>
                    ))
                  )}
                </div>
                <div className="msg-input-row">
                  <input
                    className="msg-input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message…"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button className="btn-send" onClick={sendMessage}>
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal open={modalOpen} onClose={() => !submitting && setModalOpen(false)}>
          {submitting ? (
            <div className="loading-pane">
              <div className="loading-spinner" />
              <div className="loading-title">
                {submitStep === "draft" ? "Preparing FIR" : "Initiating Payment"}
              </div>
              <div className="loading-sub">
                {submitStep === "draft"
                  ? "Securely submitting your information..."
                  : "Redirecting to payment gateway..."}
              </div>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <div className="modal-title">
                  <Scale size={18} color="var(--gold)" />
                  File New FIR
                </div>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-body">
                <div className="form-grid">

                  {/* Personal Info */}
                  <div className="section-divider full">
                    <span>Complainant</span>
                  </div>

                  <div className="field full">
                    <label>Full Name <span className="req">*</span></label>
                    <input
                      required
                      value={form.complainantName}
                      onChange={set("complainantName")}
                      className="fld-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="field full">
                    <label>Case Type</label>
                    <input
                      value={form.caseType}
                      onChange={set("caseType")}
                      className="fld-input"
                      placeholder="e.g. Theft, Assault, Fraud"
                    />
                  </div>

                  {/* Location */}
                  <div className="section-divider full">
                    <span>Location</span>
                  </div>

                  <div className="field">
                    <label>State <span className="req">*</span></label>
                    <input
                      required
                      value={form.state}
                      onChange={set("state")}
                      className="fld-input"
                      placeholder="State"
                    />
                  </div>

                  <div className="field">
                    <label>District <span className="req">*</span></label>
                    <input
                      required
                      value={form.district}
                      onChange={set("district")}
                      className="fld-input"
                      placeholder="District"
                    />
                  </div>

                  <div className="field full">
                    <label>Police Station <span className="req">*</span></label>
                    <input
                      required
                      value={form.policeStation}
                      onChange={set("policeStation")}
                      className="fld-input"
                      placeholder="Nearest police station"
                    />
                  </div>

                  {/* Incident */}
                  <div className="section-divider full">
                    <span>Incident Details</span>
                  </div>

                  <div className="field full">
                    <label>Incident Date</label>
                    <input
                      type="date"
                      value={form.incidentDate}
                      onChange={set("incidentDate")}
                      className="fld-input"
                    />
                  </div>

                  <div className="field full">
                    <label>Description of Incident</label>
                    <textarea
                      value={form.incidentDescription}
                      onChange={set("incidentDescription")}
                      className="fld-input"
                      placeholder="Provide a detailed account of what happened..."
                    />
                  </div>

                  {/* Documents */}
                  <div className="section-divider full">
                    <span>Documents</span>
                  </div>

                  <FileField
                    label="FIR Copy"
                    required
                    accept=".pdf,image/*"
                    onChange={set("uploadedFirCopy")}
                    value={form.uploadedFirCopy}
                  />

                  <FileField
                    label="ID Proof"
                    required
                    accept=".pdf,image/*"
                    onChange={set("idProof")}
                    value={form.idProof}
                  />

                  {/* Declaration */}
                  <div className="full">
                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        required
                        checked={form.legalDeclarationAccepted}
                        onChange={set("legalDeclarationAccepted")}
                      />
                      <span>
                        I hereby declare that all the information provided above is true and
                        accurate to the best of my knowledge. I understand that providing false
                        information is a punishable offence.
                      </span>
                    </label>
                  </div>

                  <div className="full" style={{ marginTop: 4 }}>
                    <button type="submit" className="btn-submit">
                      <ChevronRight size={16} />
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default FirTab;