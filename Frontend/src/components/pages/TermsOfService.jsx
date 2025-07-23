import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const TermsOfService = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: July 24, 2025
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              By accessing and using ScamShield's spam detection services, you accept and agree to be 
              bound by the terms and provision of this agreement. If you do not agree to abide by 
              the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Service Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ScamShield provides AI-powered spam detection services for phone calls and emails. 
              Our service analyzes content to identify potential spam, phishing attempts, and 
              fraudulent communications.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              What We Provide
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Real-time audio and email analysis</li>
              <li>Spam probability scoring and detailed reports</li>
              <li>Analysis history and tracking</li>
              <li>Educational resources about spam detection</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a user of ScamShield, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Provide accurate and truthful information when creating your account</li>
              <li>Use the service only for legitimate spam detection purposes</li>
              <li>Not attempt to reverse engineer or compromise our AI models</li>
              <li>Respect the privacy and rights of others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Content and Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              When you submit content for analysis:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>You retain ownership of your content</li>
              <li>You grant us temporary rights to process and analyze the content</li>
              <li>We automatically delete content after analysis is complete</li>
              <li>We do not share your content with third parties</li>
              <li>All processing is done securely and privately</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Accuracy Disclaimer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              While ScamShield strives for high accuracy in spam detection, our service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>May not detect all spam or fraudulent content</li>
              <li>May occasionally flag legitimate content as spam (false positives)</li>
              <li>Should be used as a tool to assist decision-making, not replace human judgment</li>
              <li>Cannot guarantee 100% accuracy in all situations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ScamShield and its developers shall not be liable for any damages arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>False positives or missed spam detection</li>
              <li>Decisions made based on our analysis results</li>
              <li>Service interruptions or technical issues</li>
              <li>Any indirect, incidental, or consequential damages</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Account Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We reserve the right to terminate or suspend accounts that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>Violate these terms of service</li>
              <li>Engage in abusive or fraudulent behavior</li>
              <li>Attempt to compromise our systems or services</li>
              <li>Use the service for illegal activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We may update these terms from time to time. Users will be notified of significant 
              changes via email or through our platform. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              For questions about these terms or our service, please contact us:
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

export default TermsOfService;
