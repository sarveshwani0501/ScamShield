import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  AlertTriangle,
  Shield,
  Phone,
  Mail,
  Clock,
  Users,
  Globe,
  BarChart3,
  FileText,
  Zap,
  Eye,
  CheckCircle,
  XCircle,
  Activity,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import toast, { Toaster } from 'react-hot-toast';

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");
  const [activeMetric, setActiveMetric] = useState("overview");

  // Simulated public analytics data
  const overallStats = [
    {
      label: "Total Scans",
      value: "1,24,847",
      change: "+18.2%",
      changeType: "positive",
      icon: Activity,
      color: "blue",
      description: "Total audio & email scans performed",
    },
    {
      label: "Spam Detected",
      value: "31,240",
      change: "+12.5%",
      changeType: "negative", // More spam is bad
      icon: AlertTriangle,
      color: "red",
      description: "High-risk threats identified",
    },
    {
      label: "Detection Accuracy",
      value: "96.8%",
      change: "+2.1%",
      changeType: "positive",
      icon: Shield,
      color: "green",
      description: "AI model accuracy rate",
    },
    {
      label: "Avg Spam Score",
      value: "3.2/10",
      change: "-0.8",
      changeType: "positive", // Lower spam score is good
      icon: BarChart3,
      color: "purple",
      description: "Average risk assessment",
    },
  ];

  // Monthly scan trends
  const monthlyData = [
    {
      month: "Jan",
      calls: 1450,
      emails: 2340,
      totalScans: 3790,
      spamDetected: 870,
      accuracy: 94.2,
    },
    {
      month: "Feb",
      calls: 1890,
      emails: 2980,
      totalScans: 4870,
      spamDetected: 1120,
      accuracy: 95.1,
    },
    {
      month: "Mar",
      calls: 2340,
      emails: 3560,
      totalScans: 5900,
      spamDetected: 1340,
      accuracy: 95.8,
    },
    {
      month: "Apr",
      calls: 2780,
      emails: 4120,
      totalScans: 6900,
      spamDetected: 1580,
      accuracy: 96.2,
    },
    {
      month: "May",
      calls: 3240,
      emails: 4890,
      totalScans: 8130,
      spamDetected: 1890,
      accuracy: 96.5,
    },
    {
      month: "Jun",
      calls: 3650,
      emails: 5670,
      totalScans: 9320,
      spamDetected: 2240,
      accuracy: 96.8,
    },
  ];

  // Daily activity pattern for last 24 hours
  const dailyActivity = [
    { hour: "00", scans: 45, intensity: 15 },
    { hour: "01", scans: 32, intensity: 10 },
    { hour: "02", scans: 28, intensity: 8 },
    { hour: "03", scans: 22, intensity: 6 },
    { hour: "04", scans: 19, intensity: 5 },
    { hour: "05", scans: 31, intensity: 9 },
    { hour: "06", scans: 67, intensity: 22 },
    { hour: "07", scans: 89, intensity: 28 },
    { hour: "08", scans: 134, intensity: 42 },
    { hour: "09", scans: 178, intensity: 55 },
    { hour: "10", scans: 203, intensity: 63 },
    { hour: "11", scans: 234, intensity: 72 },
    { hour: "12", scans: 267, intensity: 82 },
    { hour: "13", scans: 289, intensity: 89 },
    { hour: "14", scans: 312, intensity: 96 },
    { hour: "15", scans: 334, intensity: 100 },
    { hour: "16", scans: 342, intensity: 98 },
    { hour: "17", scans: 318, intensity: 92 },
    { hour: "18", scans: 278, intensity: 84 },
    { hour: "19", scans: 234, intensity: 70 },
    { hour: "20", scans: 189, intensity: 56 },
    { hour: "21", scans: 156, intensity: 45 },
    { hour: "22", scans: 123, intensity: 35 },
    { hour: "23", scans: 89, intensity: 25 },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      red: "text-red-600 bg-red-100 dark:bg-red-900/30",
      green: "text-green-600 bg-green-100 dark:bg-green-900/30",
      purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
      orange: "text-orange-600 bg-orange-100 dark:bg-orange-900/30",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-600 dark:to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ScamShield Analytics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Real-time insights into spam detection and threat prevention
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">1.2M+</span>
                <p className="text-sm text-blue-100">Scans Performed</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">96.8%</span>
                <p className="text-sm text-blue-100">Accuracy Rate</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-2xl font-bold">24/7</span>
                <p className="text-sm text-blue-100">Protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Platform Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive data on spam detection and user activity
            </p>
          </div>

        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overallStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 inline mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Trends */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Scan Trends
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Scans
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Spam Detected
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {data.month}
                  </div>
                  <div className="flex-1 space-y-2">
                    {/* Total Scans Bar */}
                    <div className="relative">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(data.totalScans / 10000) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="absolute right-0 top-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                        {data.totalScans.toLocaleString()}
                      </span>
                    </div>
                    {/* Spam Detected Bar */}
                    <div className="relative">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(data.spamDetected / 3000) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="absolute right-0 top-3 text-xs text-gray-500 dark:text-gray-500">
                        {data.spamDetected.toLocaleString()} spam
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24-Hour Activity Heatmap */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              24-Hour Activity Pattern
            </h3>

            <div className="grid grid-cols-12 gap-1 mb-4">
              {dailyActivity.map((activity, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-sm relative group cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${
                      activity.intensity / 100
                    })`,
                  }}
                  title={`${activity.hour}:00 - ${activity.scans} scans`}
                >
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.hour}:00
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Peak activity: 3PM - 5PM
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Detection Performance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  96.8%
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Accuracy Rate
                </p>
                <p className="text-sm text-green-600 font-medium">
                  +2.1% this month
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  1.2s
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Avg Response Time
                </p>
                <p className="text-sm text-green-600 font-medium">
                  -0.3s improved
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <div>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
                  25.1%
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Spam Detection Rate
                </p>
                <p className="text-sm text-red-600 font-medium">
                  +5.2% this month
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E5E7EB',
          },
        }}
      />
    </div>
  );
}
