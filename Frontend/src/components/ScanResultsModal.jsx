// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Download,
//   Save,
//   AlertTriangle,
//   CheckCircle,
//   FileText,
//   Loader2,
// } from "lucide-react";

// import { useAuth } from "../contexts/AuthContext";

// //  res.json({
// //    success: true,
// //    message: "Analysis completed successfully with AssemblyAI",
// //    data: {
// //      scanId: scanRecord._id,
// //      type: "call",
// //      filename: originalname,
// //      language: transcriptionResult.language,
// //      confidence: transcriptionResult.confidence,
// //      analysisResult,
// //      assemblyAIInsights: {
// //        contentSafety:
// //          transcriptionResult.contentSafety?.summary || "No issues detected",
// //        sentiment: transcriptionResult.sentiment?.[0]?.sentiment || "Neutral",
// //      },
// //      reportUrl: scanRecord.report?.reportUrl || null,
// //      createdAt: scanRecord.createdAt,
// //    },
// //  });

// // const scanRecordSchema = new mongoose.Schema({
// //   userId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     default: null
// //   },
// //   type: {
// //     type: String,
// //     enum: ['call', 'text', 'email'],
// //     required: true,
// //     default: 'call'
// //   },
// //   filename: {
// //     type: String,
// //     required: true
// //   },
// //   fileUrl: {
// //     type: String,
// //     required: true
// //   },
// //   language: {
// //     type: String,
// //     default: 'unknown'
// //   },
// //   analysisResult: {
// //     transcriptText: {
// //       type: String,
// //       required: true
// //     },
// //     spamScore: {
// //       type: Number,
// //       min: 0,
// //       max: 10,
// //       required: true
// //     },
// //     isSpam: {
// //       type: Boolean,
// //       required: true
// //     },
// //     category: {
// //       type: String,
// //       enum: [
// //         'phishing',
// //         'robocall',
// //         'telemarketing',
// //         'financial_scam',
// //         'tech_support_scam',
// //         'romance_scam',
// //         'lottery_scam',
// //         'charity_fraud',
// //         'legitimate',
// //         'suspicious',
// //         'unknown'
// //       ],
// //       default: 'unknown'
// //     },
// //     redFlags: [{
// //       type: String
// //     }],
// //     explanation: [{
// //       type: String
// //     }],
// //     sentiment: {
// //       type: String,
// //       enum: ['aggressive', 'manipulative', 'friendly', 'neutral', 'urgent', 'threatening','suspicious'],
// //       default: 'neutral'
// //     },
// //     recommendedActions: [{
// //       type: String
// //     }],
// //     similarityScore: {
// //       type: Number,
// //       min: 0,
// //       max: 100,
// //       default: 0
// //     }
// //   },
// //   metadata: {
// //     fileSize: Number,
// //     duration: Number,
// //     uploadedAt: {
// //       type: Date,
// //       default: Date.now
// //     },
// //     processingTime: Number,
// //     confidence: Number
// //   },
// //   // Embedded report history
// //     report: {
// //       reportUrl: { type: String }, // downloadable PDF
// //       savedAt: { type: Date, default: null }, // only set if report is saved
// //     },

// // }, {
// //   timestamps: true
// // });

// // // Index for better query performance
// // scanRecordSchema.index({ userId: 1, createdAt: -1 });
// // scanRecordSchema.index({ 'analysisResult.isSpam': 1 });
// // scanRecordSchema.index({ 'analysisResult.spamScore': 1 });

// // const ScanRecord = mongoose.model('ScanRecord', scanRecordSchema);

// // module.exports = ScanRecord;

// export default function ScanResultsModal({
//   isOpen,
//   onClose,
//   content,
//   type,
//   language,
// }) {
//   const [stage, setStage] = useState("analyzing");
//   const [progress, setProgress] = useState(0);
//   const [result, setResult] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (isOpen && content) {
//       setStage("analyzing");
//       setProgress(0);
//       setResult(null);
//       const progressInterval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(progressInterval);
//             setResult(content);
//             console.log(content);
//             setStage("results");
//             return 100;
//           }
//           return prev + 2;
//         });
//       }, 50);

//       return () => clearInterval(progressInterval);
//     }
//   }, [isOpen, content, type]);

//   if (!isOpen) return null;

//   function handlePDFClick() {
//     window.location.href = content.reportUrl;
//   }

//   const getScoreColor = (score) => {
//     if (score <= 3) return "text-green-600 bg-green-100 dark:bg-green-900/30";
//     if (score <= 7)
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
//     return "text-red-600 bg-red-100 dark:bg-red-900/30";
//   };

//   const getScoreLabel = (score) => {
//     if (score <= 3) return "Safe";
//     if (score <= 7) return "Suspicious";
//     return "High Risk";
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {stage === "analyzing" ? "Analyzing Content" : "Analysis Results"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             <X className="h-6 w-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6">
//           {stage === "analyzing" ? (
//             <div className="text-center py-12">
//               <Loader2 className="h-16 w-16 text-teal-600 animate-spin mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//                 {progress < 50
//                   ? "Transcribing audio..."
//                   : "Analyzing for spam patterns..."}
//               </h3>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 max-w-md mx-auto">
//                 <div
//                   className="bg-teal-600 h-3 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <p className="text-gray-600 dark:text-gray-400">
//                 {progress}% complete
//               </p>

//               {type === "call" && progress > 20 && (
//                 <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-2xl mx-auto">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                     Live Transcript Preview:
//                   </h4>
//                   <p className="text-gray-600 dark:text-gray-400 text-left">
//                     {result.analysisResult.transcriptText}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ) : result ? (
//             <div className="space-y-8">
//               {/* Score Banner */}
//               <div
//                 className={`p-6 rounded-xl ${getScoreColor(
//                   result.analysisResult.spamScore
//                 )}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     {result.analysisResult.isSpam ? (
//                       <AlertTriangle className="h-8 w-8" />
//                     ) : (
//                       <CheckCircle className="h-8 w-8" />
//                     )}
//                     <div>
//                       <h3 className="text-2xl font-bold">
//                         Spam Score: {result.analysisResult.spamScore.toFixed(1)}
//                         /10
//                       </h3>
//                       <p className="text-lg">
//                         {/* {getScoreLabel(result.score)} -{" "}
//                         {(result.confidence * 100).toFixed(0)}% confidence */}
//                         {result.confidence}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Transcript */}
//               {result.analysisResult.transcriptText && (
//                 <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
//                   <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                     <FileText className="h-5 w-5" />
//                     <span>Transcript</span>
//                   </h4>
//                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                     {result.analysisResult.transcriptText}
//                   </p>
//                 </div>
//               )}

//               {/* Analysis */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                   AI Analysis
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {result.analysisResult.explanation.map((phrase, index) => (
//                     <span
//                       key={index}
//                       className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
//                     >
//                       {phrase}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Key Phrases */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                   Suspicious Phrases Detected
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {result.analysisResult.redFlags.map((phrase, index) => (
//                     <span
//                       key={index}
//                       className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
//                     >
//                       "{phrase}"
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Recommendations */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                   Recommendations
//                 </h4>
//                 <ul className="space-y-2">
//                   {result.analysisResult.recommendedActions.map(
//                     (rec, index) => (
//                       <li key={index} className="flex items-start space-x-2">
//                         <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700 dark:text-gray-300">
//                           {rec}
//                         </span>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={handlePDFClick}
//                   className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
//                 >
//                   <Download className="h-5 w-5" />
//                   <span>Download Report</span>
//                 </button>

//                 {user && (
//                   <button className="flex items-center justify-center space-x-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
//                     <Save className="h-5 w-5" />
//                     <span>Save to Dashboard</span>
//                   </button>
//                 )}

//                 <button
//                   onClick={onClose}
//                   className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <span>Try Again</span>
//                 </button>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Download,
//   Save,
//   AlertTriangle,
//   CheckCircle,
//   FileText,
//   Loader2,
// } from "lucide-react";

// import { useAuth } from "../contexts/AuthContext";

// export default function ScanResultsModal({
//   isOpen,
//   onClose,
//   content,
//   type,
//   language,
// }) {
//   const [stage, setStage] = useState("analyzing");
//   const [progress, setProgress] = useState(0);
//   const [result, setResult] = useState(null);
//   const [progressInterval, setProgressInterval] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (isOpen) {

//       setStage("analyzing");
//       setProgress(0);
//       setResult(null);

//       if (content) {
//         setResult(content);
//         setStage("results");
//         setProgress(100);
//         return;
//       }

//       // Start progress simulation
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 95) {
//             // Don't complete until we have content
//             return prev;
//           }
//           return prev + Math.random() * 5; // More realistic progress increments
//         });
//       }, 200);

//       setProgressInterval(interval);

//       const timeout = setTimeout(() => {
//         clearInterval(interval);
//         setStage("error");
//       }, 60000);

//       return () => {
//         clearInterval(interval);
//         clearTimeout(timeout);
//       };
//     } else {
//       // Clean up when modal closes
//       if (progressInterval) {
//         clearInterval(progressInterval);
//         setProgressInterval(null);
//       }
//     }
//   }, [isOpen]);

//   // Update when content is received
//   useEffect(() => {
//     if (content && stage === "analyzing") {
//       if (progressInterval) {
//         clearInterval(progressInterval);
//       }
//       setResult(content);
//       setStage("results");
//       setProgress(100);
//     }
//   }, [content, stage, progressInterval]);

//   if (!isOpen) return null;

//   function handlePDFClick() {
//     if (result?.reportUrl) {
//       window.open(result.reportUrl, "_blank");
//     }
//   }

//   const getScoreColor = (score) => {
//     if (score <= 3) return "text-green-600 bg-green-100 dark:bg-green-900/30";
//     if (score <= 7)
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
//     return "text-red-600 bg-red-100 dark:bg-red-900/30";
//   };

//   const getScoreLabel = (score) => {
//     if (score <= 3) return "Safe";
//     if (score <= 7) return "Suspicious";
//     return "High Risk";
//   };

//   const analysisResult = result?.analysisResult;
//   const assemblyInsights = result?.assemblyAIInsights;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {stage === "analyzing"
//               ? "Analyzing Content"
//               : stage === "error"
//               ? "Analysis Failed"
//               : "Analysis Results"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             <X className="h-6 w-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6">
//           {stage === "analyzing" ? (
//             <div className="text-center py-12">
//               <Loader2 className="h-16 w-16 text-teal-600 animate-spin mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//                 {progress < 30
//                   ? "Uploading and processing..."
//                   : progress < 70
//                   ? "Transcribing audio..."
//                   : "Analyzing for spam patterns..."}
//               </h3>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 max-w-md mx-auto">
//                 <div
//                   className="bg-teal-600 h-3 rounded-full transition-all duration-300"
//                   style={{ width: `${Math.min(progress, 95)}%` }}
//                 ></div>
//               </div>
//               <p className="text-gray-600 dark:text-gray-400">
//                 {Math.round(Math.min(progress, 95))}% complete
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 This may take up to 60 seconds for large files
//               </p>
//             </div>
//           ) : stage === "error" ? (
//             <div className="text-center py-12">
//               <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//                 Analysis Failed
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 mb-6">
//                 The analysis took too long or encountered an error. Please try
//                 again with a smaller file or check your connection.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : result && analysisResult ? (
//             <div className="space-y-8">
//               {/* Score Banner */}
//               <div
//                 className={`p-6 rounded-xl ${getScoreColor(
//                   analysisResult.spamScore || 0
//                 )}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     {analysisResult.isSpam ? (
//                       <AlertTriangle className="h-8 w-8" />
//                     ) : (
//                       <CheckCircle className="h-8 w-8" />
//                     )}
//                     <div>
//                       <h3 className="text-2xl font-bold">
//                         Spam Score: {(analysisResult.spamScore || 0).toFixed(1)}
//                         /10
//                       </h3>
//                       <p className="text-lg">
//                         {getScoreLabel(analysisResult.spamScore || 0)} -
//                         {result.confidence &&
//                         typeof result.confidence === "number"
//                           ? ` ${(result.confidence * 100).toFixed(
//                               0
//                             )}% confidence`
//                           : ""}
//                       </p>
//                       {analysisResult.category && (
//                         <p className="text-sm capitalize">
//                           Category:{" "}
//                           {typeof analysisResult.category === "string"
//                             ? analysisResult.category.replace("_", " ")
//                             : "Unknown"}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Insights */}
//               {assemblyInsights && (
//                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
//                   <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                     Additional Insights
//                   </h4>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                         Content Safety:
//                       </span>
//                       <p className="text-gray-800 dark:text-gray-200">
//                         {typeof assemblyInsights.contentSafety === "string"
//                           ? assemblyInsights.contentSafety
//                           : "No issues detected"}
//                       </p>
//                     </div>
//                     <div>
//                       <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                         Sentiment:
//                       </span>
//                       <p className="text-gray-800 dark:text-gray-200">
//                         {typeof assemblyInsights.sentiment === "string"
//                           ? assemblyInsights.sentiment
//                           : "Neutral"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Transcript */}
//               {analysisResult.transcriptText && (
//                 <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
//                   <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                     <FileText className="h-5 w-5" />
//                     <span>Transcript</span>
//                     {result.language && (
//                       <span className="text-sm text-gray-500">
//                         (
//                         {typeof result.language === "string"
//                           ? result.language
//                           : "Unknown"}
//                         )
//                       </span>
//                     )}
//                   </h4>
//                   <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                     {typeof analysisResult.transcriptText === "string"
//                       ? analysisResult.transcriptText
//                       : "Transcript not available"}
//                   </p>
//                 </div>
//               )}

//               {/* Analysis Explanation */}
//               {analysisResult.explanation &&
//                 Array.isArray(analysisResult.explanation) &&
//                 analysisResult.explanation.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                       AI Analysis
//                     </h4>
//                     <div className="space-y-2">
//                       {analysisResult.explanation.map((explanation, index) => (
//                         <p
//                           key={index}
//                           className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
//                         >
//                           {typeof explanation === "string"
//                             ? explanation
//                             : JSON.stringify(explanation)}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//               {/* Red Flags */}
//               {analysisResult.redFlags &&
//                 Array.isArray(analysisResult.redFlags) &&
//                 analysisResult.redFlags.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                       Suspicious Phrases Detected
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {analysisResult.redFlags.map((phrase, index) => (
//                         <span
//                           key={index}
//                           className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
//                         >
//                           "
//                           {typeof phrase === "string"
//                             ? phrase
//                             : JSON.stringify(phrase)}
//                           "
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//               {/* Recommendations */}
//               {analysisResult.recommendedActions &&
//                 Array.isArray(analysisResult.recommendedActions) &&
//                 analysisResult.recommendedActions.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
//                       Recommendations
//                     </h4>
//                     <ul className="space-y-2">
//                       {analysisResult.recommendedActions.map((rec, index) => (
//                         <li key={index} className="flex items-start space-x-2">
//                           <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700 dark:text-gray-300">
//                             {typeof rec === "string"
//                               ? rec
//                               : JSON.stringify(rec)}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 {result.reportUrl && (
//                   <button
//                     onClick={handlePDFClick}
//                     className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
//                   >
//                     <Download className="h-5 w-5" />
//                     <span>Download Report</span>
//                   </button>
//                 )}

//                 {user && (
//                   <button className="flex items-center justify-center space-x-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
//                     <Save className="h-5 w-5" />
//                     <span>Save to Dashboard</span>
//                   </button>
//                 )}

//                 <button
//                   onClick={onClose}
//                   className="flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   <span>Close</span>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//                 No Analysis Results
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Unable to display analysis results. Please try again.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  Save,
  AlertTriangle,
  CheckCircle,
  FileText,
  Loader2,
  Mail,
  Paperclip,
  User,
  Calendar,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function ScanResultsModal({
  isOpen,
  onClose,
  content,
  type,
  language,
}) {
  const [stage, setStage] = useState("analyzing");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [progressInterval, setProgressInterval] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setStage("analyzing");
      setProgress(0);
      setResult(null);

      if (content) {
        setResult(content);
        setStage("results");
        setProgress(100);
        return;
      }

      // Start progress simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            // Don't complete until we have content
            return prev;
          }
          return prev + Math.random() * 5; // More realistic progress increments
        });
      }, 200);

      setProgressInterval(interval);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStage("error");
      }, 60000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      // Clean up when modal closes
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
  }, [isOpen]);

  // Update when content is received
  useEffect(() => {
    if (content && stage === "analyzing") {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setResult(content);
      setStage("results");
      setProgress(100);
    }
  }, [content, stage, progressInterval]);

  if (!isOpen) return null;

  function handlePDFClick() {
    if (result?.reportUrl) {
      window.open(result.reportUrl, "_blank");
    }
  }

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

  const analysisResult = result?.analysisResult;
  const assemblyInsights = result?.assemblyAIInsights;
  const emailInfo = result?.emailInfo;
  const isEmailScan = result?.type === "email" || type === "email";

  const getAnalysisTitle = () => {
    if (stage === "analyzing") {
      return "Analyzing Content";
    }
    if (stage === "error") {
      return "Analysis Failed";
    }
    return isEmailScan ? "Email Analysis Results" : "Analysis Results";
  };

  const getAnalyzingMessage = () => {
    if (isEmailScan) {
      if (progress < 30) return "Processing email...";
      if (progress < 70) return "Extracting content...";
      return "Analyzing for spam patterns...";
    }

    if (progress < 30) return "Uploading and processing...";
    if (progress < 70) return "Transcribing audio...";
    return "Analyzing for spam patterns...";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getAnalysisTitle()}
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
                {getAnalyzingMessage()}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 max-w-md mx-auto">
                <div
                  className="bg-teal-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 95)}%` }}
                ></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {Math.round(Math.min(progress, 95))}% complete
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This may take up to 60 seconds for large files
              </p>
            </div>
          ) : stage === "error" ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Analysis Failed
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The analysis took too long or encountered an error. Please try
                again with a smaller file or check your connection.
              </p>
              <button
                onClick={onClose}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : result && analysisResult ? (
            <div className="space-y-8">
              {/* Email Info Section - Only for email scans */}
              {isEmailScan && emailInfo && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span>Email Information</span>
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Subject:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {emailInfo.subject || "No subject"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>From:</span>
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {emailInfo.from || "Unknown sender"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        To:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {emailInfo.to || "Unknown recipient"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                        <Paperclip className="h-4 w-4" />
                        <span>Attachments:</span>
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {emailInfo.hasAttachments ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  {result.createdAt && (
                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Analyzed:</span>
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {new Date(result.createdAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Score Banner */}
              <div
                className={`p-6 rounded-xl ${getScoreColor(
                  analysisResult.spamScore || 0
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {analysisResult.isSpam ? (
                      <AlertTriangle className="h-8 w-8" />
                    ) : (
                      <CheckCircle className="h-8 w-8" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">
                        Spam Score: {(analysisResult.spamScore || 0).toFixed(1)}
                        /10
                      </h3>
                      <p className="text-lg">
                        {getScoreLabel(analysisResult.spamScore || 0)} -
                        {result.confidence &&
                        typeof result.confidence === "number"
                          ? ` ${(result.confidence * 100).toFixed(
                              0
                            )}% confidence`
                          : ""}
                      </p>
                      {analysisResult.category && (
                        <p className="text-sm capitalize">
                          Category:{" "}
                          {typeof analysisResult.category === "string"
                            ? analysisResult.category.replace("_", " ")
                            : "Unknown"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Insights - For call scans */}
              {!isEmailScan && assemblyInsights && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Additional Insights
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Content Safety:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {typeof assemblyInsights.contentSafety === "string"
                          ? assemblyInsights.contentSafety
                          : "No issues detected"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Sentiment:
                      </span>
                      <p className="text-gray-800 dark:text-gray-200">
                        {typeof assemblyInsights.sentiment === "string"
                          ? assemblyInsights.sentiment
                          : "Neutral"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript/Content */}
              {analysisResult.transcriptText && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>{isEmailScan ? "Email Content" : "Transcript"}</span>
                    {result.language && (
                      <span className="text-sm text-gray-500">
                        (
                        {typeof result.language === "string"
                          ? result.language
                          : "Unknown"}
                        )
                      </span>
                    )}
                  </h4>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed max-h-96 overflow-y-auto">
                    {typeof analysisResult.transcriptText === "string"
                      ? analysisResult.transcriptText
                          .split("\n")
                          .map((line, index) => (
                            <p key={index} className="mb-2">
                              {line}
                            </p>
                          ))
                      : "Content not available"}
                  </div>
                </div>
              )}

              {/* Analysis Explanation */}
              {analysisResult.explanation &&
                Array.isArray(analysisResult.explanation) &&
                analysisResult.explanation.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      AI Analysis
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.explanation.map((explanation, index) => (
                        <p
                          key={index}
                          className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          {typeof explanation === "string"
                            ? explanation
                            : JSON.stringify(explanation)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              {/* Red Flags */}
              {analysisResult.redFlags &&
                Array.isArray(analysisResult.redFlags) &&
                analysisResult.redFlags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Suspicious Phrases Detected
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.redFlags.map((phrase, index) => (
                        <span
                          key={index}
                          className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm"
                        >
                          "
                          {typeof phrase === "string"
                            ? phrase
                            : JSON.stringify(phrase)}
                          "
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Recommendations */}
              {analysisResult.recommendedActions &&
                Array.isArray(analysisResult.recommendedActions) &&
                analysisResult.recommendedActions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {analysisResult.recommendedActions.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {typeof rec === "string"
                              ? rec
                              : JSON.stringify(rec)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                {result.reportUrl && (
                  <button
                    onClick={handlePDFClick}
                    className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Report</span>
                  </button>
                )}

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
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                No Analysis Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unable to display analysis results. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
