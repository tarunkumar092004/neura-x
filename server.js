const express = require('express');
const cors = require('cors');
const loki = require('lokijs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Yahan se public folder serve ho raha hai ✅
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyA7jwirCFjYkjCvaU_Q5H54fZ11fV1IeAI"; 

const db = new loki(path.join(__dirname, 'neurax_local.db'), {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true, 
    autosaveInterval: 4000
});

let users;

function databaseInitialize() {
    users = db.getCollection("users");
    if (users === null) {
        users = db.addCollection("users");
    }
    console.log("⚡ Neura-X Database Live!");
}

app.post('/api/ai/chat', async (req, res) => {
    const { userId, prompt, mode } = req.body;
    try {
        const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const response = await axios.post(googleUrl, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ response: aiResponse });
    } catch (err) {
        res.status(500).json({ error: "AI Error", details: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
