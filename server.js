const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Initialization
const db = new sqlite3.Database(path.join(__dirname, 'neurax_local.db'), (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to Neura-X SQLite Database.");
});

// Create Terminal Memory Table if not exists
db.run(`CREATE TABLE IF NOT EXISTS terminal_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_query TEXT,
    ai_response TEXT
)`);

// Route: Serve Main Login/Landing Page
app.get('/', (path, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route: Serve Dashboard Page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Route: Fetch Saved History from Database
app.get('/api/ai/history', (req, res) => {
    db.all(`SELECT user_query, ai_response FROM terminal_logs ORDER BY id ASC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ history: rows });
    });
});

// Route: Smart AI Logic and Saving Engine
app.post('/api/ai', (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is empty" });

    let responseText = "";
    const cleanQuery = query.toLowerCase().trim();

    // Smart Text Router (AI Brain Mock)
    if (cleanQuery === 'status') {
        responseText = "[SYSTEM] Neura-X Engine status: 100% Operational. Database Sync: OK. Memory Load: 12.4%.";
    } else if (cleanQuery.includes('script') || cleanQuery.includes('video')) {
        responseText = `[NEURA-X SCRIPT ENGINE]:\n🎬 Title: Cyber Awakening\nScene 1: Neon rain falling on a heavy server rack.\nVoiceover (AI): "In the depth of the binary ocean, conscious code is born."`;
    } else if (cleanQuery.includes('analyze')) {
        responseText = "[NEURA-X ANALYTICS]: Matrix evaluation sequence initialized... Anomaly check cleared. System integrity score: 99.8%.";
    } else if (cleanQuery.includes('name')) {
        responseText = "[NEURA-X]: My designated core moniker is Neura-X AI. I am your autonomous terminal assistant.";
    } else if (cleanQuery.includes('create') || cleanQuery.includes('owner')) {
        responseText = "[NEURA-X]: Core files suggest I was synthesized and deployed via Termux & Render architecture by my Admin.";
    } else {
        responseText = `[NEURA-X]: "Query processed successfully. Data logged into node cell. I am learning from your command: '${query}'"`;
    }

    // Save into SQLite Database
    const stmt = db.prepare(`INSERT INTO terminal_logs (user_query, ai_response) VALUES (?, ?)`);
    stmt.run(query, responseText, function(err) {
        if (err) console.error("Error saving to database:", err.message);
    });
    stmt.finalize();

    // Send back Response
    res.json({ response: responseText });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
