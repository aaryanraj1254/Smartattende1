const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { generateAttendanceQR } = require("../middleware/qrMiddleware");

const router = express.Router();
router.post("/generate", verifyToken, generateAttendanceQR, (req, res) => {
    res.status(200).json({ message: "QR Code generated!", qrCode: req.qrCode });
});

module.exports = router;