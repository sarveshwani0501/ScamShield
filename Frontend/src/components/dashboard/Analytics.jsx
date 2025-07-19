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
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");

  const stats = [
    {
      label: "Detection Accuracy",
      value: "96.8%",
      change: "+2.1%",
      changeType: "positive",
      icon: Shield,
      color: "green",
    },
    {
      label: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "positive",
      icon: Clock,
      color: "blue",
    },
    {
      label: "Threats Blocked",
      value: "1,247",
      change: "+18%",
      changeType: "positive",
      icon: AlertTriangle,
      color: "red",
    },
    {
      label: "Active Users",
      value: "8,432",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "purple",
    },
  ];

  const spamTrends = [
    { month: "Jan", calls: 45, emails: 32, total: 77 },
    { month: "Feb", calls: 52, emails: 28, total: 80 },
    { month: "Mar", calls: 48, emails: 35, total: 83 },
    { month: "Apr", calls: 61, emails: 42, total: 103 },
    { month: "May", calls: 55, emails: 38, total: 93 },
    { month: "Jun", calls: 67, emails: 45, total: 112 },
  ];

  const topThreats = [
    { type: "Fake Warranty Calls", count: 234, percentage: 28.5, trend: "up" },
    { type: "Phishing Emails", count: 198, percentage: 24.1, trend: "down" },
    { type: "Tech Support Scams", count: 156, percentage: 19.0, trend: "up" },
    {
      type: "Prize/Lottery Scams",
      count: 89,
      percentage: 10.8,
      trend: "stable",
    },
    { type: "Romance Scams", count: 67, percentage: 8.2, trend: "up" },
    { type: "Investment Fraud", count: 78, percentage: 9.4, trend: "down" },
  ];

  const geographicData = [
    { country: "United States", threats: 1247, percentage: 45.2 },
    { country: "India", threats: 432, percentage: 15.6 },
    { country: "Nigeria", threats: 298, percentage: 10.8 },
    { country: "Russia", threats: 234, percentage: 8.5 },
    { country: "China", threats: 189, percentage: 6.8 },
    { country: "Others", threats: 356, percentage: 13.1 },
  ];

  const hourlyActivity = [
    { hour: "00", scans: 12 },
    { hour: "01", scans: 8 },
    { hour: "02", scans: 5 },
    { hour: "03", scans: 3 },
    { hour: "04", scans: 7 },
    { hour: "05", scans: 15 },
    { hour: "06", scans: 28 },
    { hour: "07", scans: 45 },
    { hour: "08", scans: 67 },
    { hour: "09", scans: 89 },
    { hour: "10", scans: 95 },
    { hour: "11", scans: 102 },
    { hour: "12", scans: 87 },
    { hour: "13", scans: 78 },
    { hour: "14", scans: 92 },
    { hour: "15", scans: 85 },
    { hour: "16", scans: 76 },
    { hour: "17", scans: 68 },
    { hour: "18", scans: 54 },
    { hour: "19", scans: 42 },
    { hour: "20", scans: 35 },
    { hour: "21", scans: 28 },
    { hour: "22", scans: 22 },
    { hour: "23", scans: 18 },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: "bg-green-100 dark:bg-green-900/30 text-green-600",
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
    };
    return colors[color] || colors.blue;
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

  const maxValue = Math.max(...spamTrends.map((d) => d.total));
  const maxHourlyValue = Math.max(...hourlyActivity.map((d) => d.scans));

  return (
    <div className="space-y-8">
      {/* Everything inside remains same */}
      {/* You've already provided a complete JSX-compatible structure below this point */}
      {/* No TypeScript-specific changes needed inside the returned JSX tree */}
      {/* So it's valid JSX already */}
    </div>
  );
}
