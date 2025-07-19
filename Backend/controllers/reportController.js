const ScanRecord = require('../models/scanRecord.js'); // Adjust path as needed
const ScamShieldPDFGenerator = require('../utils/pdfReportHandler'); // Adjust path as needed
const path = require('path');
const fs = require('fs');

class ReportController {
  
  // Generate and download PDF report
  async downloadReport(req, res) {
    try {
      const { scanId } = req.params;

      // Fetch scan data from database
      const scanData = await ScanRecord.findById(scanId);
      if (!scanData) {
        return res.status(404).json({ 
          success: false,
          error: 'Scan record not found' 
        });
      }

      // Create reports directory if it doesn't exist
      const reportsDir = path.join(process.cwd(), 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      // Generate PDF filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `scamshield-report-${scanId}-${timestamp}.pdf`;
      const outputPath = path.join(reportsDir, filename);

      // Generate PDF
      const pdfGenerator = new ScamShieldPDFGenerator();
      await pdfGenerator.generatePDF(scanData, outputPath);

      // Send PDF as download
      res.download(outputPath, filename, (err) => {
        if (err) {
          console.error('Error sending PDF:', err);
          return res.status(500).json({ 
            success: false,
            error: 'Failed to send PDF report' 
          });
        }
        
        // Optional: Clean up file after sending (uncomment if needed)
        // setTimeout(() => {
        //   if (fs.existsSync(outputPath)) {
        //     fs.unlinkSync(outputPath);
        //   }
        // }, 5000);
      });

    } catch (error) {
      console.error('Error generating PDF report:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to generate PDF report',
        message: error.message 
      });
    }
  }

  // Generate PDF and save locally (returns file info)
  async generateReport(req, res) {
    try {
      const { scanId } = req.params;

      // Fetch scan data from database
      const scanData = await ScanRecord.findById(scanId);
      if (!scanData) {
        return res.status(404).json({ 
          success: false,
          error: 'Scan record not found' 
        });
      }

      // Validate scan data has analysis results
      if (!scanData.analysisResult) {
        return res.status(400).json({
          success: false,
          error: 'Scan record does not have analysis results'
        });
      }

      // Create reports directory if it doesn't exist
      const reportsDir = path.join(process.cwd(), 'reports');
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      // Generate PDF filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `scamshield-report-${scanId}-${timestamp}.pdf`;
      const outputPath = path.join(reportsDir, filename);

      // Generate PDF
      const pdfGenerator = new ScamShieldPDFGenerator();
      await pdfGenerator.generatePDF(scanData, outputPath);

      // Get file stats
      const stats = fs.statSync(outputPath);

      res.json({
        success: true,
        message: 'PDF report generated successfully',
        data: {
          filename: filename,
          path: outputPath,
          size: stats.size,
          scanId: scanId,
          scanType: scanData.type,
          spamScore: scanData.analysisResult.spamScore,
          isSpam: scanData.analysisResult.isSpam,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Error generating PDF report:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to generate PDF report',
        message: error.message 
      });
    }
  }

  // Get report info without generating (check if scan exists and is valid)
  async getReportInfo(req, res) {
    try {
      const { scanId } = req.params;

      const scanData = await ScanRecord.findById(scanId).select(
        'type filename createdAt analysisResult.spamScore analysisResult.isSpam analysisResult.category'
      );

      if (!scanData) {
        return res.status(404).json({ 
          success: false,
          error: 'Scan record not found' 
        });
      }

      if (!scanData.analysisResult) {
        return res.status(400).json({
          success: false,
          error: 'Scan record does not have analysis results'
        });
      }

      res.json({
        success: true,
        data: {
          scanId: scanId,
          type: scanData.type,
          filename: scanData.filename,
          spamScore: scanData.analysisResult.spamScore,
          isSpam: scanData.analysisResult.isSpam,
          category: scanData.analysisResult.category,
          scannedAt: scanData.createdAt,
          canGenerateReport: true
        }
      });

    } catch (error) {
      console.error('Error fetching report info:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch report information',
        message: error.message 
      });
    }
  }

  // List all available reports (optional utility method)
  async listReports(req, res) {
    try {
      const reportsDir = path.join(process.cwd(), 'reports');
      
      if (!fs.existsSync(reportsDir)) {
        return res.json({
          success: true,
          data: {
            reports: [],
            count: 0
          }
        });
      }

      const files = fs.readdirSync(reportsDir)
        .filter(file => file.endsWith('.pdf'))
        .map(file => {
          const filePath = path.join(reportsDir, file);
          const stats = fs.statSync(filePath);
          return {
            filename: file,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          };
        })
        .sort((a, b) => b.created - a.created);

      res.json({
        success: true,
        data: {
          reports: files,
          count: files.length
        }
      });

    } catch (error) {
      console.error('Error listing reports:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to list reports',
        message: error.message 
      });
    }
  }

  // Delete a generated report file (cleanup utility)
  async deleteReport(req, res) {
    try {
      const { filename } = req.params;
      
      // Validate filename to prevent directory traversal
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid filename'
        });
      }

      const filePath = path.join(process.cwd(), 'reports', filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          error: 'Report file not found'
        });
      }

      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: 'Report deleted successfully',
        data: {
          filename: filename,
          deletedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Error deleting report:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to delete report',
        message: error.message 
      });
    }
  }
}

module.exports = new ReportController();
