const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DB_FILE = path.join(__dirname, 'neurax_db.json');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.json({ response: "[ERROR] API Key missing in Render environment." });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            
            // DB Save
            const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [];
            db.push({ user_query: query, ai_response: aiResponse });
            fs.writeFileSync(DB_FILE, JSON.stringify(db));
            
            res.json({ response: aiResponse });
        } else {
            res.json({ response: "[ERROR] Received invalid response from AI core. Check your API Key." });
        }
    } catch (error) {
        res.json({ response: "[ERROR] Connection timeout to Gemini node." });
    }
});

app.get('/api/ai/history', (req, res) => {
    const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [];
    res.json({ history: db });
});

app.listen(PORT, () => console.log(`Neura-X live on ${PORT}`));
