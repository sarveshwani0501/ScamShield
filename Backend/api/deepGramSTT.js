const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const axios = require("axios");

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
if (!DEEPGRAM_API_KEY) {
  console.error("Error: DEEPGRAM_API_KEY is not defined in .env file");
  process.exit(1);
}
console.log("Deepgram API Key:", DEEPGRAM_API_KEY);

async function transcribeWithLangDetect(audioUrl) {
  const res = await axios.post(
    "https://api.deepgram.com/v1/listen?model=nova-3-general&detect_language=true&punctuate=true",
    { url: audioUrl },
    {
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const alt = res.data.results.channels[0].alternatives[0];
  const transcibedText = alt.transcript;

  const lang = res.data.results.channels[0].detected_language;
  const langConfidence = res.data.results.channels[0].language_confidence;

  return { transcibedText, language: lang, confidence: langConfidence };
}

module.exports = { transcribeWithLangDetect };

// Test call
// transcribeWithLangDetect(
//   "https://res.cloudinary.com/dmwrgittv/video/upload/v1752926735/spam_busters_uploads/wdjvktv25kltwyxa1s1z.mp3"
// ).then(console.log);
