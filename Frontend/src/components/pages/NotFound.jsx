import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Shield, AlertTriangle, RefreshCw } from 'lucide-react';

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <AlertTriangle className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">404</h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Page Not Found</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
            Our AI-powered platform is still here to protect you from spam and fraud.
          </p>
        </div>
        </div>
    </div>
  );
};

export default NotFound;