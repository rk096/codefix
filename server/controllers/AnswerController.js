const jwt = require('jsonwebtoken');
const answerService = require("../services/AnswerService");

// Middleware function to decrypt JWT token and extract object and ID
const decryptToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        req.userId = decoded.id;
        req.object = decoded.object; // Assuming your token contains the object
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

exports.getAllAnswers = async(req, res) => {
    try {
        const answer = await answerService.getAllAnswers();
        res.json({ data: answer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAnswer = async(req, res) => {
    try {
        const answer = await answerService.createAnswer(req.body);
        res.json({ data: answer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAnswerById = async(req, res) => {
    try {
        const answer = await answerService.getAnswerById(req.params.id);
        res.json({ data: answer, status: "success" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateAnswer = async(req, res) => {
    try {
        const answer = await answerService.updateAnswer(req.params.id, req.body);
        res.json({ data: answer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAnswer = async(req, res) => {
    try {
        const answer = await answerService.deleteAnswer(req.params.id);
        res.json({ data:answer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Apply middleware to the relevant routes
exports.createAnswer = [decryptToken, exports.createAnswer];
exports.updateAnswer = [decryptToken, exports.updateAnswer];
exports.deleteAnswer = [decryptToken, exports.deleteAnswer];