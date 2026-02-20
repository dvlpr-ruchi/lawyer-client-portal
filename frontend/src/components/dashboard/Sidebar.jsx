import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Upload,
  CreditCard,
  MessageSquare,
  Scale,
  ChevronRight,
  X,
  Menu,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const menuItems = [
  { id: "consultations", label: "Consultations", icon: Calendar, count: 3 },
  { id: "fir", label: "FIR Requests", icon: FileText, count: 2 },
  { id: "documents", label: "Documents", icon: Upload, count: 8 },
  { id: "payments", label: "Payments", icon: CreditCard, count: 5 },
  { id: "messages", label: "Messages", icon: MessageSquare, count: 4 },
];

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (id) => {
    setSelectedTab(id);
    setMobileOpen(false);
  };

  const SidebarContent = ({ isCollapsed = false }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Brand ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isCollapsed ? 0 : "12px",
          justifyContent: isCollapsed ? "center" : "space-between",
          padding: isCollapsed ? "28px 0" : "28px 24px 20px",
          borderBottom: "1px solid #1e1e1e",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Logo mark */}
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "linear-gradient(135deg, #c9922a, #b5831f)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(201,146,42,0.35)",
            }}
          >
            <Scale size={18} color="#fff" />
          </div>

          {!isCollapsed && (
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#f0ede6",
                  lineHeight: 1,
                }}
              >
                Legal<span style={{ color: "#c9922a" }}>Ease</span>
              </div>
              <div style={{ fontSize: "0.68rem", color: "#4a4540", marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Control Panel
              </div>
            </div>
          )}
        </div>

        {/* Collapse toggle (desktop only) */}
        {!isCollapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#4a4540",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "6px",
              transition: "color 0.2s",
            }}
            title="Collapse sidebar"
            className="collapse-btn"
          >
            <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />
          </button>
        )}

        {isCollapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              position: "absolute",
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1e1e1e",
              border: "1px solid #2a2a2a",
              color: "#c9922a",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "6px",
              width: "24px",
              height: "24px",
            }}
          >
            <ChevronRight size={12} />
          </button>
        )}
      </div>


     

      {/* ── Menu Items ── */}
      <nav style={{ flex: 1, padding: isCollapsed ? "0 8px" : "0 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = selectedTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              title={isCollapsed ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "space-between",
                padding: isCollapsed ? "12px" : "11px 14px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.22s ease",
                background: isActive
                  ? "linear-gradient(135deg, #c9922a18, #c9922a08)"
                  : "transparent",
                borderLeft: isActive ? "2px solid #c9922a" : "2px solid transparent",
                animation: `slideIn 0.3s ease ${index * 0.04}s both`,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon
                  size={18}
                  color={isActive ? "#c9922a" : "#4a4540"}
                  style={{ transition: "color 0.2s", flexShrink: 0 }}
                />
                {!isCollapsed && (
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#f0ede6" : "#6b6560",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      background: isActive ? "#c9922a" : "#1e1e1e",
                      color: isActive ? "#000" : "#6b6560",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "20px",
                      transition: "all 0.2s",
                      border: isActive ? "none" : "1px solid #2a2a2a",
                    }}
                  >
                    {item.count}
                  </span>
                  {isActive && (
                    <ChevronRight size={13} color="#c9922a" />
                  )}
                </div>
              )}

              {/* collapsed badge */}
              {isCollapsed && item.count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    width: "16px",
                    height: "16px",
                    background: "#c9922a",
                    borderRadius: "50%",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Bottom actions ── */}
      {/* <div
        style={{
          padding: isCollapsed ? "16px 8px" : "16px 12px",
          borderTop: "1px solid #1e1e1e",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "auto",
        }}
      >
        {[
          { icon: User, label: "Profile" },
          { icon: Settings, label: "Settings" },
          { icon: LogOut, label: "Logout", danger: true },
        ].map(({ icon: Icon, label, danger }) => (
          <button
            key={label}
            title={isCollapsed ? label : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: isCollapsed ? "10px" : "10px 14px",
              justifyContent: isCollapsed ? "center" : "flex-start",
              background: "transparent",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              color: danger ? "#ef4444" : "#4a4540",
              fontSize: "0.88rem",
              fontWeight: 400,
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = danger ? "#ef444410" : "#141414";
              e.currentTarget.style.color = danger ? "#ef4444" : "#f0ede6";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = danger ? "#ef4444" : "#4a4540";
            }}
          >
            <Icon size={16} />
            {!isCollapsed && <span>{label}</span>}
          </button>
        ))}
      </div> */}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sidebar-desktop button:hover { background: #141414 !important; }
        .sidebar-desktop button:hover span { color: #f0ede6 !important; }
        .sidebar-desktop .collapse-btn:hover { color: #c9922a !important; }
        .mobile-trigger { display: none; }
        .sidebar-desktop { display: flex; }
        @media (max-width: 768px) {
          .mobile-trigger { display: flex !important; }
          .sidebar-desktop { display: none !important; }
        }
      `}</style>

      {/* ── MOBILE trigger button ── */}
      <button
        className="mobile-trigger"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 100,
          background: "#0a0a0a",
          border: "1px solid #2a2a2a",
          borderRadius: "10px",
          width: "42px",
          height: "42px",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <Menu size={18} color="#c9922a" />
      </button>

      {/* ── MOBILE overlay ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <div
            style={{
              position: "relative",
              width: "280px",
              background: "#0a0a0a",
              height: "100%",
              borderRight: "1px solid #1e1e1e",
              animation: "slideIn 0.25s ease",
              overflowY: "auto",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "8px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#6b6560",
                zIndex: 1,
              }}
            >
              <X size={14} />
            </button>
            <SidebarContent isCollapsed={false} />
          </div>
        </div>
      )}

      {/* ── DESKTOP sidebar ── */}
      <div
        className="sidebar-desktop"
        style={{
          width: collapsed ? "72px" : "268px",
          minHeight: "100vh",
          background: "#0a0a0a",
          borderRight: "1px solid #1e1e1e",
          transition: "width 0.3s ease",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <SidebarContent isCollapsed={collapsed} />
      </div>
    </>
  );
};

export default Sidebar;