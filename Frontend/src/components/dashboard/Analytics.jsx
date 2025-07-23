
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

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");
  const [activeMetric, setActiveMetric] = useState("overview");

  // Simulated data based on your ScanRecord schema
  const overallStats = [
    {
      label: "Total Scans",
      value: "12,847",
      change: "+18.2%",
      changeType: "positive",
      icon: Activity,
      color: "blue",
      description: "Total audio & email scans performed",
    },
    {
      label: "Spam Detected",
      value: "3,124",
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
      calls: 145,
      emails: 234,
      totalScans: 379,
      spamDetected: 87,
      accuracy: 94.2,
    },
    {
      month: "Feb",
      calls: 189,
      emails: 298,
      totalScans: 487,
      spamDetected: 112,
      accuracy: 95.1,
    },
    {
      month: "Mar",
      calls: 234,
      emails: 356,
      totalScans: 590,
      spamDetected: 134,
      accuracy: 95.8,
    },
    {
      month: "Apr",
      calls: 278,
      emails: 423,
      totalScans: 701,
      spamDetected: 165,
      accuracy: 96.2,
    },
    {
      month: "May",
      calls: 312,
      emails: 489,
      totalScans: 801,
      spamDetected: 189,
      accuracy: 96.5,
    },
    {
      month: "Jun",
      calls: 356,
      emails: 532,
      totalScans: 888,
      spamDetected: 203,
      accuracy: 96.8,
    },
  ];

  // Spam categories based on your schema
  const spamCategories = [
    {
      category: "Fraud/Scam",
      count: 1247,
      percentage: 39.9,
      color: "red",
      trend: "up",
    },
    {
      category: "Phishing",
      count: 934,
      percentage: 29.9,
      color: "orange",
      trend: "up",
    },
    {
      category: "Marketing/Sales",
      count: 456,
      percentage: 14.6,
      color: "yellow",
      trend: "down",
    },
    {
      category: "Tech Support",
      count: 287,
      percentage: 9.2,
      color: "blue",
      trend: "stable",
    },
    {
      category: "Romance Scam",
      count: 134,
      percentage: 4.3,
      color: "purple",
      trend: "up",
    },
    {
      category: "Other",
      count: 66,
      percentage: 2.1,
      color: "gray",
      trend: "stable",
    },
  ];

  // Sentiment analysis data
  const sentimentData = [
    { sentiment: "Aggressive", count: 1456, percentage: 46.6, color: "red" },
    { sentiment: "Persuasive", count: 987, percentage: 31.6, color: "orange" },
    { sentiment: "Neutral", count: 456, percentage: 14.6, color: "gray" },
    { sentiment: "Friendly", count: 225, percentage: 7.2, color: "green" },
  ];

  // Language distribution
  const languageData = [
    { language: "English", count: 8934, percentage: 69.5 },
    { language: "Spanish", count: 2145, percentage: 16.7 },
    { language: "Auto-detect", count: 1456, percentage: 11.3 },
    { language: "French", count: 234, percentage: 1.8 },
    { language: "Other", count: 78, percentage: 0.7 },
  ];

  // Hourly activity pattern
  const hourlyActivity = [
    { hour: "00", scans: 23, spam: 8 },
    { hour: "02", scans: 12, spam: 4 },
    { hour: "04", scans: 18, spam: 6 },
    { hour: "06", scans: 45, spam: 12 },
    { hour: "08", scans: 156, spam: 38 },
    { hour: "10", scans: 234, spam: 67 },
    { hour: "12", scans: 189, spam: 45 },
    { hour: "14", scans: 267, spam: 78 },
    { hour: "16", scans: 298, spam: 89 },
    { hour: "18", scans: 234, spam: 67 },
    { hour: "20", scans: 156, spam: 34 },
    { hour: "22", scans: 89, spam: 23 },
  ];

  const getColorClasses = (color, variant = "bg") => {
    const colorMap = {
      blue: variant === "bg" ? "bg-blue-500" : "text-blue-600",
      red: variant === "bg" ? "bg-red-500" : "text-red-600",
      green: variant === "bg" ? "bg-green-500" : "text-green-600",
      purple: variant === "bg" ? "bg-purple-500" : "text-purple-600",
      orange: variant === "bg" ? "bg-orange-500" : "text-orange-600",
      yellow: variant === "bg" ? "bg-yellow-500" : "text-yellow-600",
      gray: variant === "bg" ? "bg-gray-500" : "text-gray-600",
    };
    return colorMap[color] || colorMap.blue;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  // Calculate max values for chart scaling
  const maxMonthlyScans = Math.max(...monthlyData.map((d) => d.totalScans));
  const maxHourlyScans = Math.max(...hourlyActivity.map((d) => d.scans));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive insights into spam detection performance
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(
                      stat.color
                    )} bg-opacity-20`}
                  >
                    <Icon
                      className={`h-6 w-6 ${getColorClasses(
                        stat.color,
                        "text"
                      )}`}
                    />
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trends */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Monthly Scan Trends
              </h3>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Scans
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Spam Detected
                  </span>
                </div>
              </div>
            </div>

            {/* Simple line chart */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center space-y-2"
                >
                  <div className="w-full flex flex-col items-center space-y-1">
                    {/* Total scans bar */}
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                      style={{
                        height: `${
                          (data.totalScans / maxMonthlyScans) * 200
                        }px`,
                      }}
                    ></div>
                    {/* Spam detected bar overlay */}
                    <div
                      className="w-full bg-red-500 rounded-t-lg -mt-1 transition-all hover:bg-red-600"
                      style={{
                        height: `${
                          (data.spamDetected / maxMonthlyScans) * 200
                        }px`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spam Categories */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Spam Categories
            </h3>

            <div className="space-y-4">
              {spamCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count.toLocaleString()}
                      </span>
                      {getTrendIcon(category.trend)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorClasses(
                        category.color
                      )} transition-all`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {category.percentage}% of total spam
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sentiment Analysis */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Sentiment Analysis
            </h3>

            <div className="space-y-4">
              {sentimentData.map((sentiment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${getColorClasses(
                        sentiment.color
                      )}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {sentiment.sentiment}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {sentiment.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {sentiment.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini pie chart representation */}
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-24 rounded-full relative overflow-hidden bg-gradient-to-r from-red-400 via-orange-400 via-gray-400 to-green-400"></div>
            </div>
          </div>

          {/* Language Distribution */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Language Distribution
            </h3>

            <div className="space-y-4">
              {languageData.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{lang.language}</span>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {lang.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Daily Activity Pattern
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {hourlyActivity.map((activity, index) => (
                <div key={index} className="text-center space-y-2">
                  <div
                    className="w-full rounded-lg bg-blue-500 transition-all hover:bg-blue-600"
                    style={{
                      height: `${Math.max(
                        (activity.scans / maxHourlyScans) * 60,
                        4
                      )}px`,
                      opacity: (activity.scans / maxHourlyScans) * 0.8 + 0.2,
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {activity.hour}:00
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Peak activity: 4PM - 6PM
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
                  24.3%
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
    </div>
  );
}
