import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import Sidebar from "../dashboard/Sidebar";
import Overview from "../dashboard/Overview";
import NewScan from "../dashboard/NewScan";
import ScanHistory from "../dashboard/ScanHistory";
import EducationCenter from "../EducationCenter";
import ScanResultsModal from "../ScanResultsModal";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api.js";
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage({ onPageChange }) {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("new-scan");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanContent, setScanContent] = useState(null);
  const [scanType, setScanType] = useState("call");
  const [scanLanguage, setScanLanguage] = useState("auto");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  //  res.json({
  //    success: true,
  //    message: "Analysis completed successfully with AssemblyAI",
  //    data: {
  //      scanId: scanRecord._id,
  //      type: "call",
  //      filename: originalname,
  //      language: transcriptionResult.language,
  //      confidence: transcriptionResult.confidence,
  //      analysisResult,
  //      assemblyAIInsights: {
  //        contentSafety:
  //          transcriptionResult.contentSafety?.summary || "No issues detected",
  //        sentiment: transcriptionResult.sentiment?.[0]?.sentiment || "Neutral",
  //      },
  //      reportUrl: scanRecord.report?.reportUrl || null,
  //      createdAt: scanRecord.createdAt,
  //    },
  //  });

  const handleAnalyze = async (content, type, language) => {
    try {
      setScanModalOpen(true);
      setIsAnalyzing(true);
      
      const loadingToast = toast.loading(`Analyzing ${type}... This may take a moment.`);
      
      if (type === "call") {
        const formData = new FormData();
        formData.append("audio", content);
        console.log(content);
        const response = await axios.post(
          API_ENDPOINTS.SPAM_DETECTION.ANALYZE_CALL,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        console.log("Datafregvr:", response.data.data);
        if (!response.data.success) {
          console.error("Error");
          toast.error("Analysis failed. Please try again.", { id: loadingToast });
          setIsAnalyzing(false);
          setScanModalOpen(false);
          return;
        } else {
          setScanContent(response?.data?.data);
          toast.success("Analysis completed successfully!", { id: loadingToast });
        }
      } else {
        const formData = new FormData();
        formData.append("email", content);
        console.log(content);
        const response = await axios.post(
          API_ENDPOINTS.SPAM_DETECTION.ANALYZE_EMAIL,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (!response.data.success) {
          console.error("Error");
          toast.error("Analysis failed. Please try again.", { id: loadingToast });
          setIsAnalyzing(false);
          setScanModalOpen(false);
          return;
        } else {
          setScanContent(response?.data?.data);
          toast.success("Analysis completed successfully!", { id: loadingToast });
        }
      }
      setScanType(type);
      setScanLanguage(language);
    } catch (error) {
      const message = error?.response?.data?.message || "Analysis failed. Please try again.";
      toast.error(message);
      setIsAnalyzing(false);
      setScanModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setScanModalOpen(false);
    setIsAnalyzing(false);
    setScanContent(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview onSectionChange={setActiveSection} />;
      case "new-scan":
        return <NewScan onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />;
      case "history":
        return <ScanHistory />;
      case "education":
        return <EducationCenter />;
      default:
        return <Overview onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onPageChange={onPageChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 overflow-auto lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        <div className="p-8">{renderContent()}</div>
      </div>

      <ScanResultsModal
        isOpen={scanModalOpen}
        onClose={handleModalClose}
        content={scanContent}
        type={scanType}
        language={scanLanguage}
      />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          className: '',
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}
