const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        res.json({ response: result.response.text() });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(port, () => console.log('Server is running on port ' + port));

