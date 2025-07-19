const mongoose = require("mongoose");

const ScanRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    type: { type: String, enum: ["call", "email"], required: true },
    filename: { type: String },
    fileUrl: { type: String },
    language: { type: String },

    // Embedded transcript + AI result
    analysisResult: {
      transcriptText: { type: String },
      spamScore: { type: Number, min: 0, max: 10 },
      isSpam: { type: Boolean },
      category: { type: String }, // e.g., 'phishing', 'robocall'
      redFlags: [String], // e.g., ['OTP', 'gift card']
      explanation: [String], // Point-wise explanation from AI
      sentiment: { type: String }, // e.g., 'aggressive', 'friendly', 'neutral'
      recommendedActions: [String], // e.g., ['Block number', 'Report to authorities']
      similarityScore: { type: Number, min: 0, max: 100 }, // Similarity to known scam patterns
    },
  },
  { timestamps: true }
);

const ScanRecord = mongoose.model("ScanRecord", ScanRecordSchema);

module.exports = ScanRecord;
