const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Summarize this note: " + text);
        res.json({ summary: result.response.text() });
    } catch (err) {
        res.status(500).json({ error: 'AI Error' });
    }
});

module.exports = router;
