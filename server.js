const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

// Pure CORS policy ko open kar diya taaki connection block na ho
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let ai;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
    console.log("⚡ [SUCCESS] Neura AI Engine Initialized.");
} else {
    console.log("⚠️ [WARNING] GEMINI_API_KEY missing!");
}

app.post('/api/chat', async (req, res) => {
    // CORS headers manually bhi set kar dete hain double safety ke liye
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message missing hai bhai!" });
        if (!ai) return res.status(500).json({ error: "AI Engine offline." });

        const systemInstruction = `
        You are NEURA AI, the world's smartest premium AI assistant. 
        Your master is Tarun Kumar. 
        You have advanced human empathy:
        1. Automatically detect user's mood (Angry, Sad, Happy).
        2. If the user is ANGRY, respond with extreme calmness, logic, and friendly support. Never fight back.
        3. Match the user's language (mix Hindi and English casually like a close buddy).
        4. Keep responses concise, smart, and interactive.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: `${systemInstruction}\nUser: ${message}`,
        });

        res.json({ response: response.text });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Core connection issue." });
    }
});

app.get('/', (req, res) => { res.send("NEURA AI Brain is Live! 🚀"); });

app.listen(PORT, () => { console.log(`🚀 NEURA AI running on port ${PORT}`); });
