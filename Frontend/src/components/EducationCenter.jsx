import React, { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  Briefcase,
  Key,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";

export default function EducationCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Topics", icon: null },
    { id: "phishing", label: "Phishing Emails", icon: Mail },
    { id: "robocalls", label: "Robocalls", icon: Phone },
    { id: "job-scams", label: "Job Scams", icon: Briefcase },
    { id: "otp-frauds", label: "OTP Frauds", icon: Key },
  ];

  const articles = [
    {
      id: 1,
      title: "How to Identify Phishing Emails: A Complete Guide",
      excerpt:
        "Learn the key warning signs of phishing emails and protect yourself from cybercriminals.",
      category: "phishing",
      readTime: "5 min read",
      author: "Security Team",
      image:
        "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
    },
    {
      id: 2,
      title: "Robocall Red Flags: What to Listen For",
      excerpt:
        "Understand common tactics used in spam calls and how to protect yourself.",
      category: "robocalls",
      readTime: "3 min read",
      author: "Dr. Sarah Wilson",
      image:
        "https://images.pexels.com/photos/5077045/pexels-photo-5077045.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
    },
    {
      id: 3,
      title: "Job Scam Warning Signs: Too Good to Be True",
      excerpt: "Recognize fraudulent job offers and avoid employment scams.",
      category: "job-scams",
      readTime: "4 min read",
      author: "Michael Chen",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
    },
    {
      id: 4,
      title: "OTP Fraud: Never Share Your One-Time Passwords",
      excerpt:
        "Understanding OTP fraud tactics and how to keep your accounts secure.",
      category: "otp-frauds",
      readTime: "6 min read",
      author: "Security Team",
      image:
        "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
    },
    {
      id: 5,
      title: "Social Engineering: The Human Side of Cybersecurity",
      excerpt:
        "How criminals manipulate people to gain access to sensitive information.",
      category: "phishing",
      readTime: "7 min read",
      author: "Dr. Sarah Wilson",
      image:
        "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
    },
    {
      id: 6,
      title: "Voice Phishing (Vishing): Protecting Yourself Over the Phone",
      excerpt:
        "Learn about voice phishing attacks and how to stay safe during phone conversations.",
      category: "robocalls",
      readTime: "5 min read",
      author: "Michael Chen",
      image:
        "https://images.pexels.com/photos/4348081/pexels-photo-4348081.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(
    (article) => article.featured
  );
  const regularArticles = filteredArticles.filter(
    (article) => !article.featured
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed about the latest scam tactics and learn how to protect
            yourself from fraud attempts across all communication channels.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.icon && <category.icon className="h-4 w-4" />}
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
                        {
                          categories.find((c) => c.id === article.category)
                            ?.label
                        }
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {article.author}
                        </span>
                      </div>
                      <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                      {categories.find((c) => c.id === article.category)?.label}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {article.author}
                      </span>
                    </div>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or selecting a different
                category.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
