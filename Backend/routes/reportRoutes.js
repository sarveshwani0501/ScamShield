const express = require("express");
const router = express.Router();

// Import controllers and middleware
const {
  handleDownloadReport,
  handleViewReport,
  handleGenerateReport,
} = require("../controllers/reportController.js");
// const { authenticateToken, optionalAuth } = require("../middleware/auth");

router.get("/download/:scanId", handleDownloadReport);

router.get("/view/:scanId", handleViewReport);

router.post("/generate/:scanId", handleGenerateReport);

// router.get("/info/:scanId", optionalAuth, handleGetReportInfo);

// router.get("/", authenticateToken, handleListReports);

// router.delete("/:filename", authenticateToken, handleDeleteReport);

module.exports = router;
