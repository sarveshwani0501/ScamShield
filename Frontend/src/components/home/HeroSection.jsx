
import React from "react";
import { ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HeroSection({ navigate }) {
  const navig = navigate();
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Advanced AI-Powered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Spam Protection
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
              Protect yourself from spam calls and fraudulent emails with our
              advanced AI detection system. Get real-time analysis, detailed
              reports, and comprehensive protection for all your communications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navig("/signup")}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navig("/login")}
                className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Try Detection</span>
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to get started</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Enterprise security</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="TRUST.jpg"
                alt="People using technology to stay safe from spam"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-r from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 rounded-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
