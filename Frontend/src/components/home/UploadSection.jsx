import React, { useState, useRef } from "react";
import { Upload, File, Phone, Mail, Loader2 } from "lucide-react";

export default function UploadSection({ onAnalyze, isAnalyzing }) {
  const [activeTab, setActiveTab] = useState("call");
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState("auto");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, activeTab, language);
    }
  };

  const supportedFormats = {
    call: ["MP3", "WAV", "M4A", "OGG"],
    email: ["PDF", "PNG", "JPG", "JPEG"],
  };

  return (
    <section id="upload" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Upload & Analyze
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose your content type and upload for instant spam detection
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("call")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === "call"
                  ? "bg-white dark:bg-gray-700 text-teal-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">Upload Call</span>
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === "email"
                  ? "bg-white dark:bg-gray-700 text-teal-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">Upload Email</span>
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragOver
                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-teal-400"
            }`}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <File className="h-12 w-12 text-teal-600 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drop your {activeTab === "call" ? "audio" : "email"} file
                    here
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    or click to browse
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Selection */}
          {activeTab === "call" && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Audio Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="auto">Auto-detect</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          )}

          {/* Supported Formats */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supported formats: {supportedFormats[activeTab].join(", ")}
            </p>
          </div>

          {/* Analyze Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Analyze Now</span>
              )}
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={activeTab === "call" ? "audio/*" : "image/*,.pdf"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          className="hidden"
        />
      </div>
    </section>
  );
}
