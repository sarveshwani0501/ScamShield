import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  ArrowRight,
  Share2,
  Bookmark
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { getArticleById, getRelatedArticles } from "../data/articlesData.js";
import toast from 'react-hot-toast';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const article = getArticleById(parseInt(id));
  const relatedArticles = article ? getRelatedArticles(article.id, article.category) : [];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/education-center')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Education Center
          </button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article URL copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    // This would typically save to local storage or user preferences
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    if (!bookmarks.includes(article.id)) {
      bookmarks.push(article.id);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
      toast.success('Article bookmarked!');
    } else {
      toast.info('Article already bookmarked!');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      phishing: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      robocalls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      'job-scams': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      'otp-frauds': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    };
    return colors[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      phishing: 'Phishing Emails',
      robocalls: 'Robocalls',
      'job-scams': 'Job Scams',
      'otp-frauds': 'OTP Frauds',
    };
    return labels[category] || category;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${theme}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/education-center')}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Education Center</span>
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
              {getCategoryLabel(article.category)}
            </span>
            {article.featured && (
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              onClick={handleBookmark}
              className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              <span>Bookmark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Featured Image */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />

          {/* Article Body */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Convert the content string to proper HTML/React elements */}
              <div 
                className="text-gray-900 dark:text-gray-100 leading-relaxed prose prose-lg max-w-none"
                style={{
                  lineHeight: '1.8',
                }}
                dangerouslySetInnerHTML={{ 
                  __html: article.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h1 style="font-size: 2rem; font-weight: 700; margin: 1.5rem 0 1rem 0; color: inherit;">${line.substring(2)}</h1>`;
                      } else if (line.startsWith('## ')) {
                        return `<h2 style="font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.75rem 0; color: inherit;">${line.substring(3)}</h2>`;
                      } else if (line.startsWith('### ')) {
                        return `<h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem 0; color: inherit;">${line.substring(4)}</h3>`;
                      } else if (line.startsWith('- ')) {
                        return `<li style="margin: 0.5rem 0; padding-left: 0.25rem;">${line.substring(2)}</li>`;
                      } else if (line.trim() === '') {
                        return '<div style="margin: 0.75rem 0;"></div>';
                      } else if (line.trim() !== '') {
                        return `<p style="margin: 0.75rem 0; line-height: 1.7;">${line}</p>`;
                      }
                      return '';
                    })
                    .join('')
                    .replace(/(<li[^>]*>.*?<\/li>)/gs, '<ul style="margin: 0.5rem 0; padding-left: 1.5rem; list-style-type: disc;">$1</ul>')
                }} 
              />
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/education-center/article/${relatedArticle.id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(relatedArticle.category)}`}>
                        {getCategoryLabel(relatedArticle.category)}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{relatedArticle.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {relatedArticle.author}
                      </span>
                      <ArrowRight className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
