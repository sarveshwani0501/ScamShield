const ScanRecord = require("../models/scanRecord.js");
const { transcribeAudio } = require("../Services/assemblyAIService.js");
const { analyzeWithGemini } = require("../Services/geminiAnalysisService.js");
const { generateAndUploadReport } = require("../Services/reportService.js");

// Main analysis handler
async function analyzeSpamCall(req, res) {
  const startTime = Date.now(); // Track processing time
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No audio file provided",
      });
    }

    // Get Cloudinary URL - it's usually in req.file.url or req.file.secure_url
    const { originalname } = req.file;
    const cloudinaryUrl = req.file.secure_url || req.file.url || req.file.path;
    const userId = req.user?.userId || null;
    console.log("Call auth", userId);
    // Debug log to see what's in req.file
    console.log("req.file properties:", Object.keys(req.file));
    console.log("Cloudinary URL:", cloudinaryUrl);

    if (!cloudinaryUrl) {
      return res.status(400).json({
        success: false,
        error: "File upload failed - no URL available",
      });
    }

    console.log("Analyzing call:", originalname);

    // Step 1: Transcribe audio with AssemblyAI
    let transcriptionResult;
    try {
      transcriptionResult = await transcribeAudio(cloudinaryUrl, originalname);
    } catch (transcriptionError) {
      console.warn("⚠️ Transcription failed:", transcriptionError.message);
      return res.status(400).json({
        success: false,
        error: "Transcription failed",
        message: transcriptionError.message,
      });
    }

    if (!transcriptionResult.transcript) {
      return res.status(400).json({
        success: false,
        error: "No speech detected in audio file",
      });
    }

    // Step 2: Enhanced AI Analysis with AssemblyAI data
    const analysisResult = await analyzeWithGemini(
      transcriptionResult.transcript,
      transcriptionResult.language,
      transcriptionResult.contentSafety,
      transcriptionResult.sentiment
    );

    // Step 3: Save to database
    const scanRecord = new ScanRecord({
      userId,
      type: "call",
      filename: originalname,
      fileUrl: cloudinaryUrl,
      language: transcriptionResult.language,
      analysisResult,
      metadata: {
        fileSize: req.file.size,
        confidence: transcriptionResult.confidence,
        processingTime: Date.now() - startTime,
      },
    });

    await scanRecord.save();
    console.log("📝 Scan record saved with ID:", scanRecord._id);

    // Step 4: Generate PDF Report automatically
    try {
      console.log("🔄 Auto-generating PDF report...");
      const reportResult = await generateAndUploadReport(scanRecord);
      console.log(
        "✅ PDF report generated automatically:",
        reportResult.reportUrl
      );
    } catch (reportError) {
      console.error("⚠️ Failed to auto-generate report:", reportError.message);
      // Don't fail the main request if report generation fails
    }

    // Step 5: Return results
    res.json({
      success: true,
      message: "Analysis completed successfully with AssemblyAI",
      data: {
        scanId: scanRecord._id,
        type: "call",
        filename: originalname,
        language: transcriptionResult.language,
        confidence: transcriptionResult.confidence,
        analysisResult,
        assemblyAIInsights: {
          contentSafety:
            transcriptionResult.contentSafety?.summary || "No issues detected",
          sentiment: transcriptionResult.sentiment?.[0]?.sentiment || "Neutral",
        },
        reportUrl: scanRecord.report?.reportUrl || null,
        createdAt: scanRecord.createdAt,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      success: false,
      error: "Analysis failed",
      message: error.message,
    });
  }
}

module.exports = {
  analyzeSpamCall,
};
