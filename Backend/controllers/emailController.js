const ScanRecord = require("../models/scanRecord");
const { analyzeEmailSpam } = require("../Services/emailAnalysisService");
const { generateAndUploadReport } = require("../Services/reportService");
const { simpleParser } = require("mailparser");
const axios = require("axios");

/**
 * Main email analysis handler
 * Processes parsed email data and performs spam analysis
 */
async function analyzeEmailContent(req, res) {
  const startTime = Date.now();
  try {
    const fileUrl = req.file.path;
    console.log("Uploaded file URL:", fileUrl);

    console.log(45);

    // ✅ Download file buffer from Cloudinary
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    // ✅ Parse the email buffer
    const parsed = await simpleParser(buffer);

    console.log(parsed);

    const emailData = {
      subject: parsed.subject,
      from: parsed.from.text,
      to: parsed.to.text,
      text: parsed.text,
      date: parsed.date,
    };

    console.log("📧 Email analysis request received");

    // Validate email data structure
    if (!emailData) {
      return res.status(400).json({
        success: false,
        error: "No email data provided",
        message:
          "Request must include emailData object with parsed email information",
      });
    }

    const file = req.file;
    const userId = req.user?.userId || null;
    console.log("Email auth", userId)
    // Validate required email fields
    if (!emailData.subject && !emailData.text) {
      return res.status(400).json({
        success: false,
        error: "Insufficient email content",
        message: "Email must have either subject or body text",
      });
    }

    console.log("📧 Email info:", {
      subject: emailData.subject,
      from: emailData.from,
      to: emailData.to,
      //hasAttachments: emailData.hasAttachments,
      //textLength: emailData.text?.length || 0,
    });

    // Step 1: Analyze email content with AI
    let analysisResult;
    try {
      analysisResult = await analyzeEmailSpam(emailData);
    } catch (analysisError) {
      console.error("⚠️ Email analysis failed:", analysisError.message);
      return res.status(400).json({
        success: false,
        error: "Email analysis failed",
        message: analysisError.message,
      });
    }

    // Step 2: Save to database
    const scanRecord = new ScanRecord({
      userId,
      type: "email",
      filename: file?.originalName || "email-content",
      fileUrl: file?.cloudUrl || file?.localPath || "email-data",
      language: "en", // Email language detection can be enhanced later
      analysisResult: {
        ...analysisResult,
        transcriptText: createEmailTranscript(emailData),
      },
      metadata: {
        fileSize: file?.size || emailData.originalTextLength || 0,
        confidence: analysisResult.confidence || 0.85, // Default confidence for email analysis
        processingTime: Date.now() - startTime,
      },
    });

    await scanRecord.save();
    console.log("📝 Email scan record saved with ID:", scanRecord._id);

    // Step 3: Generate PDF Report automatically
    try {
      console.log("🔄 Auto-generating PDF report for email...");
      const reportResult = await generateAndUploadReport(scanRecord);
      console.log(
        "✅ PDF report generated automatically:",
        reportResult.reportUrl
      );
    } catch (reportError) {
      console.error("⚠️ Failed to auto-generate report:", reportError.message);
      // Don't fail the main request if report generation fails
    }

    // Step 4: Return results
    res.json({
      success: true,
      message: "Email analysis completed successfully",
      data: {
        scanId: scanRecord._id,
        type: "email",
        emailInfo: {
          subject: emailData.subject,
          from: emailData.from,
          to: emailData.to,
          hasAttachments: emailData.hasAttachments,
        },
        analysisResult,
        reportUrl: scanRecord.report?.reportUrl || null,
        createdAt: scanRecord.createdAt,
      },
    });
  } catch (error) {
    console.error("📧 Email analysis error:", error);
    res.status(500).json({
      success: false,
      error: "Email analysis failed",
      message: error.message,
    });
  }
}

/**
 * Create a transcript-like text from email data for PDF generation
 * @param {Object} emailData - Email data
 * @returns {String} Formatted transcript
 */
function createEmailTranscript(emailData) {
  const parts = [];

  parts.push(`Email Communication Analysis`);
  parts.push(`================================`);

  if (emailData.subject) {
    parts.push(`Subject: ${emailData.subject}`);
  }

  if (emailData.from) {
    parts.push(`From: ${emailData.from}`);
  }

  if (emailData.to) {
    parts.push(`To: ${emailData.to}`);
  }

  if (emailData.date) {
    parts.push(`Date: ${new Date(emailData.date).toLocaleString()}`);
  }

  parts.push(`\nEmail Content:`);
  parts.push(`--------------`);

  if (emailData.text) {
    parts.push(emailData.text);
  }

  if (emailData.hasAttachments) {
    parts.push(
      `\nNote: This email contains ${
        emailData.attachmentCount || "unknown number of"
      } attachment(s).`
    );
  }

  return parts.join("\n");
}

/**
 * Get email analysis history
 * Returns only email-type scan records
 */
async function getEmailHistory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      type: "email",
      ...(req.user ? { userId: req.user.id } : {}),
    };

    const records = await ScanRecord.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await ScanRecord.countDocuments(query);

    res.json({
      success: true,
      data: {
        records,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Email history fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch email history",
      message: error.message,
    });
  }
}

/**
 * Test endpoint for email analysis API
 */
function testEmailAPI(req, res) {
  res.json({
    success: true,
    message: "Email spam analysis API is working",
    timestamp: new Date().toISOString(),
    endpoints: {
      "POST /analyze-email": "Analyze email content for spam/phishing",
      "GET /history": "Get email analysis history (requires auth)",
      "GET /test": "Test API status",
    },
    expectedPayload: {
      file: {
        originalName: "email.eml",
        cloudUrl: "optional_cloud_url",
        localPath: "optional_local_path",
        size: 12345,
      },
      emailData: {
        subject: "Email subject",
        from: "sender@example.com",
        to: "recipient@example.com",
        date: "2025-07-21T11:49:06.000Z",
        text: "Email body content",
        hasAttachments: false,
        attachmentCount: 0,
      },
    },
  });
}

module.exports = {
  analyzeEmailContent,
  getEmailHistory,
  testEmailAPI,
};
