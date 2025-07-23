// import React, { useState } from "react";
// import {
//   Upload,
//   Phone,
//   Mail,
//   Loader2,
//   FileAudio,
//   MessageSquare,
// } from "lucide-react";

// export default function NewScan({ onAnalyze, isAnalyzing }) {
//   const [activeTab, setActiveTab] = useState("call");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [emailText, setEmailText] = useState("");
//   const [language, setLanguage] = useState("auto");
//   const [dragOver, setDragOver] = useState(false);

//   const handleFileSelect = (file) => {
//     setSelectedFile(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0 && activeTab === "call") {
//       handleFileSelect(files[0]);
//     }
//   };

//   const handleAnalyze = async () => {
//     console.log("Selected file", selectedFile);
//     console.log("active tab", activeTab);
//     console.log("lang", language);
//     if (activeTab === "call" && selectedFile) {
//       await onAnalyze(selectedFile, "call", language);
//     } else if (activeTab === "email" && emailText.trim()) {
//       onAnalyze(emailText, "email");
//     }
//   };

//   const canAnalyze =
//     (activeTab === "call" && selectedFile) ||
//     (activeTab === "email" && emailText.trim());

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           New Scan
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           Analyze calls and emails for spam and fraud detection
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-center">
//         <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
//           <button
//             onClick={() => setActiveTab("call")}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
//               activeTab === "call"
//                 ? "bg-white dark:bg-gray-700 text-teal-600 shadow-sm"
//                 : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//             }`}
//           >
//             <Phone className="h-5 w-5" />
//             <span className="font-medium">Analyze Call</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("email")}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
//               activeTab === "email"
//                 ? "bg-white dark:bg-gray-700 text-teal-600 shadow-sm"
//                 : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//             }`}
//           >
//             <Mail className="h-5 w-5" />
//             <span className="font-medium">Analyze Email</span>
//           </button>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
//         {activeTab === "call" ? (
//           <div className="space-y-6">
//             {/* Audio Upload */}
//             <div
//               onDrop={handleDrop}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setDragOver(true);
//               }}
//               onDragLeave={() => setDragOver(false)}
//               className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
//                 dragOver
//                   ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
//                   : "border-gray-300 dark:border-gray-600 hover:border-teal-400"
//               }`}
//             >
//               {selectedFile ? (
//                 <div className="space-y-4">
//                   <FileAudio className="h-12 w-12 text-teal-600 mx-auto" />
//                   <div>
//                     <p className="text-lg font-medium text-gray-900 dark:text-white">
//                       {selectedFile.name}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setSelectedFile(null)}
//                     className="text-teal-600 hover:text-teal-700 text-sm font-medium"
//                   >
//                     Choose different file
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <Upload className="h-12 w-12 text-gray-400 mx-auto" />
//                   <div>
//                     <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       Drop your audio file here
//                     </p>
//                     <p className="text-gray-500 dark:text-gray-400 mb-4">
//                       or click to browse
//                     </p>
//                     <input
//                       type="file"
//                       accept="audio/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) handleFileSelect(file);
//                       }}
//                       className="hidden"
//                       id="audio-upload"
//                     />
//                     <label
//                       htmlFor="audio-upload"
//                       className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer inline-block"
//                     >
//                       Browse Files
//                     </label>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Language Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Audio Language
//               </label>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               >
//                 <option value="auto">Auto-detect</option>
//                 <option value="en">English</option>
//                 <option value="es">Spanish</option>
//                 <option value="fr">French</option>
//                 <option value="de">German</option>
//                 <option value="it">Italian</option>
//                 <option value="pt">Portuguese</option>
//                 <option value="ru">Russian</option>
//                 <option value="zh">Chinese</option>
//               </select>
//             </div>

//             {/* Supported Formats */}
//             <div className="text-center">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Supported formats: MP3, WAV, M4A, OGG, FLAC
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Email Text Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email Content
//               </label>
//               <div className="relative">
//                 <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   value={emailText}
//                   onChange={(e) => setEmailText(e.target.value)}
//                   placeholder="Paste the email content here..."
//                   rows={12}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
//                 />
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 Copy and paste the email content including headers, subject, and
//                 body text
//               </p>
//             </div>

//             {/* Character Count */}
//             <div className="text-right">
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {emailText.length} characters
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Analyze Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={handleAnalyze}
//             disabled={!canAnalyze || isAnalyzing}
//             className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 mx-auto"
//           >
//             {isAnalyzing ? (
//               <>
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 <span>Analyzing...</span>
//               </>
//             ) : (
//               <span>Analyze Now</span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import {
//   Upload,
//   Phone,
//   Mail,
//   Loader2,
//   FileAudio,
//   MessageSquare,
//   Shield,
//   Zap,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// export default function NewScan({ onAnalyze, isAnalyzing }) {
//   const [activeTab, setActiveTab] = useState("call");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [emailText, setEmailText] = useState("");
//   const [language, setLanguage] = useState("auto");
//   const [dragOver, setDragOver] = useState(false);

//   const handleFileSelect = (file) => {
//     setSelectedFile(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0 && activeTab === "call") {
//       handleFileSelect(files[0]);
//     }
//   };

//   const handleAnalyze = async () => {
//     console.log("Selected file", selectedFile);
//     console.log("active tab", activeTab);
//     console.log("lang", language);
//     if (activeTab === "call" && selectedFile) {
//       await onAnalyze(selectedFile, "call", language);
//     } else if (activeTab === "email" && emailText.trim()) {
//       onAnalyze(emailText, "email");
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("audio-upload").click();
//   };

//   const canAnalyze =
//     (activeTab === "call" && selectedFile) ||
//     (activeTab === "email" && emailText.trim());

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 py-8 px-4">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
//             <Shield className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//             Advanced Security Scan
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Protect yourself with AI-powered analysis of calls and emails for
//             spam, phishing, and fraud detection
//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                 <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                   AI-Powered
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Advanced detection
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
//                 <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                   Secure
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Privacy protected
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
//                 <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                   Real-time
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Instant results
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center">
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
//             <button
//               onClick={() => setActiveTab("call")}
//               className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 ${
//                 activeTab === "call"
//                   ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
//               }`}
//             >
//               <Phone className="h-5 w-5" />
//               <span className="font-semibold">Analyze Call</span>
//             </button>
//             <button
//               onClick={() => setActiveTab("email")}
//               className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 ${
//                 activeTab === "email"
//                   ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
//               }`}
//             >
//               <Mail className="h-5 w-5" />
//               <span className="font-semibold">Analyze Email</span>
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-12">
//           {activeTab === "call" ? (
//             <div className="space-y-8">
//               {/* Audio Upload */}
//               <div
//                 onClick={triggerFileInput}
//                 onDrop={handleDrop}
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   setDragOver(true);
//                 }}
//                 onDragLeave={() => setDragOver(false)}
//                 className={`relative border-2 border-dashed rounded-3xl p-12 lg:p-16 text-center transition-all duration-300 cursor-pointer group ${
//                   dragOver
//                     ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 scale-105"
//                     : selectedFile
//                     ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
//                     : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:scale-105"
//                 } shadow-lg hover:shadow-xl`}
//               >
//                 {/* Background Pattern */}
//                 <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>

//                 {selectedFile ? (
//                   <div className="space-y-6 relative z-10">
//                     <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
//                       <FileAudio className="h-10 w-10 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                         {selectedFile.name}
//                       </h3>
//                       <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
//                         {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                       <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
//                         <CheckCircle className="h-4 w-4 mr-2" />
//                         File ready for analysis
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedFile(null);
//                       }}
//                       className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm"
//                     >
//                       Choose different file
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="space-y-6 relative z-10">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:from-blue-400 group-hover:to-indigo-500 transition-all duration-300">
//                       <Upload className="h-10 w-10 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//                         Drop your audio file here
//                       </h3>
//                       <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
//                         or click anywhere in this box to browse files
//                       </p>
//                       <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 cursor-pointer font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
//                         <Upload className="h-5 w-5 mr-2" />
//                         Browse Files
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <input
//                   type="file"
//                   accept="audio/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleFileSelect(file);
//                   }}
//                   className="hidden"
//                   id="audio-upload"
//                 />
//               </div>

//               {/* Language Selection */}
//               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
//                 <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Audio Language
//                 </label>
//                 <select
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full md:w-auto px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
//                 >
//                   <option value="auto">🌐 Auto-detect</option>
//                   <option value="en">🇺🇸 English</option>
//                   <option value="es">🇪🇸 Spanish</option>
//                   <option value="fr">🇫🇷 French</option>
//                   <option value="de">🇩🇪 German</option>
//                   <option value="it">🇮🇹 Italian</option>
//                   <option value="pt">🇵🇹 Portuguese</option>
//                   <option value="ru">🇷🇺 Russian</option>
//                   <option value="zh">🇨🇳 Chinese</option>
//                 </select>
//               </div>

//               {/* Supported Formats */}
//               <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
//                 <p className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">
//                   Supported Audio Formats
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-3">
//                   {["MP3", "WAV", "M4A", "OGG", "FLAC"].map((format) => (
//                     <span
//                       key={format}
//                       className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
//                     >
//                       {format}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {/* Email Text Input */}
//               <div>
//                 <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Email Content Analysis
//                 </label>
//                 <div className="relative">
//                   <div className="absolute top-4 left-4 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
//                     <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <textarea
//                     value={emailText}
//                     onChange={(e) => setEmailText(e.target.value)}
//                     placeholder="Paste your email content here including headers, subject line, and full message body..."
//                     rows={14}
//                     className="w-full pl-16 pr-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-lg transition-all shadow-sm"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Include email headers, subject line, sender information, and
//                     message body for best results
//                   </p>
//                   <span className="text-lg font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
//                     {emailText.length.toLocaleString()} chars
//                   </span>
//                 </div>
//               </div>

//               {/* Email Tips */}
//               <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
//                 <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 text-lg">
//                   💡 Analysis Tips
//                 </h4>
//                 <ul className="space-y-2 text-amber-700 dark:text-amber-300">
//                   <li>
//                     • Include complete email headers for better detection
//                     accuracy
//                   </li>
//                   <li>
//                     • Paste the entire email including sender details and
//                     timestamps
//                   </li>
//                   <li>
//                     • Our AI analyzes content, links, and sender reputation
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}

//           {/* Analyze Button */}
//           <div className="mt-10 text-center">
//             <button
//               onClick={handleAnalyze}
//               disabled={!canAnalyze || isAnalyzing}
//               className={`inline-flex items-center px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl ${
//                 canAnalyze && !isAnalyzing
//                   ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transform hover:scale-105 hover:shadow-3xl"
//                   : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {isAnalyzing ? (
//                 <>
//                   <Loader2 className="h-6 w-6 mr-3 animate-spin" />
//                   <span>Analyzing Security Threats...</span>
//                 </>
//               ) : (
//                 <>
//                   <Shield className="h-6 w-6 mr-3" />
//                   <span>Start Security Analysis</span>
//                 </>
//               )}
//             </button>
//             {canAnalyze && !isAnalyzing && (
//               <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
//                 Click to begin AI-powered threat detection
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Upload,
  Phone,
  Mail,
  Loader2,
  FileAudio,
  FileText,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function NewScan({ onAnalyze, isAnalyzing }) {
  const [activeTab, setActiveTab] = useState("call");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmailFile, setSelectedEmailFile] = useState(null);
  const [language, setLanguage] = useState("auto");
  const [dragOver, setDragOver] = useState(false);
  const [emailDragOver, setEmailDragOver] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleEmailFileSelect = (file) => {
    setSelectedEmailFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && activeTab === "call") {
      handleFileSelect(files[0]);
    }
  };

  const handleEmailDrop = (e) => {
    e.preventDefault();
    setEmailDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && activeTab === "email") {
      handleEmailFileSelect(files[0]);
    }
  };

  const handleAnalyze = async () => {
    console.log("Selected file", selectedFile);
    console.log("Selected email file", selectedEmailFile);
    console.log("active tab", activeTab);
    console.log("lang", language);
    if (activeTab === "call" && selectedFile) {
      await onAnalyze(selectedFile, "call", language);
    } else if (activeTab === "email" && selectedEmailFile) {
      await onAnalyze(selectedEmailFile, "email", "auto-detect");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("audio-upload").click();
  };

  const triggerEmailFileInput = () => {
    document.getElementById("email-upload").click();
  };

  const canAnalyze =
    (activeTab === "call" && selectedFile) ||
    (activeTab === "email" && selectedEmailFile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Advanced Security Scan
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Protect yourself with AI-powered analysis of calls and emails for
            spam, phishing, and fraud detection
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  AI-Powered
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Advanced detection
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Secure
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Privacy protected
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Real-time
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instant results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-1.5 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={() => setActiveTab("call")}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 ${
                activeTab === "call"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <Phone className="h-5 w-5" />
              <span className="font-semibold">Analyze Call</span>
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 ${
                activeTab === "email"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <Mail className="h-5 w-5" />
              <span className="font-semibold">Analyze Email</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-12">
          {activeTab === "call" ? (
            <div className="space-y-8">
              {/* Audio Upload */}
              <div
                onClick={triggerFileInput}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                className={`relative border-2 border-dashed rounded-3xl p-12 lg:p-16 text-center transition-all duration-300 cursor-pointer group ${
                  dragOver
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 scale-105"
                    : selectedFile
                    ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:scale-105"
                } shadow-lg hover:shadow-xl`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>

                {selectedFile ? (
                  <div className="space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                      <FileAudio className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedFile.name}
                      </h3>
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        File ready for analysis
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:from-blue-400 group-hover:to-indigo-500 transition-all duration-300">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Drop your audio file here
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        or click anywhere in this box to browse files
                      </p>
                      <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 cursor-pointer font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Upload className="h-5 w-5 mr-2" />
                        Browse Files
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                  id="audio-upload"
                />
              </div>

              {/* Language Selection */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Audio Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full md:w-auto px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
                >
                  <option value="auto">🌐 Auto-detect</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Spanish</option>
                  <option value="fr">🇫🇷 French</option>
                  <option value="de">🇩🇪 German</option>
                  <option value="it">🇮🇹 Italian</option>
                  <option value="pt">🇵🇹 Portuguese</option>
                  <option value="ru">🇷🇺 Russian</option>
                  <option value="zh">🇨🇳 Chinese</option>
                </select>
              </div>

              {/* Supported Formats */}
              <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <p className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Supported Audio Formats
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["MP3", "WAV", "M4A", "OGG", "FLAC"].map((format) => (
                    <span
                      key={format}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Email File Upload */}
              <div
                onClick={triggerEmailFileInput}
                onDrop={handleEmailDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setEmailDragOver(true);
                }}
                onDragLeave={() => setEmailDragOver(false)}
                className={`relative border-2 border-dashed rounded-3xl p-12 lg:p-16 text-center transition-all duration-300 cursor-pointer group ${
                  emailDragOver
                    ? "border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 scale-105"
                    : selectedEmailFile
                    ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 hover:scale-105"
                } shadow-lg hover:shadow-xl`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>

                {selectedEmailFile ? (
                  <div className="space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedEmailFile.name}
                      </h3>
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                        {(selectedEmailFile.size / 1024).toFixed(2)} KB
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Email file ready for analysis
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmailFile(null);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm"
                    >
                      Choose different file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:from-purple-400 group-hover:to-indigo-500 transition-all duration-300">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Drop your email file here
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        or click anywhere in this box to browse .eml files
                      </p>
                      <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 cursor-pointer font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Upload className="h-5 w-5 mr-2" />
                        Browse Email Files
                      </div>
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept=".eml"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleEmailFileSelect(file);
                  }}
                  className="hidden"
                  id="email-upload"
                />
              </div>

              {/* Email File Info */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3 text-lg">
                  📧 About .EML Files
                </h4>
                <div className="text-purple-700 dark:text-purple-300 space-y-2">
                  <p>
                    • EML files contain complete email data including headers,
                    metadata, and attachments
                  </p>
                  <p>
                    • You can save emails as .eml files from most email clients
                    (Outlook, Gmail, etc.)
                  </p>
                  <p>
                    • Our AI analyzes sender reputation, content patterns, and
                    suspicious links
                  </p>
                </div>
              </div>

              {/* Supported Email Formats */}
              <div className="text-center bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
                <p className="text-lg font-medium text-purple-900 dark:text-purple-300 mb-2">
                  Supported Email Format
                </p>
                <span className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200 rounded-lg font-medium">
                  .EML
                </span>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                  Standard email format supported by all major email clients
                </p>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isAnalyzing}
              className={`inline-flex items-center px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl ${
                canAnalyze && !isAnalyzing
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transform hover:scale-105 hover:shadow-3xl"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                  <span>Analyzing Security Threats...</span>
                </>
              ) : (
                <>
                  <Shield className="h-6 w-6 mr-3" />
                  <span>Start Security Analysis</span>
                </>
              )}
            </button>
            {canAnalyze && !isAnalyzing && (
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
                Click to begin AI-powered threat detection
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
