// const express = require('express');
// const router = express.Router();

// // Import controllers and middleware
// const { 
//   analyzeEmailContent, 
//   getEmailHistory, 
//   testEmailAPI 
// } = require('../controllers/emailController.js');
// const { authenticateToken, optionalAuth } = require('../middleware/auth.js');

// /**
//  * @route POST /api/email/analyze-email
//  * @desc Analyze email content for spam/phishing
//  * @access Public (with optional authentication)
//  * @body {Object} emailData - Parsed email data from email parser
//  * @body {Object} file - File information (optional)
//  */
// router.post('/analyze-email', analyzeEmailContent);

// /**
//  * @route GET /api/email/history
//  * @desc Get email analysis history with pagination
//  * @access Private (requires authentication)
//  * @query {Number} page - Page number (default: 1)
//  * @query {Number} limit - Items per page (default: 10)
//  */
// router.get('/history', getEmailHistory);

// /**
//  * @route GET /api/email/test
//  * @desc Test email analysis API status
//  * @access Public
//  */
// router.get('/test', testEmailAPI);

// module.exports = router;
