const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'neurax_db.json');
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// AI Response via Native Fetch
async function getAIResponse(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "[SYSTEM ERROR] Neural Core connection failed. Check API Key validity.";
    }
}

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const aiResponse = await getAIResponse(query);
    
    // Save to local JSON DB
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
