const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

// Ensure index.html is served for root
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Use the PORT provided by Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on port ' + PORT);
});
