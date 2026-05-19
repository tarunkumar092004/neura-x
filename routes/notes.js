const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const newNote = new Note({ userId: req.user.userId, text: req.body.text });
    await newNote.save();
    res.json({ message: 'Note saved!' });
});

router.get('/', auth, async (req, res) => {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
});

module.exports = router;
