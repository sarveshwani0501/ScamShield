import React from "react";
import {
  BarChart3,
  History,
  BookOpen,
  Settings,
  LogOut,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar({
  activeSection,
  onSectionChange,
  onPageChange,
}) {
  const { logout } = useAuth();

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "history", label: "Scan History", icon: History },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "education", label: "Education Center", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    onPageChange("home");
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-teal-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            SpamGuard
          </span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
