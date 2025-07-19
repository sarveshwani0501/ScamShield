import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Save,
  AlertTriangle,
  CheckCircle,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function ScanResultsModal({
  isOpen,
  onClose,
  file,
  type,
  language,
}) {
  const [stage, setStage] = useState("analyzing");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && file) {
      setStage("analyzing");
      setProgress(0);
      setResult(null);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            const mockResult = {
              score: Math.random() * 10,
              isSpam: Math.random() > 0.6,
              transcript:
                type === "call"
                  ? "Hello, this is an urgent call regarding your car warranty. You need to call us back immediately at 1-800-SCAM-123 to avoid cancellation. Press 1 to speak with an agent now."
                  : undefined,
              analysis:
                "This content shows multiple red flags commonly associated with spam/fraud attempts. The urgent language, pressure tactics, and request for immediate action are typical spam indicators.",
              keyPhrases: [
                "urgent call",
                "call back immediately",
                "avoid cancellation",
                "press 1",
              ],
              confidence: 0.92,
              recommendations: [
                "Do not respond to this communication",
                "Block the sender/caller",
                "Report to appropriate authorities if requested personal information",
              ],
            };
            setResult(mockResult);
            setStage("results");
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(progressInterval);
    }
  }, [isOpen, file, type]);

  if (!isOpen) return null;

  const getScoreColor = (score) => {
    if (score <= 3) return "text-green-600 bg-green-100 dark:bg-green-900/30";
    if (score <= 7)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-red-600 bg-red-100 dark:bg-red-900/30";
  };

  const getScoreLabel = (score) => {
    if (score <= 3) return "Safe";
    if (score <= 7) return "Suspicious";
    return "High Risk";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {stage === "analyzing" ? "Analyzing Content" : "Analysis Results"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {stage === "analyzing" ? (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 text-teal-600 animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {progress < 50
                  ? "Transcribing audio..."
                  : "Analyzing for spam patterns..."}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 max-w-md mx-auto">
                <div
                  className="bg-teal-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {progress}% complete
              </p>

              {type === "call" && progress > 20 && (
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-2xl mx-auto">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Live Transcript Preview:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-left">
                    Hello, this is an urgent call regarding your car warranty...
                  </p>
                </div>
              )}
            </div>
          ) : result ? (
            <div className="space-y-8">
              <div className={`p-6 rounded-xl ${getScoreColor(result.score)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {result.isSpam ? (
                      <AlertTriangle className="h-8 w-8" />
                    ) : (
                      <CheckCircle className="h-8 w-8" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">
                        Spam Score: {result.score.toFixed(1)}/10
                      </h3>
                      <p className="text-lg">
                        {getScoreLabel(result.score)} -{" "}
                        {(result.confidence * 100).toFixed(0)}% confidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {result.transcript && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Transcript</span>
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {result.transcript}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  AI Analysis
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {result.analysis}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Suspicious Phrases Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.keyPhrases.map((phrase, index) => (
                    <span
                      key={index}
                      className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
                    >
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                  <Download className="h-5 w-5" />
                  <span>Download Report</span>
                </button>

                {user && (
                  <button className="flex items-center justify-center space-x-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                    <Save className="h-5 w-5" />
                    <span>Save to Dashboard</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
