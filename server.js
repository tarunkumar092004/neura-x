const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Routes (Make sure these files exist)
try {
  app.use('/auth', require('./routes/auth'));
  app.use('/notes', require('./routes/notes'));
  app.use('/ai', require('./routes/ai'));
} catch (e) {
  console.error("Error loading routes:", e);
}

// Serve static files from the root directory
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
