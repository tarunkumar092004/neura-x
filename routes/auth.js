const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => res.json({message: "Login route"}));
router.post('/signup', (req, res) => res.json({message: "Signup route"}));
module.exports = router;
