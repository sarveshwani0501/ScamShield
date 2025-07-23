const ScanRecord = require("../models/scanRecord");
const { cloudinary } = require("../Config/cloudinary.js");

// Get analysis history with pagination
async function getAnalysisHistory(req, res) {
  try {
    console.log("233feiwnfceowidncccccnodsnvoldnekn");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = req.user ? { userId: req.user.userId } : {};

    const records = await ScanRecord.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    const total = await ScanRecord.countDocuments(query);
    console.log(`Found ${records.length} records`);
    return res.json({
      success: true,
      data: {
        records,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("History fetch error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch history",
      message: error.message,
    });
  }
}

// Get specific analysis record by ID
async function getAnalysisRecord(req, res) {
  try {
    const { id } = req.params;
    const record = await ScanRecord.findById(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }

    return res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Record fetch error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch record",
      message: error.message,
    });
  }
}

// Delete analysis record
async function deleteAnalysisRecord(req, res) {
  try {
    const { id } = req.params;
    const record = await ScanRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Record not found",
      });
    }

    // Optionally delete file from Cloudinary
    if (record.fileUrl) {
      try {
        const publicId = record.fileUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`spam-analysis/audio/${publicId}`, {
          resource_type: "auto",
        });
        console.log("🗑️ File deleted from Cloudinary:", publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
      }
    }

    return res.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("Record deletion error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete record",
      message: error.message,
    });
  }
}

module.exports = {
  getAnalysisHistory,
  getAnalysisRecord,
  deleteAnalysisRecord,
};
