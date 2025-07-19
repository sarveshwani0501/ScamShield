const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Analyze transcript text using Gemini API
//  * @param {string} transcriptText - The transcribed text to analyze
//  * @returns {Promise<string>} - AI-generated spam analysis
//  */
async function analyzeTranscriptWithGemini(transcriptText) {
  if (!transcriptText) throw new Error("Transcript text is required.");

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an AI assistant trained to detect spam and fraud content in audio and email conversations.
Analyze the following transcript and return:
- Whether it is spam (true/false)
- A spam score (0–10)
- The category (e.g., phishing, robocall, fake job, etc.)
- Red-flagged phrases (like "OTP", "gift card", "limited time")
- A short explanation for the classification.

Transcript:
""" 
${transcriptText}
"""
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = {analyzeTranscriptWithGemini};
