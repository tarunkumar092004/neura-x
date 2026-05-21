const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Key yahan seedha daal rahe hain
const API_KEY = "AIzaSyDB_ldn7yopDMvPcN1fvuiuoVxX4aAA9-Y";

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    
    // YE URL FIX HAI: v1beta use karna hai
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            res.json({ response: data.candidates[0].content.parts[0].text });
        } else {
            console.log("DEBUG DATA:", JSON.stringify(data));
            res.json({ response: "Error: Check API Key/Model permissions." });
        }
    } catch (error) {
        res.json({ response: "Connection Failed." });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

app.listen(PORT, () => console.log(`Server running`));
