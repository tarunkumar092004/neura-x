const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Google Gemini Setup (Automatically picks key from Environment Variable)
const apiKey = process.env.GEMINI_API_KEY;
let ai;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
    console.log("⚡ [SUCCESS] Gemini AI initialized successfully.");
} else {
    console.log("⚠️ [WARNING] GEMINI_API_KEY missing in Environment Variables!");
}

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Bhai, message empty hai!" });
        }

        if (!ai) {
            return res.status(500).json({ 
                error: "[ERROR] Invalid response from AI. Check API Key validity in AI Studio." 
            });
        }

        // Terminal style strictly formatted prompt for Neura-X
        const systemInstruction = "You are Neura-X AI Core Terminal, a highly advanced, intelligent terminal assistant. Keep responses sharp, technical, and concise.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemInstruction}\nUser: ${message}`,
        });

        res.json({ response: response.text });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ 
            error: "[ERROR] Invalid response from AI. Check API Key validity in AI Studio." 
        });
    }
});

// Root route to check if server is alive
app.get('/', (req, res) => {
    res.send("Welcome to Neura-X AI Core Backend is Live! 🚀");
});

app.listen(PORT, () => {
    console.log(`🚀 Neura-X Server running on port ${PORT}`);
});
