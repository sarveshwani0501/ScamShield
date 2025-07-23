const mongoose = require('mongoose');

const scanRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  type: {
    type: String,
    enum: ['call', 'text', 'email'],
    required: true,
    default: 'call'
  },
  filename: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'unknown'
  },
  analysisResult: {
    transcriptText: {
      type: String,
      required: true
    },
    spamScore: {
      type: Number,
      min: 0,
      max: 10,
      required: true
    },
    isSpam: {
      type: Boolean,
      required: true
    },
    category: {
      type: String,
      enum: [
        'phishing', 
        'robocall', 
        'telemarketing', 
        'financial_scam', 
        'tech_support_scam', 
        'romance_scam', 
        'lottery_scam', 
        'charity_fraud', 
        'legitimate', 
        'suspicious', 
        'unknown'
      ],
      default: 'unknown'
    },
    redFlags: [{
      type: String
    }],
    explanation: [{
      type: String
    }],
    sentiment: {
      type: String,
      enum: ['aggressive', 'manipulative', 'friendly', 'neutral', 'urgent', 'threatening','suspicious'],
      default: 'neutral'
    },
    recommendedActions: [{
      type: String
    }],
    similarityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  metadata: {
    fileSize: Number,
    duration: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    processingTime: Number,
    confidence: Number
  },
  // Embedded report history
    report: {
      reportUrl: { type: String }, // downloadable PDF
      savedAt: { type: Date, default: null }, // only set if report is saved
    },

}, {
  timestamps: true
});

// Index for better query performance
scanRecordSchema.index({ userId: 1, createdAt: -1 });
scanRecordSchema.index({ 'analysisResult.isSpam': 1 });
scanRecordSchema.index({ 'analysisResult.spamScore': 1 });

const ScanRecord = mongoose.model('ScanRecord', scanRecordSchema);

module.exports = ScanRecord;
