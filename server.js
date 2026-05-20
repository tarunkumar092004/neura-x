const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Public folder ki jagah current directory se files serve karo
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
