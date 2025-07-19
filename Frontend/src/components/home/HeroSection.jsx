import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ onScrollToUpload }) {
  return (
    <section className="relative bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Instant Spam Detection for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Calls & Emails
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
              Upload your phone call recordings or email screenshots and get
              instant AI-powered spam analysis. One free scan to get started,
              then unlimited access with an account.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onScrollToUpload}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Try Your Free Scan</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No registration required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Privacy protected</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5077045/pexels-photo-5077045.jpeg?auto=compress&cs=tinysrgb&w=800"
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
