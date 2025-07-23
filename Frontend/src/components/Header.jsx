// import React, { useState } from "react";
// import { Menu, X, Moon, Sun, Shield, User, LogOut, Phone } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";
// import { useAuth } from "../contexts/AuthContext";

// export default function Header({ currentPage, onPageChange }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useAuth();

//   const navItems = [
//     { id: "home", label: "Home" },
//     { id: "dashboard", label: "Dashboard", authRequired: true },
//     { id: "education", label: "Education Center" },
//     { id: "about", label: "About" },
//     { id: "contact", label: "Contact Us" },
//   ];

//   const filteredNavItems = navItems.filter(
//     (item) => !item.authRequired || user
//   );

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Shield className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-teal-600" />
//             <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
//               SpamGuard
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
//             {filteredNavItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => onPageChange(item.id)}
//                 className={`text-base font-semibold transition-all duration-200 hover:scale-105 ${
//                   currentPage === item.id
//                     ? "text-teal-600 border-b-2 border-teal-600 pb-1"
//                     : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* Medium Screen Navigation */}
//           <nav className="hidden md:flex lg:hidden items-center space-x-6">
//             {filteredNavItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => onPageChange(item.id)}
//                 className={`text-sm font-semibold transition-colors ${
//                   currentPage === item.id
//                     ? "text-teal-600"
//                     : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               ) : (
//                 <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               )}
//             </button>

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   {user.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="h-8 w-8 rounded-full"
//                     />
//                   ) : (
//                     <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//                   )}
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {user.name}
//                   </span>
//                 </button>

//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//                     <button
//                       onClick={() => {
//                         onPageChange("settings");
//                         setIsUserMenuOpen(false);
//                       }}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-lg"
//                     >
//                       Settings
//                     </button>
//                     <button
//                       onClick={() => {
//                         logout();
//                         setIsUserMenuOpen(false);
//                         onPageChange("home");
//                       }}
//                       className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg flex items-center space-x-2"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => onPageChange("login")}
//                   className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300
//                            hover:text-teal-600 transition-all duration-200
//                            border border-gray-300 dark:border-gray-600 rounded-lg
//                            hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => onPageChange("signup")}
//                   className="bg-gradient-to-r from-teal-600 to-teal-700 text-white
//                            px-6 py-2 rounded-lg text-sm font-semibold
//                            hover:from-teal-700 hover:to-teal-800
//                            transition-all duration-200 transform hover:scale-105
//                            shadow-md hover:shadow-lg"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//             ) : (
//               <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
//             <nav className="flex flex-col space-y-4">
//               {filteredNavItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     onPageChange(item.id);
//                     setIsMenuOpen(false);
//                   }}
//                   className={`text-left text-base sm:text-lg font-semibold transition-colors py-2 ${
//                     currentPage === item.id
//                       ? "text-teal-600"
//                       : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
//                   }`}
//                 >
//                   {item.id === "contact" && (
//                     <Phone className="inline-block h-4 w-4 mr-2" />
//                   )}
//                   {item.label}
//                 </button>
//               ))}

//               <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between mb-4">
//                   <button
//                     onClick={toggleTheme}
//                     className="flex items-center space-x-2 text-base font-medium text-gray-700 dark:text-gray-300"
//                   >
//                     {theme === "light" ? (
//                       <>
//                         <Moon className="h-5 w-5" />
//                         <span>Dark Mode</span>
//                       </>
//                     ) : (
//                       <>
//                         <Sun className="h-5 w-5" />
//                         <span>Light Mode</span>
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 {user ? (
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsMenuOpen(false);
//                       onPageChange("home");
//                     }}
//                     className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
//                              font-semibold py-3 rounded-lg border border-red-200 dark:border-red-700
//                              hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors
//                              flex items-center justify-center space-x-2"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span>Logout</span>
//                   </button>
//                 ) : (
//                   <div className="flex flex-col space-y-3">
//                     <button
//                       onClick={() => {
//                         onPageChange("login");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full border-2 border-gray-300 dark:border-gray-600
//                                text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg
//                                hover:border-teal-600 hover:text-teal-600 transition-colors"
//                     >
//                       Login
//                     </button>
//                     <button
//                       onClick={() => {
//                         onPageChange("signup");
//                         setIsMenuOpen(false);
//                       }}
//                       className="w-full bg-gradient-to-r from-teal-600 to-teal-700
//                                text-white font-semibold py-3 rounded-lg
//                                hover:from-teal-700 hover:to-teal-800
//                                transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// import React, { useState } from "react";
// import { Menu, X, Moon, Sun, Shield, User, LogOut } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";
// import { useAuth } from "../contexts/AuthContext";
// import { NavLink } from "react-router-dom";

// export default function Header({ currentPage, onPageChange }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useAuth();

//   const navItems = [
//     { id: "home", href: "" },
//     { id: "education", href: "/education" },
//     { id: "about", label: "/about" },
//     { id: "contact", href: "/contact" },
//     { id: "login", href: "/login" },
//     { id: "signup", href: "/signup" },
//   ];

//   // Only render header for logged-out users
//   if (user) {
//     return null;
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Shield className="h-8 w-8 text-teal-600 drop-shadow-sm" />
//             <span className="text-xl font-bold text-gray-900 dark:text-white">
//               SpamGuard
//             </span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => onPageChange(item.id)}
//                 className={`relative text-sm font-medium transition-all duration-200 group ${
//                   currentPage === item.id
//                     ? "text-teal-600"
//                     : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
//                 }`}
//               >
//                 {item.label}
//                 <span
//                   className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 ${
//                     currentPage === item.id ? "w-full" : "group-hover:w-full"
//                   }`}
//                 ></span>
//               </button>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               ) : (
//                 <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//               )}
//             </button>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => onPageChange("login")}
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transform hover:scale-105 active:scale-95"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => onPageChange("signup")}
//                 className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:from-teal-700 hover:to-teal-800 before:absolute before:inset-0 before:bg-white/20 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
//               >
//                 <span className="relative z-10">Sign Up</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
//           >
//             {isMenuOpen ? (
//               <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//             ) : (
//               <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-200">
//             <nav className="flex flex-col space-y-2">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     onPageChange(item.id);
//                     setIsMenuOpen(false);
//                   }}
//                   className={`text-left text-sm font-medium transition-all duration-200 px-4 py-3 rounded-lg mx-2 ${
//                     currentPage === item.id
//                       ? "text-teal-600 bg-teal-50 dark:bg-teal-900/20"
//                       : "text-gray-700 dark:text-gray-300 hover:text-teal-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </nav>

//             {/* Mobile Theme Toggle */}
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//               <button
//                 onClick={toggleTheme}
//                 className="flex items-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-3 mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 w-full"
//               >
//                 {theme === "light" ? (
//                   <>
//                     <Moon className="h-5 w-5" />
//                     <span>Switch to Dark Mode</span>
//                   </>
//                 ) : (
//                   <>
//                     <Sun className="h-5 w-5" />
//                     <span>Switch to Light Mode</span>
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Mobile Auth Buttons */}
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 px-4 space-y-3">
//               <button
//                 onClick={() => {
//                   onPageChange("login");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-600 transition-all duration-200 transform active:scale-95"
//               >
//                 Login to Your Account
//               </button>
//               <button
//                 onClick={() => {
//                   onPageChange("signup");
//                   setIsMenuOpen(false);
//                 }}
//                 className="w-full relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 hover:shadow-lg hover:from-teal-700 hover:to-teal-800 before:absolute before:inset-0 before:bg-white/20 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
//               >
//                 <span className="relative z-10">Create New Account</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Shield } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const { theme, toggleTheme } = useTheme();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const { user } = useAuth();
  console.log(user);
  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "education", label: "Education Center", href: "/education-center" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const authItems = !user
    ? [
        { id: "login", label: "Login", href: "/login" },
        { id: "signup", label: "Sign Up", href: "/signup" },
      ]
    : [{ id: "dashboard", label: "Dashboard", href: "/dashboard" }];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-teal-600 drop-shadow-sm" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SpamGuard
            </span>
          </NavLink>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "text-teal-600"
                      : "text-gray-700 dark:text-gray-300 hover:text-teal-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-200 ${
                        isActive ? "w-full" : "group-hover:w-full"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {!user ? (
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transform hover:scale-105 active:scale-95"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg hover:from-teal-700 hover:to-teal-800 before:absolute before:inset-0 before:bg-white/20 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
                >
                  <span className="relative z-10">Sign Up</span>
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/dashboard"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transform hover:scale-105 active:scale-95"
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-left text-sm font-medium transition-all duration-200 px-4 py-3 rounded-lg mx-2 ${
                      isActive
                        ? "text-teal-600 bg-teal-50 dark:bg-teal-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-teal-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Theme Toggle */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 px-4 py-3 mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 w-full"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Switch to Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Switch to Light Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 px-4 space-y-3">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-teal-300 dark:hover:border-teal-700 hover:text-teal-600 transition-all duration-200 transform active:scale-95"
              >
                Login to Your Account
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform active:scale-95 hover:shadow-lg hover:from-teal-700 hover:to-teal-800 before:absolute before:inset-0 before:bg-white/20 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
              >
                <span className="relative z-10">Create New Account</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
