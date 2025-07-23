import React from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";

export default function Overview({ onSectionChange }) {
  const stats = [
    {
      label: "Total Scans",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: FileText,
      color: "blue",
    },
    {
      label: "Spam Detected",
      value: "42",
      change: "+3%",
      changeType: "negative",
      icon: AlertTriangle,
      color: "red",
    },
    {
      label: "Safe Content",
      value: "205",
      change: "+9%",
      changeType: "positive",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Success Rate",
      value: "96.8%",
      change: "+1.2%",
      changeType: "positive",
      icon: Shield,
      color: "teal",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "call",
      filename: "suspicious_call_recording.mp3",
      score: 8.2,
      status: "spam",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "email",
      filename: "email_screenshot.png",
      score: 2.1,
      status: "safe",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "call",
      filename: "unknown_caller.wav",
      score: 6.7,
      status: "suspicious",
      timestamp: "1 day ago",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600",
      teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600",
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "spam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "safe":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "suspicious":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your spam detection activity and trends
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onSectionChange && onSectionChange("new-scan")}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-teal-600" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              New Scan
            </span>
          </button>
          <button
            onClick={() => onSectionChange && onSectionChange("analytics")}
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              View Analytics
            </span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              Schedule Report
            </span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`${
                      item.type === "call"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-green-100 dark:bg-green-900/30"
                    } p-2 rounded-lg`}
                  >
                    <FileText
                      className={`h-4 w-4 ${
                        item.type === "call"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.filename}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  {item.score}/10
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-center text-teal-600 hover:text-teal-700 font-medium text-sm">
          View All Activity
        </button>
      </div>
    </div>
  );
}
