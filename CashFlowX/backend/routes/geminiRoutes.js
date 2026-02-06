const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { analyzeReceipt, generateFinancialSummary } = require("../controllers/geminiController");

// POST /api/v1/gemini/analyze
// Uses the 'image' field for the file
router.post("/analyze", upload.single("image"), analyzeReceipt);

// POST /api/v1/gemini/summary
// Generate AI-powered financial summary
router.post("/summary", protect, generateFinancialSummary);

module.exports = router;
