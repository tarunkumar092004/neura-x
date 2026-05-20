const express = require('express');
const router = express.Router();
router.post('/summarize', (req, res) => res.json({summary: "AI response"}));
module.exports = router;
