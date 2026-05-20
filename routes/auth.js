const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => res.json({token: "fake-token"}));
router.post('/signup', (req, res) => res.json({message: "Success"}));
module.exports = router;
