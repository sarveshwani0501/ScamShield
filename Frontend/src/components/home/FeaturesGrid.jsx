import React from "react";
import { Mic, Globe, BarChart3, Shield, Zap, History } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: Mic,
      title: "Real-time Transcription",
      description:
        "Advanced AI converts your audio calls to text instantly with high accuracy across multiple languages and accents.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "Analyze content in 20+ languages with automatic detection. Perfect for global spam detection and protection.",
    },
    {
      icon: BarChart3,
      title: "Detailed Reports",
      description:
        "Get comprehensive analysis with spam probability scores, highlighted suspicious phrases, and actionable insights.",
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description:
        "Your files are processed securely and deleted immediately after analysis. We never store your personal content.",
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description:
        "Get results in seconds, not minutes. Our optimized AI models provide lightning-fast spam detection.",
    },
    {
      icon: History,
      title: "Analysis History",
      description:
        "Track your scans over time, compare patterns, and build a comprehensive view of spam attempts.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Complete Protection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our advanced AI technology combines multiple detection methods to
            provide the most accurate spam analysis available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:border-teal-200 dark:hover:border-teal-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/50 transition-colors">
                <feature.icon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
