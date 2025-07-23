// import React from "react";
// import {
//   BarChart3,
//   History,
//   BookOpen,
//   Settings,
//   LogOut,
//   Shield,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import { useAuth } from "../../contexts/AuthContext";

// export default function Sidebar({
//   activeSection,
//   onSectionChange,
//   onPageChange,
// }) {
//   const { logout } = useAuth();

//   const menuItems = [
//     { id: "overview", label: "Overview", icon: BarChart3 },
//     { id: "history", label: "Scan History", icon: History },
//     { id: "analytics", label: "Analytics", icon: TrendingUp },
//     { id: "education", label: "Education Center", icon: BookOpen },
//     { id: "settings", label: "Settings", icon: Settings },
//   ];

//   const handleLogout = () => {
//     logout();
//     onPageChange("home");
//   };

//   return (
//     <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen">
//       <div className="p-6">
//         <div className="flex items-center space-x-2 mb-8">
//           <Shield className="h-8 w-8 text-teal-600" />
//           <span className="text-xl font-bold text-gray-900 dark:text-white">
//             SpamGuard
//           </span>
//         </div>

//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => onSectionChange(item.id)}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                 activeSection === item.id
//                   ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600"
//                   : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
//               }`}
//             >
//               <item.icon className="h-5 w-5" />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//           >
//             <LogOut className="h-5 w-5" />
//             <span className="font-medium">Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import {
//   BarChart3,
//   History,
//   BookOpen,
//   Settings,
//   LogOut,
//   Shield,
//   TrendingUp,
//   Users,
//   X,
// } from "lucide-react";
// //import { useAuth } from "../../contexts/AuthContext";
// import axios from "axios";
// import { NavLink } from "react-router-dom";
// export default function Sidebar({
//   activeSection,
//   onSectionChange,
//   onPageChange,
//   isOpen,
//   onClose,
// }) {
//   //const { logout } = useAuth();

//   const menuItems = [
//     { id: "overview", label: "Overview", icon: BarChart3 },
//     { id: "new-scan", label: "New Scan", icon: Users },
//     { id: "history", label: "Scan History", icon: History },
//     { id: "analytics", label: "Analytics", icon: TrendingUp },
//     { id: "education", label: "Education Center", icon: BookOpen },
//     { id: "settings", label: "Settings", icon: Settings },
//   ];

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/auth/logout",
//         {
//           withCredentials: true,
//         }
//       );
//       if (response.data?.msg === "success") {
//         window.location.href = "/";
//       } else {
//         console.log("An error occured");
//         alert("Logout Failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error.response || error);
//       alert(
//         "Logout Failed: " + (error.response?.data?.error || "Unknown error")
//       );
//     }
//   };

//   const handleSectionChange = (item) => {
//     onSectionChange(item.id);
//     onClose();
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen transform transition-transform duration-300 ease-in-out lg:transform-none
//         ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//       `}
//       >
//         {/* Mobile Close Button */}
//         <div className="lg:hidden flex justify-end p-4">
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//           </button>
//         </div>

//         <div className="p-6">
//           <NavLink to={"/"} className="flex items-center space-x-2 mb-8">
//             <Shield className="h-8 w-8 text-teal-600" />
//             <span className="text-xl font-bold text-gray-900 dark:text-white">
//               SpamGuard
//             </span>
//           </NavLink>

//           <nav className="space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleSectionChange(item)}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                   activeSection === item.id
//                     ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600"
//                     : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
//                 }`}
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>

//           <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//             >
//               <LogOut className="h-5 w-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({
  activeSection,
  onSectionChange,
  onPageChange,
  isOpen,
  onClose,
}) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "new-scan", label: "New Scan", icon: Users },
    { id: "history", label: "Scan History", icon: History },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "education", label: "Education Center", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data?.msg === "success") {
        navigate("/");
      } else {
        console.log("An error occured");
        alert("Logout Failed");
      }
    } catch (error) {
      console.error("Logout error:", error.response || error);
      alert(
        "Logout Failed: " + (error.response?.data?.error || "Unknown error")
      );
    }
  };

  const handleSectionChange = (item) => {
    onSectionChange(item.id);
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 min-h-screen transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Header with Theme Toggle */}
          <div className="flex items-center justify-between mb-8">
            <NavLink to={"/"} className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                SpamGuard
              </span>
            </NavLink>

            {/* Theme Toggle Button */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
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
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
