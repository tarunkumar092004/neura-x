const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(cors());

// Ye line static files (index.html) serve karegi
app.use(express.static(path.join(__dirname)));

app.use('/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const dbURI = 'mongodb+srv://tarunkumar0920004:Sontra143404040@neuraxcluster.xyfaw58.mongodb.net/?appName=NeuraXCluster';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('Database error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
