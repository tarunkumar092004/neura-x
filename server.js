const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const dbURI = 'mongodb+srv://tarunkumar892804:Sontra143%40%40%40@neuraxcluster.xyfaw58.mongodb.net/?appName=NeuraXCluster';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('Database error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));
