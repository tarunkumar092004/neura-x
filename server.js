const express = require('express');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 10000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'neurax_db.json');

// Global Intelligence Logic
async function getAIResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        return "[SYSTEM ERROR] Neural Core heartbeat lost. Check API Key configuration on Render.";
    }
}

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const aiResponse = await getAIResponse(query);
    
    // Database mein save karo
    const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [];
    db.push({ user_query: query, ai_response: aiResponse });
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
    
    res.json({ response: aiResponse });
});

app.get('/api/ai/history', (req, res) => {
    const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [];
    res.json({ history: db });
});

app.listen(PORT, () => console.log(`Neura-X Global Core active on ${PORT}`));
