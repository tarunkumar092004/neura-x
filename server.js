const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path fix for files
const DB_FILE = path.join(__dirname, 'neurax_db.json');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

// AI API with Fetch (No dependencies needed)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        // DB save
        const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE)) : [];
        db.push({ user_query: query, ai_response: aiResponse });
        fs.writeFileSync(DB_FILE, JSON.stringify(db));
        
        res.json({ response: aiResponse });
    } catch (error) {
        res.json({ response: "[SYSTEM ERROR] Neural Core heartbeat failed." });
    }
});

app.listen(PORT, () => console.log(`Server live on ${PORT}`));
