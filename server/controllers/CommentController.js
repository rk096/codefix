const commentService = require("../services/CommentService");

exports.getAllComments = async(req, res) => {
    try {
        const comment = await commentService.getAllComments();
        res.json({ data: comment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createComment = async(req, res) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.json({ data: comment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCommentById = async(req, res) => {
    try {
        const comment = await commentService.getCommentById(req.params.id);
        res.json({ data: comment, status: "success" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.updateComment = async(req, res) => {
    try {
        const comment = await commentService.updateComment(req.params.id, req.body);
        res.json({ data: comment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteComment = async(req, res) => {
    try {
        const comment = await commentService.deleteComment(req.params.id);
        res.json({ data:comment, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};