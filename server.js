const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ai', async (req, res) => {
    const { query } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.json({ response: "[ERROR] API Key is missing on Server. Set it in Render Environment." });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
            console.error("API Error Data:", JSON.stringify(data));
            res.json({ response: "[ERROR] Invalid response from AI. Check API Key validity in AI Studio." });
        }
    } catch (error) {
        res.json({ response: "[ERROR] Connection to Google servers failed." });
    }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

app.listen(PORT, () => {
    console.log(`Neura-X Server is live on port ${PORT}`);
});
