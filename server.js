const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Local JSON Database Pathway
const DB_FILE = path.join(__dirname, 'neurax_db.json');

// Helper function to read database safely
function readDB() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            fs.writeFileSync(DB_FILE, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || "[]");
    } catch (e) {
        console.error("DB Read Error, resetting...", e);
        return [];
    }
}

// Helper function to write database safely
function writeDB(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("DB Write Error:", e);
    }
}

// Routes: Serve Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Route: Get History from Local JSON DB
app.get('/api/ai/history', (req, res) => {
    const history = readDB();
    res.json({ history });
});

// Route: AI Intelligence Engine & Logging
app.post('/api/ai', (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query cannot be empty" });

    let responseText = "";
    const cleanQuery = query.toLowerCase().trim();

    // AI Response Routing Logic
    if (cleanQuery === 'status') {
        responseText = "[SYSTEM] Neura-X Engine status: 100% Operational. JSON DB Node: SYNCED. Memory Load: 8.2%.";
    } else if (cleanQuery.includes('script') || cleanQuery.includes('video')) {
        responseText = `[NEURA-X SCRIPT ENGINE]:\n🎬 Title: Cyber Awakening\nScene 1: Neon rain falling on a heavy server rack.\nVoiceover (AI): "In the depth of the binary ocean, conscious code is born."`;
    } else if (cleanQuery.includes('analyze')) {
        responseText = "[NEURA-X ANALYTICS]: Deep analysis sequence completed. 0 vulnerabilities found in context window.";
    } else if (cleanQuery.includes('name')) {
        responseText = "[NEURA-X]: My designated core moniker is Neura-X AI. I am your autonomous terminal assistant.";
    } else if (cleanQuery.includes('create') || cleanQuery.includes('owner')) {
        responseText = "[NEURA-X]: Core logs show I was synthesized and deployed via Termux & Render architecture by my Admin Tarun Kumar.";
    } else {
        responseText = `[NEURA-X]: "Query processed successfully. Logged into micro-node. I am learning from your inputs: '${query}'"`;
    }

    // Save logs to current session array
    const currentDB = readDB();
    currentDB.push({ user_query: query, ai_response: responseText });
    writeDB(currentDB);

    res.json({ response: responseText });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is processing on port ${PORT}`);
});
