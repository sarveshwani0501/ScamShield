const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class ScamShieldPDFGenerator {
  constructor() {
    this.doc = null;
    this.pageMargin = 50;
    this.colors = {
      primary: '#1e40af',      // Blue
      danger: '#dc2626',       // Red
      warning: '#d97706',      // Orange
      success: '#059669',      // Green
      gray: '#6b7280',         // Gray
      lightGray: '#f3f4f6',    // Light Gray
      white: '#ffffff',
      black: '#000000'
    };
  }

  // Helper method to get risk color based on spam score
  getRiskColor(spamScore) {
    if (spamScore >= 7) return this.colors.danger;
    if (spamScore >= 4) return this.colors.warning;
    return this.colors.success;
  }

  // Helper method to get risk level text
  getRiskLevel(spamScore) {
    if (spamScore >= 7) return 'HIGH RISK';
    if (spamScore >= 4) return 'MEDIUM RISK';
    return 'LOW RISK';
  }

  // Draw header with logo placeholder and title
  drawHeader() {
    // Header background
    this.doc.rect(0, 0, this.doc.page.width, 100)
      .fill(this.colors.primary);

    // Logo placeholder (you can replace this with actual logo)
    this.doc.rect(this.pageMargin, 25, 50, 50)
      .fill(this.colors.white);
    
    this.doc.fontSize(12)
      .fill(this.colors.primary)
      .text('LOGO', this.pageMargin + 15, 45);

    // Title
    this.doc.fontSize(24)
      .fill(this.colors.white)
      .text('ScamShield Analysis Report', this.pageMargin + 80, 35);

    // Subtitle
    this.doc.fontSize(12)
      .fill(this.colors.white)
      .text('AI-Powered Spam Detection Analysis', this.pageMargin + 80, 65);

    // Move cursor down
    this.doc.y = 120;
  }

  // Draw summary card
  drawSummaryCard(scanData) {
    const startY = this.doc.y + 20;
    const cardHeight = 120;
    const riskColor = this.getRiskColor(scanData.analysisResult.spamScore);

    // Card background
    this.doc.rect(this.pageMargin, startY, this.doc.page.width - (this.pageMargin * 2), cardHeight)
      .fill(this.colors.lightGray)
      .stroke(this.colors.gray);

    // Risk score circle
    const circleX = this.pageMargin + 80;
    const circleY = startY + 60;
    const circleRadius = 35;

    this.doc.circle(circleX, circleY, circleRadius)
      .fill(riskColor);

    // Score text
    this.doc.fontSize(20)
      .fill(this.colors.white)
      .text(scanData.analysisResult.spamScore.toString(), circleX - 8, circleY - 10);

    // Risk level
    this.doc.fontSize(12)
      .fill(riskColor)
      .text(this.getRiskLevel(scanData.analysisResult.spamScore), circleX + 60, circleY - 20);

    // Spam status
    const spamStatus = scanData.analysisResult.isSpam ? 'SPAM DETECTED' : 'NO SPAM DETECTED';
    this.doc.fontSize(16)
      .fill(scanData.analysisResult.isSpam ? this.colors.danger : this.colors.success)
      .text(spamStatus, circleX + 60, circleY);

    // Category and sentiment
    this.doc.fontSize(10)
      .fill(this.colors.black)
      .text(`Category: ${scanData.analysisResult.category || 'N/A'}`, circleX + 60, circleY + 25)
      .text(`Sentiment: ${scanData.analysisResult.sentiment || 'N/A'}`, circleX + 60, circleY + 40);

    this.doc.y = startY + cardHeight + 30;
  }

  // Draw analysis details section
  drawAnalysisDetails(scanData) {
    this.doc.fontSize(18)
      .fill(this.colors.primary)
      .text('Analysis Details', this.pageMargin, this.doc.y);

    this.doc.y += 20;

    // Create two-column layout for details
    const leftColumn = this.pageMargin;
    const rightColumn = this.pageMargin + 250;
    const startY = this.doc.y;

    // Left column - Basic info
    this.doc.fontSize(12)
      .fill(this.colors.black)
      .text('File Information:', leftColumn, startY);

    this.doc.fontSize(10)
      .fill(this.colors.gray)
      .text(`Type: ${scanData.type.toUpperCase()}`, leftColumn, startY + 20)
      .text(`Filename: ${scanData.filename || 'N/A'}`, leftColumn, startY + 35)
      .text(`Language: ${scanData.language || 'Auto-detected'}`, leftColumn, startY + 50)
      .text(`Analyzed: ${new Date(scanData.createdAt).toLocaleString()}`, leftColumn, startY + 65);

    // Right column - Scores
    this.doc.fontSize(12)
      .fill(this.colors.black)
      .text('Risk Metrics:', rightColumn, startY);

    this.doc.fontSize(10)
      .fill(this.colors.gray)
      .text(`Spam Score: ${scanData.analysisResult.spamScore}/10`, rightColumn, startY + 20)
      .text(`Similarity Score: ${scanData.analysisResult.similarityScore || 0}%`, rightColumn, startY + 35);

    this.doc.y = startY + 90;
  }

  // Draw red flags section
  drawRedFlags(redFlags) {
    if (!redFlags || redFlags.length === 0) return;

    this.doc.fontSize(18)
      .fill(this.colors.danger)
      .text('⚠️ Red Flags Detected', this.pageMargin, this.doc.y);

    this.doc.y += 15;

    redFlags.forEach((flag, index) => {
      this.doc.fontSize(11)
        .fill(this.colors.black)
        .text(`• ${flag}`, this.pageMargin + 20, this.doc.y);
      this.doc.y += 18;
    });

    this.doc.y += 10;
  }

  // Draw explanation section
  drawExplanation(explanations) {
    if (!explanations || explanations.length === 0) return;

    this.doc.fontSize(18)
      .fill(this.colors.primary)
      .text('AI Analysis Explanation', this.pageMargin, this.doc.y);

    this.doc.y += 15;

    explanations.forEach((explanation, index) => {
      this.doc.fontSize(11)
        .fill(this.colors.black)
        .text(`${index + 1}. ${explanation}`, this.pageMargin, this.doc.y, {
          width: this.doc.page.width - (this.pageMargin * 2),
          align: 'left'
        });
      this.doc.y += 20;
    });

    this.doc.y += 10;
  }

  // Draw recommended actions
  drawRecommendedActions(actions) {
    if (!actions || actions.length === 0) return;

    this.doc.fontSize(18)
      .fill(this.colors.success)
      .text('🛡️ Recommended Actions', this.pageMargin, this.doc.y);

    this.doc.y += 15;

    actions.forEach((action, index) => {
      this.doc.fontSize(11)
        .fill(this.colors.black)
        .text(`• ${action}`, this.pageMargin + 20, this.doc.y);
      this.doc.y += 18;
    });

    this.doc.y += 10;
  }

  // Draw transcript section
  drawTranscript(transcript) {
    if (!transcript) return;

    // Check if we need a new page
    if (this.doc.y > this.doc.page.height - 200) {
      this.doc.addPage();
      this.doc.y = this.pageMargin;
    }

    this.doc.fontSize(18)
      .fill(this.colors.primary)
      .text('📝 Call Transcript', this.pageMargin, this.doc.y);

    this.doc.y += 15;

    // Transcript background
    const transcriptHeight = Math.min(200, transcript.length * 0.1 + 50);
    this.doc.rect(this.pageMargin, this.doc.y, this.doc.page.width - (this.pageMargin * 2), transcriptHeight)
      .fill('#f8f9fa')
      .stroke(this.colors.gray);

    this.doc.fontSize(10)
      .fill(this.colors.black)
      .text(transcript, this.pageMargin + 15, this.doc.y + 15, {
        width: this.doc.page.width - (this.pageMargin * 2) - 30,
        height: transcriptHeight - 30,
        align: 'left'
      });

    this.doc.y += transcriptHeight + 20;
  }

  // Draw footer
  drawFooter() {
    const footerY = this.doc.page.height - 50;
    
    // Footer line
    this.doc.moveTo(this.pageMargin, footerY)
      .lineTo(this.doc.page.width - this.pageMargin, footerY)
      .stroke(this.colors.gray);

    // Footer text
    this.doc.fontSize(8)
      .fill(this.colors.gray)
      .text('Generated by ScamShield AI | Confidential Report', this.pageMargin, footerY + 10)
      .text(`Report ID: ${Date.now()}`, this.doc.page.width - 150, footerY + 10);
  }

  // Main method to generate PDF
  async generatePDF(scanData, outputPath) {
    return new Promise((resolve, reject) => {
      try {
        this.doc = new PDFDocument({
          size: 'A4',
          margins: { top: 50, bottom: 50, left: 50, right: 50 }
        });

        // Pipe to file
        const stream = fs.createWriteStream(outputPath);
        this.doc.pipe(stream);

        // Draw all sections
        this.drawHeader();
        this.drawSummaryCard(scanData);
        this.drawAnalysisDetails(scanData);
        this.drawRedFlags(scanData.analysisResult.redFlags);
        this.drawExplanation(scanData.analysisResult.explanation);
        this.drawRecommendedActions(scanData.analysisResult.recommendedActions);
        this.drawTranscript(scanData.analysisResult.transcriptText);
        this.drawFooter();

        // Finalize PDF
        this.doc.end();

        stream.on('finish', () => {
          resolve(outputPath);
        });

        stream.on('error', (error) => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = ScamShieldPDFGenerator;
