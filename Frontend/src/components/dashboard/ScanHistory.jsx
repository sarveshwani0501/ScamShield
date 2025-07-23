// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Trash2,
//   Phone,
//   Mail,
// } from "lucide-react";

// import axios from "axios";

// export default function ScanHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [allRecords, setAllRecords] = useState(null);
//   const [page, setPage] = useState(1);
//   const limit = 5;

//   async function getScamHistory() {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history?page=${page}&limit=${limit}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setAllRecords(response?.data?.data);
//     } catch (error) {
//       const msg = error?.response?.data?.error;
//       alert(msg);
//     }
//   }

//   async function getARecord(id) {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       const msg = error?.response?.data?.error;
//       alert(msg);
//     }
//   }

//   async function deleteRecord(id) {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       const newRecord = allRecords?.records.filter(
//         (record) => record._id !== id
//       );
//       setAllRecords(newRecord);
//     } catch (error) {}
//   }

//   // const scans = [
//   //   {
//   //     id: 1,
//   //     date: "2025-01-20",
//   //     time: "14:30",
//   //     type: "call",
//   //     filename: "suspicious_warranty_call.mp3",
//   //     score: 8.7,
//   //     status: "spam",
//   //     size: "2.1 MB",
//   //   },
//   //   {
//   //     id: 2,
//   //     date: "2025-01-20",
//   //     time: "10:15",
//   //     type: "email",
//   //     filename: "phishing_attempt.png",
//   //     score: 9.2,
//   //     status: "spam",
//   //     size: "856 KB",
//   //   },
//   //   {
//   //     id: 3,
//   //     date: "2025-01-19",
//   //     time: "16:45",
//   //     type: "call",
//   //     filename: "bank_verification.wav",
//   //     score: 2.1,
//   //     status: "safe",
//   //     size: "3.4 MB",
//   //   },
//   //   {
//   //     id: 4,
//   //     date: "2025-01-19",
//   //     time: "09:22",
//   //     type: "email",
//   //     filename: "newsletter_signup.pdf",
//   //     score: 1.8,
//   //     status: "safe",
//   //     size: "245 KB",
//   //   },
//   //   {
//   //     id: 5,
//   //     date: "2025-01-18",
//   //     time: "13:10",
//   //     type: "call",
//   //     filename: "unknown_number.mp3",
//   //     score: 6.3,
//   //     status: "suspicious",
//   //     size: "1.8 MB",
//   //   },
//   // ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "spam":
//         return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
//       case "safe":
//         return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//       case "suspicious":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score <= 3) return "text-green-600";
//     if (score <= 7) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const filteredScans = allRecords.records.filter((scan) => {
//     const matchesSearch = scan.filename
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesType = filterType === "all" || scan.type === filterType;
//     const matchesStatus =
//       filterStatus === "all" || scan.status === filterStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Scan History
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400">
//           View and manage your previous spam detection scans
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search files..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//             />
//           </div>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           >
//             <option value="all">All Types</option>
//             <option value="call">Calls</option>
//             <option value="email">Emails</option>
//           </select>

//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           >
//             <option value="all">All Status</option>
//             <option value="spam">Spam</option>
//             <option value="suspicious">Suspicious</option>
//             <option value="safe">Safe</option>
//           </select>

//           <button className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
//             <Filter className="h-4 w-4" />
//             <span>Apply Filters</span>
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   File
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Date & Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Score
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredScans.map((scan) => (
//                 <tr
//                   key={scan.id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-3">
//                       <div
//                         className={`p-2 rounded-lg ${
//                           scan.type === "call"
//                             ? "bg-blue-100 dark:bg-blue-900/30"
//                             : "bg-green-100 dark:bg-green-900/30"
//                         }`}
//                       >
//                         {scan.type === "call" ? (
//                           <Phone className="h-4 w-4 text-blue-600" />
//                         ) : (
//                           <Mail className="h-4 w-4 text-green-600" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900 dark:text-white">
//                           {scan.filename}
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           {scan.size}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900 dark:text-white">
//                       {scan.date}
//                     </div>
//                     <div className="text-sm text-gray-500 dark:text-gray-400">
//                       {scan.time}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap capitalize text-gray-900 dark:text-white">
//                     {scan.type}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`font-mono font-medium ${getScoreColor(
//                         scan.score
//                       )}`}
//                     >
//                       {scan.score}/10
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         scan.status
//                       )}`}
//                     >
//                       {scan.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
//                         <Download className="h-4 w-4" />
//                       </button>
//                       <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-700 dark:text-gray-300">
//               Showing <span className="font-medium">1</span> to{" "}
//               <span className="font-medium">5</span> of{" "}
//               <span className="font-medium">{filteredScans.length}</span>{" "}
//               results
//             </p>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                 disabled={allRecords ? allRecords.hasPrev : false}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                 disabled={allRecords ? allRecords.hasNext : false}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Trash2,
//   Phone,
//   Mail,
//   X,
//   FileText,
//   AlertTriangle,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import axios from "axios";

// export default function ScanHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [allRecords, setAllRecords] = useState(null);
//   const [page, setPage] = useState(1);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const limit = 5;

//   useEffect(() => {
//     getScamHistory();
//   }, [page]);

//   async function getScamHistory() {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history?page=${page}&limit=${limit}`,
//         { withCredentials: true }
//       );
//       setAllRecords(response?.data?.data);
//     } catch (error) {
//       const msg = error?.response?.data?.error || "Failed to fetch history";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function getARecord(id) {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         { withCredentials: true }
//       );
//       setSelectedRecord(response?.data?.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       const msg = error?.response?.data?.error || "Failed to fetch record";
//       alert(msg);
//     }
//   }

//   async function deleteRecord(id) {
//     if (!window.confirm("Are you sure you want to delete this record?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         { withCredentials: true }
//       );

//       // Update local state
//       const updatedRecords = allRecords.records.filter(
//         (record) => record._id !== id
//       );
//       setAllRecords({
//         ...allRecords,
//         records: updatedRecords,
//       });

//       // If no records left on current page, go to previous page
//       if (updatedRecords.length === 0 && page > 1) {
//         setPage(page - 1);
//       } else {
//         // Refresh the current page
//         getScamHistory();
//       }
//     } catch (error) {
//       const msg = error?.response?.data?.error || "Failed to delete record";
//       alert(msg);
//     }
//   }
//   console.log("fered");
//   function downloadReport(reportUrl) {
//     if (reportUrl) {
//       window.open(reportUrl, "_blank");
//     } else {
//       alert("Report URL not available for this record");
//     }
//   }

//   const getStatusColor = (isSpam, spamScore) => {
//     if (isSpam) {
//       return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
//     } else if (spamScore > 5) {
//       return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
//     } else {
//       return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//     }
//   };

//   const getStatusText = (isSpam, spamScore) => {
//     if (isSpam) return "spam";
//     if (spamScore > 5) return "suspicious";
//     return "safe";
//   };

//   const getScoreColor = (score) => {
//     if (score <= 3) return "text-green-600";
//     if (score <= 7) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "call":
//         return <Phone size={16} />;
//       case "email":
//         return <Mail size={16} />;
//       case "text":
//         return <FileText size={16} />;
//       default:
//         return <FileText size={16} />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "Unknown";
//     const mb = bytes / (1024 * 1024);
//     return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
//   };

//   if (!allRecords || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//             <div className="animate-pulse space-y-4">
//               <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//               <div className="space-y-3">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const filteredScans = allRecords.records.filter((scan) => {
//     const matchesSearch = scan.filename
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesType = filterType === "all" || scan.type === filterType;
//     const status = getStatusText(
//       scan.analysisResult.isSpam,
//       scan.analysisResult.spamScore
//     );
//     const matchesStatus = filterStatus === "all" || status === filterStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               Scan History
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               View and manage your previous spam detection scans
//             </p>
//           </div>

//           {/* Search and Filters */}
//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by filename..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             <div className="flex gap-4">
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="all">All Types</option>
//                 <option value="call">Calls</option>
//                 <option value="email">Emails</option>
//                 <option value="text">Texts</option>
//               </select>

//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="all">All Status</option>
//                 <option value="safe">Safe</option>
//                 <option value="suspicious">Suspicious</option>
//                 <option value="spam">Spam</option>
//               </select>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-gray-200 dark:border-gray-700">
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     File
//                   </th>
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     Date & Time
//                   </th>
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     Type
//                   </th>
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     Score
//                   </th>
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     Status
//                   </th>
//                   <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredScans.map((scan) => {
//                   const status = getStatusText(
//                     scan.analysisResult.isSpam,
//                     scan.analysisResult.spamScore
//                   );
//                   return (
//                     <tr
//                       key={scan._id}
//                       className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
//                     >
//                       <td className="py-4 px-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                             {getTypeIcon(scan.type)}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 dark:text-white">
//                               {scan.filename}
//                             </div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                               {formatFileSize(scan.metadata?.fileSize)}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="text-gray-900 dark:text-white">
//                           {formatDate(scan.createdAt)}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {formatTime(scan.createdAt)}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
//                           {scan.type}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`font-semibold ${getScoreColor(
//                             scan.analysisResult.spamScore
//                           )}`}
//                         >
//                           {scan.analysisResult.spamScore.toFixed(1)}/10
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
//                             scan.analysisResult.isSpam,
//                             scan.analysisResult.spamScore
//                           )}`}
//                         >
//                           {status}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => getARecord(scan._id)}
//                             className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                             title="View Details"
//                           >
//                             <Eye size={16} />
//                           </button>
//                           <button
//                             onClick={() =>
//                               downloadReport(scan.report?.reportUrl)
//                             }
//                             className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                             title="Download Report"
//                           >
//                             <Download size={16} />
//                           </button>
//                           <button
//                             onClick={() => deleteRecord(scan._id)}
//                             className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                             title="Delete Record"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between mt-6">
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               Showing {(page - 1) * limit + 1} to{" "}
//               {Math.min(page * limit, allRecords.pagination.totalRecords)} of{" "}
//               {allRecords.pagination.totalRecords} results
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setPage(page - 1)}
//                 disabled={!allRecords.pagination.hasPrev}
//                 className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft size={16} className="mr-1" />
//                 Previous
//               </button>
//               <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
//                 Page {page} of {allRecords.pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => setPage(page + 1)}
//                 disabled={!allRecords.pagination.hasNext}
//                 className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//                 <ChevronRight size={16} className="ml-1" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Record Details Modal */}
//       {isModalOpen && selectedRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Scan Details
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Basic Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                     File Information
//                   </h3>
//                   <div className="space-y-2 text-sm">
//                     <p>
//                       <span className="font-medium">Filename:</span>{" "}
//                       {selectedRecord.filename}
//                     </p>
//                     <p>
//                       <span className="font-medium">Type:</span>{" "}
//                       {selectedRecord.type}
//                     </p>
//                     <p>
//                       <span className="font-medium">Size:</span>{" "}
//                       {formatFileSize(selectedRecord.metadata?.fileSize)}
//                     </p>
//                     <p>
//                       <span className="font-medium">Language:</span>{" "}
//                       {selectedRecord.language}
//                     </p>
//                     <p>
//                       <span className="font-medium">Date:</span>{" "}
//                       {formatDate(selectedRecord.createdAt)}
//                     </p>
//                     <p>
//                       <span className="font-medium">Time:</span>{" "}
//                       {formatTime(selectedRecord.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                     Analysis Results
//                   </h3>
//                   <div className="space-y-2 text-sm">
//                     <p>
//                       <span className="font-medium">Spam Score:</span>
//                       <span
//                         className={`ml-2 font-semibold ${getScoreColor(
//                           selectedRecord.analysisResult.spamScore
//                         )}`}
//                       >
//                         {selectedRecord.analysisResult.spamScore.toFixed(1)}/10
//                       </span>
//                     </p>
//                     <p>
//                       <span className="font-medium">Status:</span>
//                       <span
//                         className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                           selectedRecord.analysisResult.isSpam,
//                           selectedRecord.analysisResult.spamScore
//                         )}`}
//                       >
//                         {getStatusText(
//                           selectedRecord.analysisResult.isSpam,
//                           selectedRecord.analysisResult.spamScore
//                         )}
//                       </span>
//                     </p>
//                     <p>
//                       <span className="font-medium">Category:</span>{" "}
//                       {selectedRecord.analysisResult.category}
//                     </p>
//                     <p>
//                       <span className="font-medium">Sentiment:</span>{" "}
//                       {selectedRecord.analysisResult.sentiment}
//                     </p>
//                     <p>
//                       <span className="font-medium">Similarity Score:</span>{" "}
//                       {selectedRecord.analysisResult.similarityScore}%
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Transcript */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                   Transcript
//                 </h3>
//                 <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     {selectedRecord.analysisResult.transcriptText}
//                   </p>
//                 </div>
//               </div>

//               {/* Red Flags */}
//               {selectedRecord.analysisResult.redFlags &&
//                 selectedRecord.analysisResult.redFlags.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
//                       <AlertTriangle size={20} className="mr-2 text-red-500" />
//                       Red Flags
//                     </h3>
//                     <div className="space-y-2">
//                       {selectedRecord.analysisResult.redFlags.map(
//                         (flag, index) => (
//                           <div
//                             key={index}
//                             className="flex items-start space-x-2"
//                           >
//                             <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
//                             <p className="text-sm text-gray-700 dark:text-gray-300">
//                               {flag}
//                             </p>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Explanations */}
//               {selectedRecord.analysisResult.explanation &&
//                 selectedRecord.analysisResult.explanation.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                       Analysis Explanation
//                     </h3>
//                     <div className="space-y-2">
//                       {selectedRecord.analysisResult.explanation.map(
//                         (exp, index) => (
//                           <div
//                             key={index}
//                             className="flex items-start space-x-2"
//                           >
//                             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                             <p className="text-sm text-gray-700 dark:text-gray-300">
//                               {exp}
//                             </p>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Recommended Actions */}
//               {selectedRecord.analysisResult.recommendedActions &&
//                 selectedRecord.analysisResult.recommendedActions.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
//                       <Shield size={20} className="mr-2 text-green-500" />
//                       Recommended Actions
//                     </h3>
//                     <div className="space-y-2">
//                       {selectedRecord.analysisResult.recommendedActions.map(
//                         (action, index) => (
//                           <div
//                             key={index}
//                             className="flex items-start space-x-2"
//                           >
//                             <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//                             <p className="text-sm text-gray-700 dark:text-gray-300">
//                               {action}
//                             </p>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 )}

//               {/* Actions */}
//               <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   onClick={() =>
//                     downloadReport(selectedRecord.report?.reportUrl)
//                   }
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <Download size={16} className="mr-2" />
//                   Download Report
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Trash2,
//   Phone,
//   Mail,
//   X,
//   FileText,
//   AlertTriangle,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import axios from "axios";

// export default function ScanHistory() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [allRecords, setAllRecords] = useState(null);
//   const [page, setPage] = useState(1);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const limit = 5;

//   useEffect(() => {
//     console.log("Component mounted, fetching scan history...");
//     getScamHistory();
//   }, [page]);

//   async function getScamHistory() {
//     try {
//       console.log(`Fetching page ${page} with limit ${limit}`);
//       setLoading(true);
//       setError(null);

//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history`,
//         { withCredentials: true }
//       );

//       console.log("API Response:", response.data);
//       setAllRecords(response?.data?.data);
//     } catch (error) {
//       console.error("Error fetching scan history:", error);
//       const msg =
//         error?.response?.data?.error ||
//         error.message ||
//         "Failed to fetch history";
//       setError(msg);
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function getARecord(id) {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         { withCredentials: true }
//       );
//       console.log(response)
//       setSelectedRecord(response?.data?.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching record:", error);
//       const msg = error?.response?.data?.error || "Failed to fetch record";
//       alert(msg);
//     }
//   }

//   async function deleteRecord(id) {
//     if (!window.confirm("Are you sure you want to delete this record?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/spam-detection/history/${id}`,
//         { withCredentials: true }
//       );

//       const updatedRecords = allRecords.records.filter(
//         (record) => record._id !== id
//       );
//       setAllRecords({
//         ...allRecords,
//         records: updatedRecords,
//       });

//       if (updatedRecords.length === 0 && page > 1) {
//         setPage(page - 1);
//       } else {
//         getScamHistory();
//       }
//     } catch (error) {
//       console.error("Error deleting record:", error);
//       const msg = error?.response?.data?.error || "Failed to delete record";
//       alert(msg);
//     }
//   }

//   function downloadReport(reportUrl) {
//     if (reportUrl) {
//       window.open(reportUrl, "_blank");
//     } else {
//       alert("Report URL not available for this record");
//     }
//   }

//   // Helper functions
//   const getStatusColor = (isSpam, spamScore) => {
//     if (isSpam) {
//       return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
//     } else if (spamScore > 5) {
//       return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
//     } else {
//       return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//     }
//   };

//   const getStatusText = (isSpam, spamScore) => {
//     if (isSpam) return "spam";
//     if (spamScore > 5) return "suspicious";
//     return "safe";
//   };

//   const getScoreColor = (score) => {
//     if (score <= 3) return "text-green-600";
//     if (score <= 7) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "call":
//         return <Phone size={16} />;
//       case "email":
//         return <Mail size={16} />;
//       case "text":
//         return <FileText size={16} />;
//       default:
//         return <FileText size={16} />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "Unknown";
//     const mb = bytes / (1024 * 1024);
//     return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
//   };

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//             <div className="text-center">
//               <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 Error Loading Scan History
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
//               <button
//                 onClick={getScamHistory}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//             <div className="animate-pulse space-y-4">
//               <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
//               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//               <div className="space-y-3">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No data state
//   if (!allRecords || !allRecords.records) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//             <div className="text-center">
//               <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                 No Scan History Found
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400">
//                 You haven't performed any scans yet.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const filteredScans = allRecords.records.filter((scan) => {
//     const matchesSearch = scan.filename
//       ?.toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesType = filterType === "all" || scan.type === filterType;
//     const status = getStatusText(
//       scan.analysisResult?.isSpam,
//       scan.analysisResult?.spamScore
//     );
//     const matchesStatus = filterStatus === "all" || status === filterStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//               Scan History
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               View and manage your previous spam detection scans
//             </p>
//           </div>

//           {/* Search and Filters */}
//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by filename..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             <div className="flex gap-4">
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="all">All Types</option>
//                 <option value="call">Calls</option>
//                 <option value="email">Emails</option>
//                 <option value="text">Texts</option>
//               </select>

//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="all">All Status</option>
//                 <option value="safe">Safe</option>
//                 <option value="suspicious">Suspicious</option>
//                 <option value="spam">Spam</option>
//               </select>
//             </div>
//           </div>

//           {/* Table */}
//           {filteredScans.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500 dark:text-gray-400">
//                 No records match your filters.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b border-gray-200 dark:border-gray-700">
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       File
//                     </th>
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       Date & Time
//                     </th>
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       Type
//                     </th>
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       Score
//                     </th>
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       Status
//                     </th>
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredScans.map((scan) => {
//                     const status = getStatusText(
//                       scan.analysisResult?.isSpam,
//                       scan.analysisResult?.spamScore
//                     );
//                     return (
//                       <tr
//                         key={scan._id}
//                         className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
//                       >
//                         <td className="py-4 px-4">
//                           <div className="flex items-center space-x-3">
//                             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                               {getTypeIcon(scan.type)}
//                             </div>
//                             <div>
//                               <div className="font-medium text-gray-900 dark:text-white">
//                                 {scan.filename}
//                               </div>
//                               <div className="text-sm text-gray-500 dark:text-gray-400">
//                                 {formatFileSize(scan.metadata?.fileSize)}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="text-gray-900 dark:text-white">
//                             {formatDate(scan.createdAt)}
//                           </div>
//                           <div className="text-sm text-gray-500 dark:text-gray-400">
//                             {formatTime(scan.createdAt)}
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
//                             {scan.type}
//                           </span>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span
//                             className={`font-semibold ${getScoreColor(
//                               scan.analysisResult?.spamScore || 0
//                             )}`}
//                           >
//                             {scan.analysisResult?.spamScore?.toFixed(1) ||
//                               "0.0"}
//                             /10
//                           </span>
//                         </td>
//                         <td className="py-4 px-4">
//                           <span
//                             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
//                               scan.analysisResult?.isSpam,
//                               scan.analysisResult?.spamScore
//                             )}`}
//                           >
//                             {status}
//                           </span>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => getARecord(scan._id)}
//                               className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                               title="View Details"
//                             >
//                               <Eye size={16} />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 downloadReport(scan.report?.reportUrl)
//                               }
//                               className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                               title="Download Report"
//                             >
//                               <Download size={16} />
//                             </button>
//                             <button
//                               onClick={() => deleteRecord(scan._id)}
//                               className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                               title="Delete Record"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Pagination */}
//           {allRecords.pagination && (
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Showing {(page - 1) * limit + 1} to{" "}
//                 {Math.min(page * limit, allRecords.pagination.totalRecords)} of{" "}
//                 {allRecords.pagination.totalRecords} results
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setPage(page - 1)}
//                   disabled={!allRecords.pagination.hasPrev}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft size={16} className="mr-1" />
//                   Previous
//                 </button>
//                 <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
//                   Page {page} of {allRecords.pagination.totalPages}
//                 </span>
//                 <button
//                   onClick={() => setPage(page + 1)}
//                   disabled={!allRecords.pagination.hasNext}
//                   className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Next
//                   <ChevronRight size={16} className="ml-1" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Record Details Modal - (keeping the same modal code as before) */}
//       {isModalOpen && selectedRecord && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           {/* Modal content remains the same */}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Phone,
  Mail,
  X,
  FileText,
  AlertTriangle,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import ScanResultsModal from "../ScanResultsModal"; // Import the modal component

export default function ScanHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [allRecords, setAllRecords] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 5;

  useEffect(() => {
    console.log("Component mounted, fetching scan history...");
    getScamHistory();
  }, [page]);

  async function getScamHistory() {
    try {
      console.log(`Fetching page ${page} with limit ${limit}`);
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://localhost:5000/api/spam-detection/history?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      console.log("API Response:", response.data);
      setAllRecords(response?.data?.data);
    } catch (error) {
      console.error("Error fetching scan history:", error);
      const msg =
        error?.response?.data?.error ||
        error.message ||
        "Failed to fetch history";
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  async function getARecord(id) {
    try {
      console.log("Fetching record with ID:", id);

      const response = await axios.get(
        `http://localhost:5000/api/spam-detection/history/${id}`,
        { withCredentials: true }
      );

      console.log("Record API Response:", response.data);

      // Transform the record data to match ScanResultsModal's expected structure
      const record = response.data.data;
      const transformedData = {
        // Main analysis result
        analysisResult: {
          transcriptText: record.analysisResult?.transcriptText,
          spamScore: record.analysisResult?.spamScore || 0,
          isSpam: record.analysisResult?.isSpam || false,
          category: record.analysisResult?.category,
          redFlags: record.analysisResult?.redFlags || [],
          explanation: record.analysisResult?.explanation || [],
          recommendedActions: record.analysisResult?.recommendedActions || [],
        },

        // Metadata
        type: record.type,
        filename: record.filename,
        language: record.language || "unknown",
        confidence: record.metadata?.confidence,
        createdAt: record.createdAt,

        // Report URL
        reportUrl: record.report?.reportUrl,

        // For email type, we can add email-specific info if available
        emailInfo:
          record.type === "email"
            ? {
                subject: record.filename, // Using filename as subject fallback
                from: "Unknown sender", // You might need to add these fields to your schema
                to: "Unknown recipient",
                hasAttachments: false,
              }
            : null,

        // Additional insights for audio/call types
        assemblyAIInsights:
          record.type === "call"
            ? {
                contentSafety: "No issues detected",
                sentiment: record.analysisResult?.sentiment || "neutral",
              }
            : null,
      };

      setSelectedRecord(transformedData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching record:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });

      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch record details";
      alert(msg);
    }
  }

  async function deleteRecord(id) {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/spam-detection/history/${id}`,
        { withCredentials: true }
      );

      const updatedRecords = allRecords.records.filter(
        (record) => record._id !== id
      );
      setAllRecords({
        ...allRecords,
        records: updatedRecords,
      });

      if (updatedRecords.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        getScamHistory();
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      const msg = error?.response?.data?.error || "Failed to delete record";
      alert(msg);
    }
  }

  function downloadReport(reportUrl) {
    if (reportUrl) {
      window.open(reportUrl, "_blank");
    } else {
      alert("Report URL not available for this record");
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedRecord(null);
  }

  // Helper functions
  const getStatusColor = (isSpam, spamScore) => {
    if (isSpam) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    } else if (spamScore > 5) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    } else {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    }
  };

  const getStatusText = (isSpam, spamScore) => {
    if (isSpam) return "spam";
    if (spamScore > 5) return "suspicious";
    return "safe";
  };

  const getScoreColor = (score) => {
    if (score <= 3) return "text-green-600";
    if (score <= 7) return "text-yellow-600";
    return "text-red-600";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "call":
        return <Phone size={16} />;
      case "email":
        return <Mail size={16} />;
      case "text":
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Scan History
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={getScamHistory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!allRecords || !allRecords.records) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Scan History Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You haven't performed any scans yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredScans = allRecords.records.filter((scan) => {
    const matchesSearch = scan.filename
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || scan.type === filterType;
    const status = getStatusText(
      scan.analysisResult?.isSpam,
      scan.analysisResult?.spamScore
    );
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Scan History
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your previous spam detection scans
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="call">Calls</option>
                <option value="email">Emails</option>
                <option value="text">Texts</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="safe">Safe</option>
                <option value="suspicious">Suspicious</option>
                <option value="spam">Spam</option>
              </select>
            </div>
          </div>

          {/* Table */}
          {filteredScans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No records match your filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      File
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Type
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Score
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScans.map((scan) => {
                    const status = getStatusText(
                      scan.analysisResult?.isSpam,
                      scan.analysisResult?.spamScore
                    );
                    return (
                      <tr
                        key={scan._id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              {getTypeIcon(scan.type)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {scan.filename}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {formatFileSize(scan.metadata?.fileSize)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-900 dark:text-white">
                            {formatDate(scan.createdAt)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTime(scan.createdAt)}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
                            {scan.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`font-semibold ${getScoreColor(
                              scan.analysisResult?.spamScore || 0
                            )}`}
                          >
                            {scan.analysisResult?.spamScore?.toFixed(1) ||
                              "0.0"}
                            /10
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              scan.analysisResult?.isSpam,
                              scan.analysisResult?.spamScore
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => getARecord(scan._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() =>
                                downloadReport(scan.report?.reportUrl)
                              }
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                              title="Download Report"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={() => deleteRecord(scan._id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {allRecords.pagination && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, allRecords.pagination.totalRecords)} of{" "}
                {allRecords.pagination.totalRecords} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!allRecords.pagination.hasPrev}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </button>
                <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                  Page {page} of {allRecords.pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!allRecords.pagination.hasNext}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Results Modal */}
      <ScanResultsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={selectedRecord}
        type={selectedRecord?.type}
        language={selectedRecord?.language}
      />
    </div>
  );
}
