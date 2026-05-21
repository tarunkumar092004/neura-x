const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(`User: ${message}. Respond like a helpful, friendly AI assistant. Keep it concise and in Hinglish.`);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        res.status(500).json({ error: "Server busy, try again." });
    }
});

app.listen(PORT, () => console.log(`Server live on ${PORT}`));
