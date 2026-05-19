const express = require('express');
const helmet = require('helmet');
const path = require('path');
const app = express();

app.use(helmet());
app.use(express.json());

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

app.listen(3000, () => console.log('Server running on port 3000'));
