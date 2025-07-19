const express = require("express");

const router = express.Router();
// routes for processing the call or mail and saving them in the database
router.post("/spam-call/analyze", uploadUniversal.single("file"));

router.post("/spam-mail/analyze", uploadUniversal.single("file"));

// route to delete a spam record from the DB
router.delete("/:id/spam-record");

// get record of all spam calls of a user
router.get("/:userId/spam-call");

// get record of all spam mails of a user
router.get("/:userId/spam-mail");

// get all spam calls and spam mails uploaded by a user with the transcript results
router.get("/:userId/scan-history");

// get a single scanRecord
router.get("/scan/:scanId/results");

// download report of a spam call or mail
router.get("/scan/:scanId/download-report");

router.post("/scan/:scanId/save-report");
