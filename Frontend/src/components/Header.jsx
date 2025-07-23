
import React, { useState } from "react";
import { Menu, X, Moon, Sun, Shield } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { user } = useAuth();
  console.log(user);
  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "education", label: "Education Center", href: "/education-center" },
    { id: "analytics", label: "Analytics", href: "/analytics" },
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
              ScamRadar
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
