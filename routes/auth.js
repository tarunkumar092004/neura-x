const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => res.json({ token: "success" }));
module.exports = router;
