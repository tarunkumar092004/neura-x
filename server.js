const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Routes - make sure these files exist in your routes folder
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

// Serve static files
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
