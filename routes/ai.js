const express = require('express');
const router = express.Router();
router.post('/summarize', (req, res) => res.json({summary: "AI working"}));
module.exports = router;
