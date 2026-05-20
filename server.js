const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/ai', require('./routes/ai'));

app.listen(3000, () => console.log('Server running'));
