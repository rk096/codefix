const express = require("express");

const {
    getAllQuestions,
    createQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/QuestionController");

const router = express.Router();

router.route("/").get(getAllQuestions).post(createQuestion);
router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = router;