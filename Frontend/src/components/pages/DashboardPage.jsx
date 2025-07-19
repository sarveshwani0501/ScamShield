import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Overview from "../dashboard/Overview";
import ScanHistory from "../dashboard/ScanHistory";
import Analytics from "../dashboard/Analytics";
import EducationCenter from "../EducationCenter";
import Settings from "../Settings";

export default function DashboardPage({ onPageChange }) {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "history":
        return <ScanHistory />;
      case "analytics":
        return <Analytics />;
      case "education":
        return <EducationCenter />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onPageChange={onPageChange}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
