const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!ai) return res.status(500).json({ error: "AI Engine offline." });

        // Yahan dekho, model ka naam 1.5 hai, 1.6 nahi
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(`You are NEURA AI, a smart friend. Keep response concise, friendly, and in Hinglish. User message: ${message}`);
        const response = await result.response;
        
        res.json({ response: response.text() });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Connection error, retry please." });
    }
});

app.listen(PORT, () => console.log(`🚀 NEURA AI live on ${PORT}`));
