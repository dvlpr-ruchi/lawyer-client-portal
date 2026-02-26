import React, { useState } from "react";
import {
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Download,
  Receipt,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";

/* ─── Same design tokens as FirTab / ConsultationsTab / MessagesTab / DocumentsTab ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .pay-root * { box-sizing: border-box; }

  .pay-root {
    --gold: #C9A84C;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.25);
    --bg: #0A0A0B;
    --surface: #111114;
    --surface2: #18181C;
    --text: #F0EDE6;
    --text-muted: #7A7880;
    --text-dim: #4A4855;
    --green: #4EBF8A;
    --red: #E05A4E;
    --blue: #60a5fa;
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
  }

  .pay-root ::-webkit-scrollbar { width: 4px; }
  .pay-root ::-webkit-scrollbar-track { background: transparent; }
  .pay-root ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  .pay-root .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .pay-root .radial-glow {
    position: fixed; pointer-events: none; z-index: 0;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: -200px;
  }

  .pay-root .layout {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
  }

  /* Header */
  .pay-root .header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 32px;
  }
  .pay-root .header-left { display: flex; align-items: center; gap: 14px; }
  .pay-root .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .pay-root .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 24px); font-weight: 700; letter-spacing: -0.3px;
    color: var(--text); margin: 0;
  }
  .pay-root .header-subtitle {
    font-size: 12px; color: var(--text-muted); margin: 2px 0 0; letter-spacing: 0.3px;
  }

  /* Buttons */
  .pay-root .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 10px; border: none;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3); font-family: 'DM Sans', sans-serif;
  }
  .pay-root .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.4); }

  .pay-root .btn-ghost {
    background: transparent; border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-muted); font-size: 12px; padding: 7px 12px;
    border-radius: 8px; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .pay-root .btn-ghost:hover { border-color: var(--gold-border); color: var(--gold); }

  /* Info tiles */
  .pay-root .info-tiles {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;
  }
  @media (max-width: 600px) { .pay-root .info-tiles { grid-template-columns: 1fr 1fr; } }
  .pay-root .info-tile {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
  }
  .pay-root .info-tile-label {
    font-size: 10px; letter-spacing: 0.6px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 4px;
  }
  .pay-root .info-tile-val { font-size: 14px; font-weight: 600; color: var(--text); }

  /* Content grid */
  .pay-root .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 768px) { .pay-root .content-grid { grid-template-columns: 1fr; } }

  /* Cards */
  .pay-root .card {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
  }
  .pay-root .card-header {
    padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .pay-root .card-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .pay-root .card-title { font-size: 14px; font-weight: 600; color: var(--text); margin: 0; }
  .pay-root .card-body { padding: 20px; }

  /* Search */
  .pay-root .search-row {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 9px 14px; margin-bottom: 14px;
  }
  .pay-root .search-row input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif;
  }
  .pay-root .search-row input::placeholder { color: var(--text-dim); }

  /* Filter pills */
  .pay-root .filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .pay-root .pill {
    padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; border: 1px solid; font-family: 'DM Sans', sans-serif;
  }
  .pay-root .pill.on { border-color: var(--gold); background: rgba(201,168,76,0.15); color: var(--gold); }
  .pay-root .pill.off { border-color: rgba(255,255,255,0.08); background: transparent; color: var(--text-dim); }
  .pay-root .pill.off:hover { border-color: var(--gold-border); color: var(--text-muted); }

  /* Payment list */
  .pay-root .pay-list {
    display: flex; flex-direction: column; gap: 8px;
    max-height: 400px; overflow-y: auto;
  }
  .pay-root .pay-item {
    display: flex; align-items: center; gap: 12px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 13px 16px;
    cursor: pointer; transition: border-color 0.2s;
  }
  .pay-root .pay-item:hover { border-color: var(--gold-border); }
  .pay-root .pay-item.active { border-color: var(--gold-border); background: rgba(201,168,76,0.06); }

  .pay-root .pay-service-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .pay-root .pay-info { flex: 1; min-width: 0; }
  .pay-root .pay-name {
    font-size: 13px; font-weight: 600; color: var(--text);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 3px;
  }
  .pay-root .pay-date { font-size: 11px; color: var(--text-dim); }

  .pay-root .pay-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
  .pay-root .pay-amount { font-size: 14px; font-weight: 700; color: var(--text); }

  /* Status badges */
  .pay-root .badge {
    font-size: 10px; padding: 3px 9px; border-radius: 20px; font-weight: 500;
  }
  .pay-root .badge-paid      { background: rgba(78,191,138,0.12); color: var(--green); }
  .pay-root .badge-pending   { background: rgba(201,168,76,0.15); color: var(--gold); }
  .pay-root .badge-failed    { background: rgba(224,90,78,0.12);  color: var(--red); }

  /* Detail panel */
  .pay-root .detail-banner {
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border); border-radius: 12px;
    padding: 16px 18px; display: flex; align-items: center; gap: 14px;
    margin-bottom: 16px;
  }
  .pay-root .status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.6); animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  .pay-root .detail-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px;
  }
  .pay-root .detail-row:last-of-type { border-bottom: none; }
  .pay-root .detail-label { color: var(--text-muted); }
  .pay-root .detail-val { color: var(--text); font-weight: 500; }

  /* Summary card inside right panel */
  .pay-root .summary-card {
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 16px; margin-top: 16px;
  }
  .pay-root .summary-title {
    font-size: 11px; font-weight: 600; letter-spacing: 0.6px;
    text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px;
  }
  .pay-root .summary-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; margin-bottom: 8px;
  }
  .pay-root .summary-row:last-child { margin-bottom: 0; }
  .pay-root .summary-total {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 10px; margin-top: 6px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 14px; font-weight: 700;
  }
`;

/* ── Data ── */
const DATA = [
  { id: 1, service: "FIR Filing Service",   amount: 2000, date: "10 Feb 2026", status: "Paid",    txId: "TXN-001892", method: "UPI" },
  { id: 2, service: "Consultation Fee",      amount: 1000, date: "5 Feb 2026",  status: "Paid",    txId: "TXN-001743", method: "Card" },
  { id: 3, service: "Document Notarization", amount: 500,  date: "1 Feb 2026",  status: "Pending", txId: "TXN-001621", method: "Net Banking" },
  { id: 4, service: "Legal Notice Drafting", amount: 1500, date: "28 Jan 2026", status: "Paid",    txId: "TXN-001544", method: "UPI" },
  { id: 5, service: "Court Filing Fee",      amount: 3000, date: "20 Jan 2026", status: "Failed",  txId: "TXN-001420", method: "Card" },
];

const FILTERS = ["All", "Paid", "Pending", "Failed"];

const STATUS_META = {
  Paid:    { cls: "badge-paid",    Icon: CheckCircle2, color: "var(--green)", bg: "rgba(78,191,138,0.1)"  },
  Pending: { cls: "badge-pending", Icon: Clock,        color: "var(--gold)",  bg: "rgba(201,168,76,0.12)" },
  Failed:  { cls: "badge-failed",  Icon: AlertCircle,  color: "var(--red)",   bg: "rgba(224,90,78,0.1)"   },
};

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

/* ════════════════════════════════════ */
const PaymentsTab = () => {
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(DATA[0]);

  const filtered = DATA.filter((p) => {
    const matchFilter = filter === "All" || p.status === filter;
    const matchSearch = p.service.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPaid    = DATA.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = DATA.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const totalAll     = DATA.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <style>{styles}</style>
      <div className="pay-root">
        <div className="grid-bg" />
        <div className="radial-glow" />

        <div className="layout">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <div className="header-icon">
                <Wallet size={20} color="var(--gold)" />
              </div>
              <div>
                <h1 className="header-title">Payment History</h1>
                <p className="header-subtitle">Track your legal service transactions</p>
              </div>
            </div>
          </div>

          {/* Info Tiles */}
          <div className="info-tiles">
            {[
              { label: "Total Transactions", val: DATA.length },
              { label: "Total Paid",         val: fmt(totalPaid) },
              { label: "Pending",            val: fmt(totalPending) },
            ].map((t) => (
              <div className="info-tile" key={t.label}>
                <div className="info-tile-label">{t.label}</div>
                <div className="info-tile-val">{t.val}</div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="content-grid">
            {/* Left — payment list */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <CreditCard size={15} color="var(--gold)" />
                </div>
                <h2 className="card-title">Transactions</h2>
                <span style={{
                  marginLeft: "auto", fontSize: 11, padding: "2px 8px",
                  borderRadius: 20, background: "var(--gold-dim)",
                  color: "var(--gold)", fontWeight: 600,
                }}>
                  {filtered.length}
                </span>
              </div>
              <div className="card-body">
                {/* Search */}
                <div className="search-row">
                  <Search size={14} color="var(--text-dim)" />
                  <input
                    placeholder="Search transactions…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Filter pills */}
                <div className="filter-row">
                  {FILTERS.map((f) => (
                    <button key={f} className={`pill ${filter === f ? "on" : "off"}`} onClick={() => setFilter(f)}>
                      {f}
                    </button>
                  ))}
                </div>

                {/* List */}
                <div className="pay-list">
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <CreditCard size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No transactions found</div>
                    </div>
                  ) : filtered.map((p) => {
                    const sm = STATUS_META[p.status];
                    return (
                      <div
                        key={p.id}
                        className={`pay-item ${selected?.id === p.id ? "active" : ""}`}
                        onClick={() => setSelected(p)}
                      >
                        <div className="pay-service-icon" style={{ background: sm.bg }}>
                          <sm.Icon size={17} color={sm.color} />
                        </div>
                        <div className="pay-info">
                          <div className="pay-name">{p.service}</div>
                          <div className="pay-date">{p.date} · {p.method}</div>
                        </div>
                        <div className="pay-right">
                          <div className="pay-amount">{fmt(p.amount)}</div>
                          <span className={`badge ${sm.cls}`}>{p.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right — detail */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(78,191,138,0.1)" }}>
                  <Receipt size={15} color="var(--green)" />
                </div>
                <h2 className="card-title">Transaction Details</h2>
              </div>

              <div className="card-body">
                {selected ? (() => {
                  const sm = STATUS_META[selected.status];
                  return (
                    <>
                      {/* Banner */}
                      <div className="detail-banner">
                        <div className="status-dot" />
                        <div className="pay-service-icon" style={{ background: sm.bg, width: 44, height: 44, borderRadius: 12 }}>
                          <sm.Icon size={20} color={sm.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {selected.service}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                            {selected.method} · {selected.txId}
                          </div>
                        </div>
                        <span className={`badge ${sm.cls}`}>{selected.status}</span>
                      </div>

                      {/* Detail rows */}
                      <div style={{ marginBottom: 16 }}>
                        {[
                          { label: "Service",        val: selected.service },
                          { label: "Amount",         val: <span style={{ color: "var(--green)", fontWeight: 700 }}>{fmt(selected.amount)}</span> },
                          { label: "Date",           val: selected.date },
                          { label: "Payment Method", val: selected.method },
                          { label: "Transaction ID", val: <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-muted)" }}>{selected.txId}</span> },
                          { label: "Status",         val: <span className={`badge ${sm.cls}`}>{selected.status}</span> },
                        ].map((r) => (
                          <div className="detail-row" key={r.label}>
                            <span className="detail-label">{r.label}</span>
                            <span className="detail-val">{r.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          className="btn-primary"
                          style={{ flex: 1, justifyContent: "center", padding: "10px" }}
                          onClick={() => alert(`Downloading receipt for ${selected.txId}`)}
                        >
                          <Download size={15} />
                          Download Receipt
                        </button>
                        {selected.status === "Failed" && (
                          <button
                            className="btn-ghost"
                            style={{ flex: 1, justifyContent: "center", color: "var(--gold)", borderColor: "var(--gold-border)" }}
                          >
                            <ArrowUpRight size={14} />
                            Retry Payment
                          </button>
                        )}
                      </div>

                      {/* Payment summary */}
                      <div className="summary-card">
                        <div className="summary-title">Payment Summary</div>
                        <div className="summary-row">
                          <span style={{ color: "var(--text-muted)" }}>Total Paid</span>
                          <span style={{ color: "var(--green)", fontWeight: 600 }}>{fmt(totalPaid)}</span>
                        </div>
                        <div className="summary-row">
                          <span style={{ color: "var(--text-muted)" }}>Pending</span>
                          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{fmt(totalPending)}</span>
                        </div>
                        <div className="summary-total">
                          <span>Total Billed</span>
                          <span style={{ color: "var(--text)" }}>{fmt(totalAll)}</span>
                        </div>
                      </div>
                    </>
                  );
                })() : (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <CreditCard size={32} color="var(--text-dim)" style={{ margin: "0 auto 12px" }} />
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>No Transaction Selected</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Select a transaction to view its details
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsTab;