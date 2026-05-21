const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

const API_KEY = "AIzaSyDB_ldn7yopDMvPcN1fvuiuoVxX4aAA9-Y";

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });
        const data = await response.json();
        res.json({ response: data.candidates[0].content.parts[0].text });
    } catch (e) {
        res.json({ response: "Error: Connection failed." });
    }
});

app.listen(PORT, () => console.log('Neura AI is live.'));
