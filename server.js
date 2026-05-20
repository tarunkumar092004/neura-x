const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });
        
        const data = await response.json();
        // Check if data is valid
        if (data.candidates && data.candidates[0].content) {
            res.json({ response: data.candidates[0].content.parts[0].text });
        } else {
            res.json({ response: "AI response failed. Check key permissions." });
        }
    } catch (e) {
        res.json({ response: "Network error." });
    }
});

app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.listen(PORT);
