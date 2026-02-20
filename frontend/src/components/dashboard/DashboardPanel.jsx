import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsSection from "./StatsSection";
import ConsultationsTab from "./tabs/ConsultationsTab";
import FirTab from "./tabs/FirTab";
import DocumentsTab from "./tabs/DocumentsTab";
import PaymentsTab from "./tabs/PaymentsTab";
import MessagesTab from "./tabs/MessagesTab";

const DashboardPanel = () => {
  const [selectedTab, setSelectedTab] = useState("fir");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (selectedTab) {
      case "consultations": return <ConsultationsTab />;
      case "fir":           return <FirTab />;
      case "documents":     return <DocumentsTab />;
      case "payments":      return <PaymentsTab />;
      case "messages":      return <MessagesTab />;
      default:              return null;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-950">

        {/* Sticky header */}
        <div className="flex-shrink-0">
          <Header selectedTab={selectedTab} setSidebarOpen={setSidebarOpen} />
          <StatsSection selectedTab={selectedTab} />
        </div>

        {/* Scrollable tab content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderTab()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPanel;