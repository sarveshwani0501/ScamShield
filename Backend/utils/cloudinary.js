require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
console.log("Cloudinary Config:", {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
});

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

// Unified storage for images, audio, and PDFs
const universalStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "spam_busters_uploads",
    resource_type: "auto", // auto detects file type (image, video/audio, raw)
    allowed_formats: ["jpg", "jpeg", "png", "mp3", "wav", "m4a", "ogg", "pdf"],
  },
});

const uploadUniversal = multer({ storage: universalStorage });

module.exports = { cloudinary, uploadUniversal };
