const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Tumhari HTML files isi folder mein hain, toh unhe allow karo
app.use(express.static(__dirname)); 

// Routes load karo
app.use('/auth', require('./routes/auth'));

// Jab koi main site khole toh index.html bhejo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Jab login ho jaye toh dashboard.html bhejo
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
