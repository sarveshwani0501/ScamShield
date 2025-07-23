const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const os = require('os');
const { cloudinary } = require('../config/cloudinary');
const { generatePDF } = require('./pdfGeneratorService');
const ScanRecord = require('../models/scanRecord');

// Generate PDF report and upload to Cloudinary
async function generateAndUploadReport(scanData) {
  try {
    console.log('📄 Starting PDF report generation for scan:', scanData._id);

    // Temp file path in OS tmp dir
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `scamshield-report-${scanData._id}-${timestamp}.pdf`;
    const tempPath = path.join(os.tmpdir(), filename);

    // Generate PDF to temporary location
    await generatePDF(scanData, tempPath);

    console.log('📤 Uploading PDF to Cloudinary...');

    // Upload to Cloudinary with proper configuration
    const uploadResult = await cloudinary.uploader.upload(tempPath, {
      resource_type: 'raw',
      folder: 'spam_busters_reports',
      public_id: `report-${scanData._id}-${timestamp}`,
      type: 'upload',
      use_filename: false,
      unique_filename: true,
      overwrite: false
    });

    console.log('✅ PDF uploaded successfully:', uploadResult.secure_url);

    // Clean up temp file
    try {
      await fsPromises.unlink(tempPath);
      console.log('🗑️ Temporary file cleaned up');
    } catch (cleanupError) {
      console.warn('⚠️ Failed to cleanup temp file:', cleanupError.message);
    }

    // Update scan record with report URL
    scanData.report = {
      reportUrl: uploadResult.secure_url,
      filename: filename,
      savedAt: new Date(),
    };
    await scanData.save();

    console.log('💾 Scan record updated with report URL');

    return {
      reportUrl: uploadResult.secure_url,
      filename: filename,
      scanId: scanData._id,
      generatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Error generating/uploading report:', error);
    throw error;
  }
}

// Download report by scan ID
async function downloadReport(scanId) {
  try {
    const scanData = await ScanRecord.findById(scanId);

    if (!scanData || !scanData.report?.reportUrl) {
      throw new Error('Report not found');
    }

    return {
      reportUrl: scanData.report.reportUrl,
      filename: scanData.filename,
      generatedAt: scanData.report.savedAt
    };

  } catch (error) {
    console.error('❌ Error downloading report:', error);
    throw error;
  }
}

// Get report info without generating
async function getReportInfo(scanId) {
  try {
    const scanData = await ScanRecord.findById(scanId).select(
      'type filename createdAt analysisResult.spamScore analysisResult.isSpam analysisResult.category report'
    );

    if (!scanData) {
      throw new Error('Scan record not found');
    }

    if (!scanData.analysisResult) {
      throw new Error('Scan record does not have analysis results');
    }

    return {
      scanId: scanId,
      type: scanData.type,
      filename: scanData.filename,
      spamScore: scanData.analysisResult.spamScore,
      isSpam: scanData.analysisResult.isSpam,
      category: scanData.analysisResult.category,
      scannedAt: scanData.createdAt,
      reportExists: !!scanData.report?.reportUrl,
      reportUrl: scanData.report?.reportUrl || null,
      reportGeneratedAt: scanData.report?.savedAt || null,
      canGenerateReport: true,
    };

  } catch (error) {
    console.error('❌ Error fetching report info:', error);
    throw error;
  }
}

// List all available reports
async function listReports() {
  try {
    const reports = await ScanRecord.find({
      'report.reportUrl': { $exists: true },
    })
      .sort({ 'report.savedAt': -1 })
      .select('type report filename createdAt analysisResult.spamScore analysisResult.isSpam');

    return {
      count: reports.length,
      reports: reports.map((r) => ({
        scanId: r._id,
        type: r.type,
        filename: r.filename,
        spamScore: r.analysisResult.spamScore,
        isSpam: r.analysisResult.isSpam,
        reportUrl: r.report.reportUrl,
        savedAt: r.report.savedAt,
        scannedAt: r.createdAt
      })),
    };

  } catch (error) {
    console.error('❌ Error listing reports:', error);
    throw error;
  }
}

module.exports = {
  generateAndUploadReport,
  downloadReport,
  getReportInfo,
  listReports
};
