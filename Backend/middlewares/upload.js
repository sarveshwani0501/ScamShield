const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../Config/cloudinary.js");

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "spam-analysis/audio",
    allowed_formats: [
      "mp3",
      "wav",
      "m4a",
      "ogg",
      "webm",
      "flac",
      "mp4",
      "mpeg",
      "aac",
    ],
    resource_type: "auto", // Use 'auto' resource type for audio files
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // More permissive file type checking
    const allowedMimeTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/wave",
      "audio/x-wav",
      "audio/mp4",
      "audio/m4a",
      "audio/x-m4a",
      "audio/ogg",
      "audio/webm",
      "audio/flac",
      "audio/x-flac",
      "audio/aac",
      "video/mp4",
    ];

    const allowedExtensions = /\.(mp3|wav|m4a|ogg|webm|flac|mp4|aac|mpeg)$/i;

    if (
      allowedMimeTypes.includes(file.mimetype) ||
      allowedExtensions.test(file.originalname)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type. Received: ${file.mimetype}. Only audio files are allowed.`
        ),
        false
      );
    }
  },
});

module.exports = { upload };
