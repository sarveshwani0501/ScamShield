const ScanRecord = require("../models/scanRecord.js");
const {
  generateAndUploadReport,
  downloadReport,
  getReportInfo,
  listReports
} = require("../Services/reportService.js");

// Generate and download PDF report (forces download)
async function handleDownloadReport(req, res) {
  try {
    const { scanId } = req.params;
    
    const reportData = await downloadReport(scanId);
    
    // Create Cloudinary download URL with forced download parameters
    let downloadUrl = reportData.reportUrl;
    
    // If it's a Cloudinary URL, modify it to force download
    if (downloadUrl.includes('cloudinary.com')) {
      // Add fl_attachment flag to force download instead of inline display
      if (downloadUrl.includes('/upload/')) {
        downloadUrl = downloadUrl.replace('/upload/', '/upload/fl_attachment/');
      }
    }
    
    console.log('📥 Redirecting to download URL:', downloadUrl);
    
    // Redirect to the modified Cloudinary URL that forces download
    return res.redirect(downloadUrl);

  } catch (error) {
    console.error("Error downloading Cloudinary report:", error);
    res.status(500).json({
      success: false,
      error: "Download failed",
      message: error.message,
    });
  }
}

// View PDF report inline in browser
async function handleViewReport(req, res) {
  try {
    const { scanId } = req.params;
    
    const reportData = await downloadReport(scanId);
    
    // Create Cloudinary view URL with inline display parameters
    let viewUrl = reportData.reportUrl;
    
    // If it's a Cloudinary URL, modify it to allow inline viewing
    if (viewUrl.includes('cloudinary.com')) {
      // Add fl_inline flag to allow in-browser viewing instead of forced download
      if (viewUrl.includes('/upload/')) {
        viewUrl = viewUrl.replace('/upload/', '/upload/fl_inline/');
      }
    }
    
    console.log('👀 Redirecting to view URL:', viewUrl);
    
    // Redirect to the modified Cloudinary URL that allows inline viewing
    return res.redirect(viewUrl);

  } catch (error) {
    console.error("Error viewing Cloudinary report:", error);
    res.status(500).json({
      success: false,
      error: "View failed",
      message: error.message,
    });
  }
}

// Generate PDF and upload to Cloudinary
async function handleGenerateReport(req, res) {
  try {
    const { scanId } = req.params;

    const scanData = await ScanRecord.findById(scanId);
    if (!scanData) {
      return res
        .status(404)
        .json({ success: false, error: "Scan record not found" });
    }

    if (!scanData.analysisResult) {
      return res
        .status(400)
        .json({ success: false, error: "No analysis result in scan" });
    }

    // Generate and upload report
    const reportResult = await generateAndUploadReport(scanData);

    res.json({
      success: true,
      message: "PDF report generated and uploaded successfully",
      data: {
        url: reportResult.reportUrl,
        scanId: reportResult.scanId,
        spamScore: scanData.analysisResult.spamScore,
        isSpam: scanData.analysisResult.isSpam,
        category: scanData.analysisResult.category,
        generatedAt: reportResult.generatedAt,
      },
    });
  } catch (error) {
    console.error("Error generating/uploading report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate/upload report",
      message: error.message,
    });
  }
}

// Get report info without generating (check if scan exists and is valid)
async function handleGetReportInfo(req, res) {
  try {
    const { scanId } = req.params;

    const reportInfo = await getReportInfo(scanId);

    res.json({
      success: true,
      data: reportInfo,
    });
  } catch (error) {
    console.error("Error fetching report info:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch report information",
      message: error.message,
    });
  }
}

// List all available reports
async function handleListReports(req, res) {
  try {
    const reportsData = await listReports();

    res.json({
      success: true,
      data: reportsData,
    });
  } catch (error) {
    console.error("Error listing cloud reports:", error);
    res.status(500).json({
      success: false,
      error: "Failed to list reports",
      message: error.message,
    });
  }
}

// Delete a generated report file (cleanup utility)
async function handleDeleteReport(req, res) {
  try {
    const { filename } = req.params;

    // Validate filename to prevent directory traversal
    if (
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid filename",
      });
    }

    // Note: This function would need to be implemented to delete from Cloudinary
    // For now, just return an error
    return res.status(501).json({
      success: false,
      error: "Delete functionality not implemented for cloud storage",
    });

  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete report",
      message: error.message,
    });
  }
}

module.exports = {
  handleDownloadReport,
  handleViewReport,
  handleGenerateReport,
  handleGetReportInfo,
  handleListReports,
  handleDeleteReport
};