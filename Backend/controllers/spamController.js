const ScanRecord = require("../models/scanRecord");
const User = require("../models/user");
const uploadToCloudinary = require("../utils/cloudinary");
const path = require("path");
const {transcribeWithLangDetect} = require("../api/deepGramSTT.js");

const {analyzeTranscriptWithGemini} = require("../api/geminiAPI.js")



app.post('/upload', uploadUniversal.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileUrl = req.file.path;

    res.status(200).json({ 
      success: true,
      url: fileUrl,
      message: 'File uploaded successfully'
    });



  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Upload failed',
      message: err.message 
    });
  }
});








async function handleSpamCallAnalysis(req, res) {
  try {
    const { userId } = req.params;
    const localPath = req.file?.path;
    if (!localPath) {
      return res.status(400).json({ message: "Audio file not uploaded" });
    }
    const fileUrl = req.file.path;

    // sending audio file to deepgram api....
    const {transcibedText, confidence, language} = await transcribeWithLangDetect(fileUrl);
    //
    if (!transcibedText) {
      return res.status(500).json({ message: "Failed to generate text" });
    }

    // sending text to gemini
    const analysis = await analyzeTranscriptWithGemini
    (transcibedText);

    if (!analysis) {
      return res.status(500).json({ message: "Failed to generate analysis" });
    }
    const fileName = path.basename(localPath);

    const analysisResult = {};
    analysisResult?.transcriptText = transcibedText;
    analysisResult?.spamScore = analysis.spamScore;
    analysisResult?.spamScore = analysis.spamScore;
    analysisResult?.isSpam = analysis.isSpam;
    analysisResult?.category = analysis.category;
    analysisResult?.redFlags = analysis.redFlags;   
    analysisResult?.explanation = analysis.explanation; 
    const newSpamRecord = await ScanRecord.create({
      userId,
      type: "call",
      filename: fileName,
      fileUrl: result.secure_url,
      language: "lang",
      analysisResult
    });

    return res.status(200).json({message: "Analysis successful", analysis: newSpamRecord})
  } catch (error) {
    return res.status(500).json({ error: "Spam Call Analysis Failed" });
  }
}



async function handleSpamMailAnalysis(req, res) {
  try {
    const { userId } = req.params;

    const mailText = req.body;
    if(!mailText) {
        return res.status(400).json({message: "Text was not sent"})
    }
    const analysis = await analyzeTranscriptWithGemini(mailText);

    if (!analysis) {
      return res.status(500).json({ message: "Failed to generate analysis" });
    }
    
    const analysisResult = {};
    analysisResult?.transcriptText = mailText;
    analysisResult?.spamScore = analysis.spamScore;
    analysisResult?.spamScore = analysis.spamScore;
    analysisResult?.isSpam = analysis.isSpam;
    analysisResult?.category = analysis.category;
    analysisResult?.redFlags = analysis.redFlags;   
    analysisResult?.explanation = analysis.explanation; 
    const newSpamRecord = await ScanRecord.create({
      userId,
      type: "email",
      filename: fileName,
      language: "lang",
      analysisResult
    });

    return res.status(200).json({message: "Analysis successful", analysis: newSpamRecord})
  } catch (error) {
    return res.status(500).json({ error: "Spam Call Analysis Failed" });
  }
}


async function deleteRecord(req, res) {
    try {
        const {id} = req.params;
        await ScanRecord.deleteOne(id);

        return res.status(200).json({message: "Record deleted"})
    } catch (error) {
        return res.status(500).json({ error: "Spam Call Analysis Failed" });
    }
}

