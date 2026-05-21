const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// API Key initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ response: "Message khali hai!" });
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (e) {
        console.error("API Error:", e);
        res.status(500).json({ response: "Backend Error: " + e.message });
    }
});

app.listen(port, () => console.log('Server running on port ' + port));
