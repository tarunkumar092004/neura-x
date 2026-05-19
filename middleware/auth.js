const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey123';

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) { res.status(400).json({ error: 'Invalid token' }); }
};
