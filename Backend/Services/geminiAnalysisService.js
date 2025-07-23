const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Enhanced analysis incorporating AssemblyAI's built-in spam detection
async function analyzeWithGemini(transcript, language, contentSafety = null, sentiment = null) {
  try {
    const prompt = createEnhancedAnalysisPrompt(transcript, language, contentSafety, sentiment);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();

    // Better JSON cleaning - handles various markdown formats
    // More comprehensive JSON cleaning
    analysisText = analysisText
      .replace(/```json\s*/g, '')        // Remove ```json
      .replace(/```\s*/g, '')            // Remove any remaining ```
      .replace(/`+/g, '')                // Remove any number of backticks
      .replace(/^\s*[\r\n]/gm, '')       // Remove empty lines
      .trim();
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('JSON parse error:', analysisText);
      analysisResult = createFallbackAnalysis(transcript);
    }

    return validateAnalysisResult(analysisResult, transcript);

  } catch (error) {
    console.error('Gemini analysis error:', error);
    return createFallbackAnalysis(transcript);
  }
}

// Enhanced prompt that incorporates AssemblyAI's content safety results
function createEnhancedAnalysisPrompt(transcript, language, contentSafety, sentiment) {
  const escapedTranscript = transcript.replace(/"/g, '\\"');
  
  let additionalContext = '';
  if (contentSafety && contentSafety.summary) {
    additionalContext += `\n**AssemblyAI Content Safety Results:** ${JSON.stringify(contentSafety.summary)}`;
  }
  if (sentiment && sentiment.length > 0) {
    additionalContext += `\n**AssemblyAI Sentiment Analysis:** ${JSON.stringify(sentiment[0])}`;
  }
  
  return `
You are an advanced AI system specialized in detecting spam, scam, and fraudulent phone calls in multiple languages. Analyze the following phone call transcript and provide a comprehensive assessment.

**Call Transcript:**
"${escapedTranscript}"

**Detected Language:** ${language}
${additionalContext}

**Analysis Requirements:**
Analyze this transcript for potential spam/scam indicators regardless of the language. Consider the AssemblyAI content safety and sentiment analysis results if provided. Provide results in the following JSON format ONLY (no additional text):

{
  "transcriptText": "${escapedTranscript}",
  "spamScore": <number between 0-10>,
  "isSpam": <boolean - true if spam score >= 5>,
  "category": "<category from: 'phishing', 'robocall', 'telemarketing', 'financial_scam', 'tech_support_scam', 'romance_scam', 'lottery_scam', 'charity_fraud', 'legitimate', 'suspicious', 'unknown'>",
  "redFlags": [<array of specific suspicious elements found>],
  "explanation": [<array of 3-5 detailed point-wise explanations in English>],
  "sentiment": "<one of: 'aggressive', 'manipulative', 'friendly', 'neutral', 'urgent', 'threatening'>",
  "recommendedActions": [<array of 2-4 specific actions in English>],
  "similarityScore": <number between 0-100>
}

**Key Indicators (Universal across languages):**
- Requests for personal/financial information
- Urgency tactics and pressure phrases
- Impersonation attempts (banks, government, tech support)
- Unsolicited offers or prizes
- Emotional manipulation tactics
- Poor grammar or unusual phrasing for the language
- Unusual payment requests (gift cards, wire transfers, cryptocurrency)
- Threats or intimidation
- Requests to download software or provide remote access

**Language-Specific Considerations:**
- Account for cultural communication patterns
- Consider typical scam patterns in the detected language region
- Evaluate grammar and phrasing appropriateness for native speakers

Provide ONLY the JSON response with explanations and actions in English regardless of the input language.`;
}

// Validate analysis result
function validateAnalysisResult(result, transcript) {
  return {
    transcriptText: result.transcriptText || transcript,
    spamScore: Math.min(10, Math.max(0, Number(result.spamScore) || 0)),
    isSpam: Boolean(result.isSpam),
    category: result.category || 'unknown',
    redFlags: Array.isArray(result.redFlags) ? result.redFlags : [],
    explanation: Array.isArray(result.explanation) ? result.explanation : ['Analysis completed'],
    sentiment: result.sentiment || 'neutral',
    recommendedActions: Array.isArray(result.recommendedActions) ? result.recommendedActions : ['Review call content'],
    similarityScore: Math.min(100, Math.max(0, Number(result.similarityScore) || 0))
  };
}

// Fallback analysis with multi-language keywords
function createFallbackAnalysis(transcript) {
  // Suspicious keywords in multiple languages
  const suspiciousKeywords = {
    english: ['otp', 'password', 'bank', 'credit card', 'urgent', 'immediate', 'congratulations', 'winner', 'prize', 'gift card', 'bitcoin', 'warranty', 'call back'],
    hindi: ['ओटीपी', 'पासवर्ड', 'बैंक', 'तुरंत', 'जल्दी', 'इनाम', 'जीता', 'गिफ्ट कार्ड', 'बिटकॉइन', 'वारंटी'],
    spanish: ['otp', 'contraseña', 'banco', 'urgente', 'inmediato', 'felicidades', 'ganador', 'premio', 'bitcoin', 'garantía'],
    french: ['mot de passe', 'banque', 'urgent', 'immédiat', 'félicitations', 'gagnant', 'prix', 'bitcoin', 'garantie'],
    german: ['passwort', 'bank', 'dringend', 'sofort', 'glückwunsch', 'gewinner', 'preis', 'bitcoin', 'garantie']
  };

  // Combine all keywords for detection
  const allKeywords = Object.values(suspiciousKeywords).flat();
  
  const foundKeywords = allKeywords.filter(keyword =>
    transcript.toLowerCase().includes(keyword.toLowerCase())
  );

  const spamScore = Math.min(10, foundKeywords.length * 2);

  return {
    transcriptText: transcript,
    spamScore: spamScore,
    isSpam: spamScore >= 5,
    category: spamScore >= 7 ? 'suspicious' : 'unknown',
    redFlags: foundKeywords,
    explanation: [
      'Multi-language keyword-based analysis performed',
      `Found ${foundKeywords.length} suspicious keywords`,
      'Manual review recommended for accurate assessment'
    ],
    sentiment: 'neutral',
    recommendedActions: spamScore >= 5 ? ['Review call content carefully', 'Be cautious of requests', 'Verify caller identity'] : ['Call appears normal', 'Standard precautions apply'],
    similarityScore: spamScore * 10
  };
}

module.exports = {
  analyzeWithGemini
};
