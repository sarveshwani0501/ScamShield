import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: July 24, 2025
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At ScamShield, we are committed to protecting your privacy. We collect information to provide 
              better spam detection services while maintaining the highest standards of data protection.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Email address and name when you create an account</li>
              <li>Contact information when you reach out to our support team</li>
              <li>Usage data to improve our spam detection algorithms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Content Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              When you use our spam detection service, we temporarily process your audio recordings and 
              email content to analyze for spam indicators. This content is:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Processed using secure, encrypted channels</li>
              <li>Analyzed by our AI models for spam detection</li>
              <li>Automatically deleted after analysis is complete</li>
              <li>Never stored permanently or shared with third parties</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Provide accurate spam detection and analysis</li>
              <li>Improve our AI models and detection capabilities</li>
              <li>Send important updates about your account and our services</li>
              <li>Respond to your support requests and inquiries</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure cloud infrastructure with regular security audits</li>
              <li>Access controls limiting who can view your information</li>
              <li>Regular deletion of temporary analysis data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of non-essential communications</li>
              <li>Request corrections to your personal information</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> support@scamradar.com<br />
                <strong>Address:</strong> Pune, Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
