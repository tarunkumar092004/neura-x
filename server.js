const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);

const dbURI = 'mongodb+srv://tarunkumar0920004:Sontra143404040@neuraxcluster.xyfaw58.mongodb.net/?appName=NeuraXCluster';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('Database error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
