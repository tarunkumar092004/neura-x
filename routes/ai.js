const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/chat', async (req, res) => {
    const { userId, prompt } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Coin system for Monetization
        if (user.coins <= 0 && !user.isPremium) {
            return res.status(403).json({ msg: "Insufficient coins! Please recharge or upgrade to Premium." });
        }

        // Demo response (Isme hum real Gemini API next step me link karenge)
        const aiResponse = `[Neura-X Premium AI]: Hello Bhai! Aapne poocha "${prompt}". Yeh premium version hai, kya help chahiye bolo?`;

        // Coin deduct karo agar free tier par hai
        if (!user.isPremium) {
            user.coins -= 1;
            await user.save();
        }

        res.json({ response: aiResponse, remainingCoins: user.coins });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
