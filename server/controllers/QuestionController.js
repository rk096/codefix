const questionService = require("../services/QuestionService");

exports.getAllQuestions = async(req, res) => {
    try {
        const question = await questionService.getAllQuestions();
        res.json({ data: question, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createQuestion = async(req, res) => {
    try {
        const question = await questionService.createQuestion(req.body);
        res.json({ data: question, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuestionById = async(req, res) => {
    try {
        const question = await questionService.getQuestionById(req.params.id);
        res.json({ data: question, status: "success" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateQuestion = async(req, res) => {
    try {
        const question = await questionService.updateQuestion(req.params.id, req.body);
        res.json({ data: question, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteQuestion = async(req, res) => {
    try {
        const question = await questionService.deleteQuestion(req.params.id);
        res.json({ data:question, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};