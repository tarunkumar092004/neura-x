const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

// Security and JSON parser
app.use(helmet());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// HOME URL par pehle Login/Signup page (index.html) khulega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// DASHBOARD URL ke liye alag se route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Backend API Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

app.listen(3000, () => console.log('Server running on port 3000'));
