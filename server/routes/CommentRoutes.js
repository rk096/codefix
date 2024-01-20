const express = require("express");

const {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
} = require("../controllers/CommentController");

const router = express.Router();

router.route("/").get(getAllComments).post(createComment);
router.route("/:id").get(getCommentById).put(updateComment).delete(deleteComment);

module.exports = router;