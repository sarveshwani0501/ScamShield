const TrialSessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true }, // UUID stored in cookie
  ipAddress: { type: String },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // expires in 1 hr
});

const TrialSession = mongoose.model("TrialSession", TrialSessionSchema);

module.exports = TrialSession;
