const express = require('express');
const router = express.Router();
router.post('/', (req, res) => res.json({message: "Notes route"}));
module.exports = router;
