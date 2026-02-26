import React, { useState } from "react";
import {
  FileText,
  Download,
  Upload,
  Search,
  FolderOpen,
  File,
  FileImage,
  Shield,
  Trash2,
  Eye,
} from "lucide-react";

/* ─── Same design tokens as FirTab / ConsultationsTab / MessagesTab ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .docs-root * { box-sizing: border-box; }

  .docs-root {
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
    --blue: #60a5fa;
    --purple: #a78bfa;
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
  }

  .docs-root ::-webkit-scrollbar { width: 4px; }
  .docs-root ::-webkit-scrollbar-track { background: transparent; }
  .docs-root ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

  .docs-root .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .docs-root .radial-glow {
    position: fixed; pointer-events: none; z-index: 0;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    top: -200px; left: -200px;
  }

  .docs-root .layout {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    padding: clamp(16px, 4vw, 40px);
  }

  /* Header */
  .docs-root .header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 32px;
  }
  .docs-root .header-left { display: flex; align-items: center; gap: 14px; }
  .docs-root .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .docs-root .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 24px); font-weight: 700; letter-spacing: -0.3px;
    color: var(--text); margin: 0;
  }
  .docs-root .header-subtitle {
    font-size: 12px; color: var(--text-muted); margin: 2px 0 0; letter-spacing: 0.3px;
  }

  /* Buttons */
  .docs-root .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold), #A8842A);
    color: #0A0A0B; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 10px; border: none;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
    box-shadow: 0 4px 20px rgba(201,168,76,0.3); font-family: 'DM Sans', sans-serif;
  }
  .docs-root .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(201,168,76,0.4); }

  .docs-root .btn-ghost {
    background: transparent; border: 1px solid rgba(255,255,255,0.08);
    color: var(--text-muted); font-size: 12px; padding: 7px 12px;
    border-radius: 8px; cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 6px;
  }
  .docs-root .btn-ghost:hover { border-color: var(--gold-border); color: var(--gold); }

  .docs-root .btn-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; border: none; flex-shrink: 0;
  }

  /* Info tiles */
  .docs-root .info-tiles {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;
  }
  @media (max-width: 600px) { .docs-root .info-tiles { grid-template-columns: 1fr 1fr; } }
  .docs-root .info-tile {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 14px 16px;
  }
  .docs-root .info-tile-label {
    font-size: 10px; letter-spacing: 0.6px; text-transform: uppercase;
    color: var(--text-dim); margin-bottom: 4px;
  }
  .docs-root .info-tile-val { font-size: 14px; font-weight: 600; color: var(--text); }

  /* Content grid */
  .docs-root .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 768px) { .docs-root .content-grid { grid-template-columns: 1fr; } }

  /* Cards */
  .docs-root .card {
    background: var(--surface); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
  }
  .docs-root .card-header {
    padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .docs-root .card-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .docs-root .card-title { font-size: 14px; font-weight: 600; color: var(--text); margin: 0; }
  .docs-root .card-body { padding: 20px; }

  /* Search */
  .docs-root .search-row {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 9px 14px; margin-bottom: 14px;
  }
  .docs-root .search-row input {
    flex: 1; background: transparent; border: none; outline: none;
    color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif;
  }
  .docs-root .search-row input::placeholder { color: var(--text-dim); }

  /* Filter pills */
  .docs-root .filter-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .docs-root .pill {
    padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; border: 1px solid; font-family: 'DM Sans', sans-serif;
  }
  .docs-root .pill.on { border-color: var(--gold); background: rgba(201,168,76,0.15); color: var(--gold); }
  .docs-root .pill.off { border-color: rgba(255,255,255,0.08); background: transparent; color: var(--text-dim); }
  .docs-root .pill.off:hover { border-color: var(--gold-border); color: var(--text-muted); }

  /* Document list */
  .docs-root .doc-list {
    display: flex; flex-direction: column; gap: 8px;
    max-height: 400px; overflow-y: auto;
  }
  .docs-root .doc-item {
    display: flex; align-items: center; gap: 12px;
    background: var(--surface2); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 12px 14px;
    cursor: pointer; transition: border-color 0.2s;
  }
  .docs-root .doc-item:hover { border-color: var(--gold-border); }
  .docs-root .doc-item.active { border-color: var(--gold-border); background: rgba(201,168,76,0.06); }

  .docs-root .doc-file-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .docs-root .doc-info { flex: 1; min-width: 0; }
  .docs-root .doc-name {
    font-size: 13px; font-weight: 600; color: var(--text);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    margin-bottom: 3px;
  }
  .docs-root .doc-meta { font-size: 11px; color: var(--text-dim); }

  .docs-root .doc-actions { display: flex; gap: 6px; align-items: center; flex-shrink: 0; }

  /* Preview panel */
  .docs-root .preview-banner {
    background: linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05));
    border: 1px solid var(--gold-border); border-radius: 12px;
    padding: 16px 18px; display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .docs-root .status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--gold); flex-shrink: 0;
    box-shadow: 0 0 8px rgba(201,168,76,0.6); animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  .docs-root .detail-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px;
  }
  .docs-root .detail-row:last-of-type { border-bottom: none; }
  .docs-root .detail-label { color: var(--text-muted); }
  .docs-root .detail-val { color: var(--text); font-weight: 500; }

  /* Upload zone */
  .docs-root .upload-zone {
    border: 1px dashed rgba(201,168,76,0.3); border-radius: 12px;
    padding: 24px; text-align: center; cursor: pointer;
    transition: all 0.2s; margin-top: 16px;
    background: rgba(201,168,76,0.03);
  }
  .docs-root .upload-zone:hover {
    border-color: var(--gold); background: var(--gold-dim);
  }
  .docs-root .upload-zone input { display: none; }
  .docs-root .upload-zone-title { font-size: 13px; font-weight: 600; color: var(--text-muted); margin: 8px 0 4px; }
  .docs-root .upload-zone-sub { font-size: 11px; color: var(--text-dim); }

  /* Type badge */
  .docs-root .type-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
    letter-spacing: 0.5px; text-transform: uppercase;
  }
`;

/* ── Helpers ── */
const FILE_TYPES = {
  pdf:   { color: "#E05A4E", bg: "rgba(224,90,78,0.12)",   Icon: FileText  },
  img:   { color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  Icon: FileImage },
  doc:   { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", Icon: File      },
  other: { color: "#7A7880", bg: "rgba(122,120,128,0.12)", Icon: File      },
};

const DATA = [
  { id: 1, title: "Agreement Draft",     uploadedOn: "12 Feb 2026", size: "1.2 MB", type: "pdf", category: "Legal" },
  { id: 2, title: "Property Documents",  uploadedOn: "10 Feb 2026", size: "3.4 MB", type: "pdf", category: "Property" },
  { id: 3, title: "ID Proof (Aadhaar)",  uploadedOn: "8 Feb 2026",  size: "420 KB", type: "img", category: "Identity" },
  { id: 4, title: "FIR Copy",            uploadedOn: "5 Feb 2026",  size: "800 KB", type: "pdf", category: "FIR" },
  { id: 5, title: "Affidavit",           uploadedOn: "1 Feb 2026",  size: "560 KB", type: "doc", category: "Legal" },
];

const FILTERS = ["All", "Legal", "Property", "Identity", "FIR"];

const DocIcon = ({ type, size = 38 }) => {
  const ft = FILE_TYPES[type] || FILE_TYPES.other;
  return (
    <div className="doc-file-icon" style={{ width: size, height: size, background: ft.bg }}>
      <ft.Icon size={size * 0.45} color={ft.color} />
    </div>
  );
};

/* ════════════════════════════════ */
const DocumentsTab = () => {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState(DATA[0]);
  const [docs, setDocs]       = useState(DATA);

  const filtered = docs.filter((d) => {
    const matchFilter = filter === "All" || d.category === filter;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    const type = ["jpg","jpeg","png","webp"].includes(ext) ? "img" : ext === "pdf" ? "pdf" : "doc";
    const newDoc = {
      id: Date.now(),
      title: file.name.replace(/\.[^.]+$/, ""),
      uploadedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      size: `${(file.size / 1024).toFixed(0)} KB`,
      type,
      category: "Legal",
    };
    setDocs((p) => [newDoc, ...p]);
    setSelected(newDoc);
  };

  const deleteDoc = (id) => {
    setDocs((p) => p.filter((d) => d.id !== id));
    if (selected?.id === id) setSelected(docs.find((d) => d.id !== id) || null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="docs-root">
        <div className="grid-bg" />
        <div className="radial-glow" />

        <div className="layout">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <div className="header-icon">
                <FolderOpen size={20} color="var(--gold)" />
              </div>
              <div>
                <h1 className="header-title">Document Vault</h1>
                <p className="header-subtitle">Manage & access your legal documents</p>
              </div>
            </div>
            <label className="btn-primary" style={{ cursor: "pointer" }}>
              <Upload size={15} />
              Upload Document
              <input type="file" style={{ display: "none" }} onChange={handleUpload} accept=".pdf,.doc,.docx,image/*" />
            </label>
          </div>

          {/* Info Tiles */}
          <div className="info-tiles">
            {[
              { label: "Total Documents", val: docs.length },
              { label: "PDFs",  val: docs.filter((d) => d.type === "pdf").length },
              { label: "Images", val: docs.filter((d) => d.type === "img").length },
            ].map((t) => (
              <div className="info-tile" key={t.label}>
                <div className="info-tile-label">{t.label}</div>
                <div className="info-tile-val">{t.val}</div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="content-grid">
            {/* Left — list */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(201,168,76,0.1)" }}>
                  <FileText size={15} color="var(--gold)" />
                </div>
                <h2 className="card-title">All Documents</h2>
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
                    placeholder="Search documents…"
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
                <div className="doc-list">
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <FolderOpen size={28} color="var(--text-dim)" style={{ margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>No documents found</div>
                    </div>
                  ) : filtered.map((doc) => (
                    <div
                      key={doc.id}
                      className={`doc-item ${selected?.id === doc.id ? "active" : ""}`}
                      onClick={() => setSelected(doc)}
                    >
                      <DocIcon type={doc.type} />
                      <div className="doc-info">
                        <div className="doc-name">{doc.title}</div>
                        <div className="doc-meta">{doc.uploadedOn} · {doc.size}</div>
                      </div>
                      <div className="doc-actions">
                        <span className="type-badge" style={{
                          background: FILE_TYPES[doc.type]?.bg,
                          color: FILE_TYPES[doc.type]?.color,
                        }}>
                          {doc.type}
                        </span>
                        <button
                          className="btn-icon"
                          style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa" }}
                          onClick={(e) => { e.stopPropagation(); alert(`Downloading: ${doc.title}`); }}
                          title="Download"
                        >
                          <Download size={14} />
                        </button>
                        <button
                          className="btn-icon"
                          style={{ background: "rgba(224,90,78,0.1)", color: "#E05A4E" }}
                          onClick={(e) => { e.stopPropagation(); deleteDoc(doc.id); }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — preview */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: "rgba(78,191,138,0.1)" }}>
                  <Eye size={15} color="var(--green)" />
                </div>
                <h2 className="card-title">Document Details</h2>
              </div>

              <div className="card-body">
                {selected ? (
                  <>
                    {/* Banner */}
                    <div className="preview-banner">
                      <div className="status-dot" />
                      <DocIcon type={selected.type} size={44} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {selected.title}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                          {selected.category} · {selected.type.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Detail rows */}
                    <div style={{ marginBottom: 20 }}>
                      {[
                        { label: "File Name",    val: `${selected.title}.${selected.type}` },
                        { label: "Uploaded On",  val: selected.uploadedOn },
                        { label: "File Size",    val: selected.size },
                        { label: "Category",     val: selected.category },
                        { label: "File Type",    val: selected.type.toUpperCase() },
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
                        onClick={() => alert(`Downloading: ${selected.title}`)}
                      >
                        <Download size={15} />
                        Download
                      </button>
                      <button
                        className="btn-ghost"
                        style={{ flex: 1, justifyContent: "center", color: "#E05A4E", borderColor: "rgba(224,90,78,0.25)" }}
                        onClick={() => deleteDoc(selected.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>

                    {/* Upload another zone */}
                    <label className="upload-zone">
                      <input type="file" onChange={handleUpload} accept=".pdf,.doc,.docx,image/*" />
                      <Shield size={22} color="var(--gold)" style={{ margin: "0 auto" }} />
                      <div className="upload-zone-title">Upload Another Document</div>
                      <div className="upload-zone-sub">PDF, DOC, or Image · Max 10 MB</div>
                    </label>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <FolderOpen size={32} color="var(--text-dim)" style={{ margin: "0 auto 12px" }} />
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>No Document Selected</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Select a document from the list to view its details
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

export default DocumentsTab;