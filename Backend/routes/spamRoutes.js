const express = require("express");
const router = express.Router();

// Import controllers and middleware
const { analyzeSpamCall } = require("../controllers/spamAnalysisController");
const {
  getAnalysisHistory,
  getAnalysisRecord,
  deleteAnalysisRecord,
  getSpamCount,
} = require("../controllers/historyController");

const { analyzeEmailContent } = require("../controllers/emailController");

const { checkForAuthentication } = require("../middlewares/Authentication");
const { upload } = require("../middlewares/upload");
const { uploadEmail } = require("../utils/emailUpload");

// Routes

router.post(
  "/analyze-call",
  checkForAuthentication("token"),
  upload.single("audio"),
  analyzeSpamCall
);

router.post(
  "/analyze-email",
  checkForAuthentication("token"),
  uploadEmail.single("email"),
  analyzeEmailContent
);

router.get("/history", checkForAuthentication("token"), getAnalysisHistory);
router.get("/history/:id", checkForAuthentication("token"), getAnalysisRecord);
router.delete(
  "/history/:id",
  checkForAuthentication("token"),
  deleteAnalysisRecord
);
//spam analytics
router.get("/getspamcount",checkForAuthentication("token"),getSpamCount)

module.exports = router;
