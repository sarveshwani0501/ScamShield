const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Modern color palette
const colors = {
  primary: '#3B82F6',      // Blue-500
  primaryLight: '#EFF6FF',  // Blue-50
  danger: '#EF4444',       // Red-500
  dangerLight: '#FEF2F2',  // Red-50
  warning: '#F59E0B',      // Amber-500
  warningLight: '#FFFBEB', // Amber-50
  success: '#10B981',      // Emerald-500
  successLight: '#ECFDF5', // Emerald-50
  gray: '#6B7280',         // Gray-500
  lightGray: '#F9FAFB',    // Gray-50
  darkGray: '#374151',     // Gray-700
  white: '#FFFFFF',
  black: '#111827',        // Gray-900
  accent: '#8B5CF6'        // Violet-500
};

// Fixed Helper method to get risk color based on spam score AND category
function getRiskColor(spamScore, category) {
  if (category?.toLowerCase() === 'suspicious') return colors.warning;
  if (spamScore >= 7) return colors.danger;
  if (spamScore >= 4) return colors.warning;
  return colors.success;
}

// Fixed Helper method to get risk level text based on category and score
function getRiskLevel(spamScore, category) {
  if (category?.toLowerCase() === 'suspicious') return 'MEDIUM RISK';
  if (spamScore >= 7) return 'HIGH RISK';
  if (spamScore >= 4) return 'MEDIUM RISK';
  return 'LOW RISK';
}

// Generate HTML content with PERFECT alignment
function generateHTML(scanData) {
  const { analysisResult } = scanData;
  const riskColor = getRiskColor(analysisResult.spamScore, analysisResult.category);
  const riskLevel = getRiskLevel(analysisResult.spamScore, analysisResult.category);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          color: ${colors.black};
          line-height: 1.6;
          background: ${colors.white};
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          padding: 50px;
          margin: 0 auto;
          background: white;
        }

        /* Header Styles */
        .header {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
          color: white;
          padding: 25px 50px;
          margin: -50px -50px 35px -50px;
          position: relative;
          height: 110px;
          display: flex;
          align-items: center;
        }

        .header::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50px;
          right: 50px;
          height: 4px;
          background: ${colors.accent};
        }

        .logo-container {
          width: 65px;
          height: 60px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 35px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo {
          font-size: 30px;
        }

        .header-text h1 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .header-text p {
          font-size: 17px;
          opacity: 0.9;
        }

        /* Section Titles */
        .section-title {
          font-size: 30px;
          font-weight: 700;
          margin: 35px 0 25px 0;
          color: ${colors.black};
        }

        .section-title.small {
          font-size: 22px;
          margin: 30px 0 20px 0;
        }

        .section-title.danger { color: ${colors.danger}; }
        .section-title.primary { color: ${colors.primary}; }
        .section-title.success { color: ${colors.success}; }

        /* FIXED: Risk Assessment Layout with Perfect Alignment */
        .risk-assessment {
          margin-bottom: 35px;
        }

        .risk-cards-row {
          display: flex;
          align-items: stretch;
          gap: 25px;
          margin-bottom: 25px;
          height: 100px;
        }

        .risk-card {
          background: ${riskColor};
          color: white;
          width: 300px;
          height: 100px;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          border: 2px solid ${riskColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .risk-content h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .risk-level {
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
        }

        /* FIXED: Info Cards with Perfect Center Alignment */
        .info-cards-container {
          display: flex;
          gap: 20px;
          height: 100px;
        }

        .info-card {
          background: ${colors.lightGray};
          width: 130px;
          height: 100px;
          padding: 15px;
          border-radius: 14px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          border: 2px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .info-card.primary-info {
          background: ${colors.primaryLight};
          border-color: ${colors.primary};
        }

        .card-label {
          font-size: 12px;
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .score-container {
          display: flex;
          align-items: baseline;
          justify-content: center;
        }

        .score-large {
          font-size: 36px;
          font-weight: 700;
          color: ${riskColor};
          line-height: 1;
        }

        .score-suffix {
          font-size: 18px;
          color: ${colors.gray};
          margin-left: 2px;
        }

        .card-value {
          font-size: 14px;
          font-weight: 600;
          color: ${colors.black};
          text-align: center;
          line-height: 1.2;
        }

        /* FIXED: Bottom Cards Row with Perfect Alignment */
        .bottom-cards-row {
          display: flex;
          gap: 25px;
          margin-top: 25px;
        }

        .bottom-card {
          flex: 1;
          height: 75px;
          padding: 15px 20px;
          border-radius: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          background: ${colors.lightGray};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .bottom-card.date-card {
          border: 2px solid ${colors.accent};
        }

        .bottom-card.file-card {
          border: 2px solid ${colors.success};
        }

        .bottom-card .card-label {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .bottom-card.date-card .card-label {
          color: ${colors.accent};
        }

        .bottom-card.file-card .card-label {
          color: ${colors.success};
        }

        .bottom-card .card-value {
          font-size: 15px;
          font-weight: 600;
          color: ${colors.black};
          text-align: left;
        }

        /* FIXED: Alert Grid with Perfect Card Alignment */
        .alert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-top: 25px;
        }

        .alert-card {
          background: ${colors.dangerLight};
          border: 2px solid ${colors.danger};
          border-radius: 14px;
          padding: 20px;
          min-height: 80px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
        }

        .alert-icon {
          font-size: 22px;
          margin-right: 18px;
          flex-shrink: 0;
        }

        .alert-text {
          font-size: 13px;
          color: ${colors.black};
          line-height: 1.5;
          font-weight: 500;
        }

        /* FIXED: Analysis Card with Better Text Alignment */
        .analysis-card {
          background: ${colors.primaryLight};
          border: 2px solid ${colors.primary};
          border-radius: 14px;
          padding: 25px;
          margin-top: 25px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .analysis-list {
          list-style: none;
          counter-reset: analysis-counter;
          margin: 0;
          padding: 0;
        }

        .analysis-list li {
          counter-increment: analysis-counter;
          margin-bottom: 18px;
          font-size: 13px;
          line-height: 1.6;
          font-weight: 400;
          display: flex;
          align-items: flex-start;
        }

        .analysis-list li::before {
          content: counter(analysis-counter) ".";
          font-weight: 700;
          color: ${colors.primary};
          margin-right: 10px;
          flex-shrink: 0;
          width: 20px;
        }

        /* FIXED: Actions Grid with Perfect Card Alignment */
        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-top: 25px;
        }

        .action-card {
          background: ${colors.successLight};
          border: 2px solid ${colors.success};
          border-radius: 14px;
          padding: 20px;
          min-height: 80px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }

        .action-icon {
          font-size: 22px;
          margin-right: 18px;
          flex-shrink: 0;
        }

        .action-text {
          font-size: 13px;
          color: ${colors.black};
          line-height: 1.5;
          font-weight: 500;
        }

        /* FIXED: Footer with Perfect Alignment */
        .footer {
          margin-top: 50px;
          padding: 20px 0;
          border-top: 4px solid ${colors.primary};
          background: ${colors.lightGray};
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
        }

        .footer span {
          font-size: 11px;
          color: ${colors.gray};
          font-weight: 500;
        }

        .footer-center {
          font-size: 13px;
          font-weight: 700;
          color: ${colors.primary};
        }
      </style>
    </head>
    <body>
      <div class="page">
        <!-- Header -->
        <div class="header">
          <div class="logo-container">
            <span class="logo">🛡️</span>
          </div>
          <div class="header-text">
            <h1>SCAM SHIELD</h1>
            <p>AI-Powered Call Analysis Report</p>
          </div>
        </div>

        <!-- Risk Assessment with PERFECT alignment -->
        <div class="risk-assessment">
          <h2 class="section-title">Risk Assessment</h2>
          
          <div class="risk-cards-row">
            <div class="risk-card">
              <div class="risk-content">
                <h3>THREAT LEVEL</h3>
                <div class="risk-level">${riskLevel}</div>
              </div>
            </div>

            <div class="info-cards-container">
              <div class="info-card">
                <span class="card-label">SPAM SCORE</span>
                <div class="score-container">
                  <span class="score-large">${analysisResult.spamScore}</span><span class="score-suffix">/10</span>
                </div>
              </div>

              <div class="info-card primary-info">
                <span class="card-label">CATEGORY</span>
                <div class="card-value">${analysisResult.category.toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div class="bottom-cards-row">
            <div class="bottom-card date-card">
              <span class="card-label">ANALYZED ON</span>
              <div class="card-value">${new Date(scanData.createdAt).toLocaleDateString()}</div>
            </div>

            <div class="bottom-card file-card">
              <span class="card-label">SOURCE FILE</span>
              <div class="card-value">${scanData.filename || 'Unknown'}</div>
            </div>
          </div>
        </div>

        ${analysisResult.redFlags && analysisResult.redFlags.length > 0 ? `
        <!-- Security Alerts -->
        <div class="alerts-section">
          <h2 class="section-title small danger">🚨 Security Alerts</h2>
          <div class="alert-grid">
            ${analysisResult.redFlags.slice(0, 4).map(flag => `
              <div class="alert-card">
                <span class="alert-icon">⚠️</span>
                <span class="alert-text">${flag}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${analysisResult.explanation && analysisResult.explanation.length > 0 ? `
        <!-- Analysis Details -->
        <div class="analysis-section">
          <h2 class="section-title small primary">📊 Analysis Details</h2>
          <div class="analysis-card">
            <ol class="analysis-list">
              ${analysisResult.explanation.slice(0, 4).map(point => `
                <li>${point}</li>
              `).join('')}
            </ol>
          </div>
        </div>
        ` : ''}

        ${analysisResult.recommendedActions && analysisResult.recommendedActions.length > 0 ? `
        <!-- Recommended Actions -->
        <div class="actions-section">
          <h2 class="section-title small success">✅ Recommended Actions</h2>
          <div class="actions-grid">
            ${analysisResult.recommendedActions.slice(0, 4).map(action => `
              <div class="action-card">
                <span class="action-icon">✅</span>
                <span class="action-text">${action}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
          <span>Generated ${new Date().toLocaleString()}</span>
          <span class="footer-center">Powered by ScamShield AI</span>
          <span>Page 1</span>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Main function to generate PDF (same name as original)
async function generatePDF(scanData, outputPath) {
  try {
    console.log('🚀 Generating modern PDF report...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1
    });
    
    const htmlContent = generateHTML(scanData);
    
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    await page.evaluateHandle('document.fonts.ready');
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      },
      scale: 1.0,
      displayHeaderFooter: false
    });
    
    await browser.close();
    
    console.log('✅ Modern PDF generated successfully:', outputPath);
    return outputPath;
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

module.exports = {
  generatePDF
};
