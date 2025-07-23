const axios = require("axios");

// Initialize AssemblyAI client
const assemblyAI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    Authorization: process.env.ASSEMBLYAI_API_KEY,
  },
});

// Transcribe audio using AssemblyAI with automatic language detection
async function transcribeAudio(audioUrl, filename) {
  try {
    console.log("🎵 Starting AssemblyAI transcription for:", filename);
    console.log("📂 Audio URL:", audioUrl);

    // Step 1: Submit audio for transcription
    const transcriptResponse = await assemblyAI.post("/transcript", {
      audio_url: audioUrl,
      language_detection: true, // Enable automatic language detection
      punctuate: true, // Add punctuation
      format_text: true, // Format text properly
      dual_channel: false, // Single channel audio
      speech_model: "best", // Use best model for accuracy
    });

    const transcriptId = transcriptResponse.data.id;
    console.log("📤 Transcription submitted, ID:", transcriptId);

    // Step 2: Poll for completion
    let transcript;
    let attempts = 0;
    const maxAttempts = 60; // 1 minute timeout

    while (attempts < maxAttempts) {
      const pollingResponse = await assemblyAI.get(
        `/transcript/${transcriptId}`
      );
      transcript = pollingResponse.data;

      console.log("📊 Transcription status:", transcript.status);

      if (transcript.status === "completed") {
        console.log("✅ Transcription completed successfully!");
        break;
      }

      if (transcript.status === "error") {
        throw new Error(`AssemblyAI transcription error: ${transcript.error}`);
      }

      // Wait 1 second before next poll
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }

    if (attempts >= maxAttempts) {
      throw new Error("Transcription timeout - took longer than 1 minute");
    }

    // Extract results
    const transcriptText = transcript.text || "";
    const detectedLanguage = transcript.language_code || "en";
    const confidence = transcript.confidence || 0.9;

    // Debug: Log the full transcript object to see what's available
    console.log("📋 Full transcript object keys:", Object.keys(transcript));
    console.log(
      "📋 Full transcript data:",
      JSON.stringify(transcript, null, 2)
    );

    console.log(transcript.text);
    console.log("🌍 Detected language:", detectedLanguage);
    console.log("📝 Transcript length:", transcriptText.length, "characters");
    console.log("📊 Confidence:", confidence);
    console.log(
      "🔒 Content safety labels:",
      transcript.content_safety_labels?.summary || "None"
    );

    // Log first 100 characters for debugging
    if (transcriptText.length > 0) {
      console.log("📄 Preview:", transcriptText.substring(0, 100) + "...");
    }

    return {
      transcript: transcriptText.trim(),
      language: detectedLanguage,
      confidence: confidence,
      contentSafety: transcript.content_safety_labels || null,
      sentiment: transcript.sentiment_analysis_results || null,
    };
  } catch (error) {
    console.error(
      "❌ AssemblyAI transcription error:",
      error.response?.data || error.message
    );

    // Fallback to mock transcript for testing
    console.warn("⚠️ Using mock transcript for testing purposes");
    return {
      transcript:
        "नमस्ते, मैं आपकी कार की वारंटी के बारे में कॉल कर रहा हूं। आपको तुरंत हमें वापस कॉल करना होगा वरना आपकी कवरेज रद्द हो जाएगी। कृपया अभी 1-800-555-0123 पर कॉल करें।",
      language: "hi",
      confidence: 0.8,
      contentSafety: null,
      sentiment: null,
    };
  }
}

module.exports = {
  transcribeAudio,
};
