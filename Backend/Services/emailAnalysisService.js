const { analyzeWithGemini } = require("./geminiAnalysisService");

/**
 * Analyze email content for spam/phishing using Gemini AI
 * @param {Object} emailData - Parsed email data from email parser
 * @returns {Object} Analysis result compatible with existing system
 */
async function analyzeEmailSpam(emailData) {
  try {
    
    console.log("🔍 Starting email spam analysis...");

    // Extract and prepare email content for analysis
    const emailContent = prepareEmailContent(emailData);

    // Use existing Gemini analysis service with email-specific context
    const analysisResult = await analyzeWithGemini(
      emailContent.combinedText,
      "en", // Email language detection can be added later
      null, // No content safety from AssemblyAI for emails
      null // No sentiment from AssemblyAI for emails
    );

    // Enhance analysis with email-specific insights
    const enhancedResult = enhanceEmailAnalysis(
      analysisResult,
      emailData,
      emailContent
    );

    console.log("✅ Email analysis completed");
    return enhancedResult;
  } catch (error) {
    console.error("❌ Email analysis failed:", error);
    throw new Error(`Email analysis failed: ${error.message}`);
  }
}

/**
 * Prepare email content for AI analysis
 * @param {Object} emailData - Raw email data
 * @returns {Object} Structured content for analysis
 */
function prepareEmailContent(emailData) {
  const parts = [];

  // Add subject line with emphasis
  if (emailData.subject) {
    parts.push(`SUBJECT: ${emailData.subject}`);
  }

  // Add sender information
  if (emailData.from) {
    parts.push(`FROM: ${emailData.from}`);
  }

  // Add recipient information
  if (emailData.to) {
    parts.push(`TO: ${emailData.to}`);
  }

  // Add main email body
  if (emailData.text) {
    parts.push(`BODY: ${emailData.text}`);
  }

  const combinedText = parts.join("\n\n");

  return {
    combinedText,
    subject: emailData.subject || "",
    sender: emailData.from || "",
    recipient: emailData.to || "",
    bodyText: emailData.text || "",
    hasAttachments: emailData.hasAttachments || false,
    attachmentCount: emailData.attachmentCount || 0,
  };
}

/**
 * Enhance analysis with email-specific red flags and insights
 * @param {Object} baseAnalysis - Analysis from Gemini
 * @param {Object} emailData - Original email data
 * @param {Object} emailContent - Prepared email content
 * @returns {Object} Enhanced analysis result
 */
function enhanceEmailAnalysis(baseAnalysis, emailData, emailContent) {
  const emailSpecificFlags = detectEmailRedFlags(emailData, emailContent);
  const emailCategory = determineEmailCategory(baseAnalysis, emailContent);

  return {
    ...baseAnalysis,

    // Override category with email-specific detection
    category: emailCategory,

    // Merge red flags
    redFlags: [...(baseAnalysis.redFlags || []), ...emailSpecificFlags],

    // Add email-specific metadata
    emailMetadata: {
      subject: emailContent.subject,
      sender: emailContent.sender,
      recipient: emailContent.recipient,
      hasAttachments: emailContent.hasAttachments,
      attachmentCount: emailContent.attachmentCount,
      bodyLength: emailContent.bodyText.length,
    },

    // Enhanced explanation with email context
    explanation: [
      ...(baseAnalysis.explanation || []),
      generateEmailSpecificExplanation(emailData, emailSpecificFlags),
    ].filter(Boolean),
  };
}

/**
 * Detect email-specific red flags
 * @param {Object} emailData - Raw email data
 * @param {Object} emailContent - Prepared content
 * @returns {Array} Array of detected red flags
 */
function detectEmailRedFlags(emailData, emailContent) {
  const flags = [];

  // Suspicious sender patterns
  const suspiciousDomains = ["noreply@", "no-reply@", "donotreply@"];
  if (
    suspiciousDomains.some((domain) =>
      emailContent.sender.toLowerCase().includes(domain)
    )
  ) {
    flags.push("Sender uses suspicious no-reply domain");
  }

  // Subject line red flags
  const suspiciousSubjectWords = [
    "urgent",
    "immediate",
    "act now",
    "limited time",
    "winner",
    "congratulations",
    "free",
    "bonus",
    "prize",
    "lottery",
    "inheritance",
    "refund",
    "suspended",
    "verify",
    "confirm",
    "update",
    "security alert",
    "unusual activity",
  ];

  const subjectLower = emailContent.subject.toLowerCase();
  suspiciousSubjectWords.forEach((word) => {
    if (subjectLower.includes(word)) {
      flags.push(`Subject contains suspicious keyword: "${word}"`);
    }
  });

  // Body content red flags
  const bodyLower = emailContent.bodyText.toLowerCase();

  // URL/Link density check
  const urlCount = (emailContent.bodyText.match(/https?:\/\/[^\s]+/g) || [])
    .length;
  const wordCount = emailContent.bodyText.split(/\s+/).length;
  if (urlCount > 0 && wordCount > 0 && urlCount / wordCount > 0.1) {
    flags.push("High density of URLs in email content");
  }

  // Financial request patterns
  if (
    bodyLower.includes("bank") &&
    (bodyLower.includes("details") || bodyLower.includes("information"))
  ) {
    flags.push("Requests banking information");
  }

  // Urgency patterns
  if (
    bodyLower.includes("immediately") ||
    bodyLower.includes("within 24 hours") ||
    bodyLower.includes("expires today")
  ) {
    flags.push("Creates false sense of urgency");
  }

  return flags;
}

/**
 * Determine email-specific category
 * @param {Object} baseAnalysis - Base analysis from Gemini
 * @param {Object} emailContent - Email content
 * @returns {String} Appropriate category
 */
function determineEmailCategory(baseAnalysis, emailContent) {
  const text = (
    emailContent.subject +
    " " +
    emailContent.bodyText
  ).toLowerCase();

  // Email-specific category mapping
  if (
    text.includes("phish") ||
    text.includes("credential") ||
    text.includes("login")
  ) {
    return "phishing";
  }

  if (
    text.includes("lottery") ||
    text.includes("winner") ||
    text.includes("prize")
  ) {
    return "lottery_scam";
  }

  if (
    text.includes("inheritance") ||
    text.includes("will") ||
    text.includes("deceased")
  ) {
    return "financial_scam";
  }

  if (
    text.includes("romance") ||
    text.includes("dating") ||
    text.includes("love")
  ) {
    return "romance_scam";
  }

  if (
    text.includes("charity") ||
    text.includes("donation") ||
    text.includes("help")
  ) {
    return "charity_fraud";
  }

  // Fall back to Gemini's category if no specific pattern found
  return baseAnalysis.category || "unknown";
}

/**
 * Generate email-specific explanation
 * @param {Object} emailData - Email data
 * @param {Array} emailFlags - Detected email flags
 * @returns {String} Explanation text
 */
function generateEmailSpecificExplanation(emailData, emailFlags) {
  if (emailFlags.length === 0) {
    return null;
  }

  return `Email analysis detected ${emailFlags.length} suspicious indicators including sender patterns, subject line keywords, and content structure that are commonly associated with spam or phishing attempts.`;
}

module.exports = {
  analyzeEmailSpam,
  prepareEmailContent,
  enhanceEmailAnalysis,
};
