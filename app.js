const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = "AIzaSyDB_ldn7yopDMvPcN1fvuiuoVxX4aAA9-Y";

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    
    // Sahi URL format version 1 ke liye
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: query }] }]
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            res.json({ response: data.candidates[0].content.parts[0].text });
        } else {
            res.json({ response: "API Error: " + JSON.stringify(data) });
        }
    } catch (e) {
        res.json({ response: "Server Crash: " + e.message });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(PORT, () => console.log('Neura AI is live.'));
