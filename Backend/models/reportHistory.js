const mongoose = require("mongoose");

const ReportHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scanId: { type: mongoose.Schema.Types.ObjectId, ref: "ScanRecord" },
  reportUrl: { type: String }, // downloadable PDF
  savedAt: { type: Date, default: Date.now },
});


const ReportHistory = mongoose.model("ReportHistory", ReportHistorySchema);

module.exports = ReportHistory;