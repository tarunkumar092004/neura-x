const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json());

// Baaki tumhara code yahan rahega...
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
