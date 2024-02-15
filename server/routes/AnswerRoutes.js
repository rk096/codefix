const express = require("express");
const passport = require("passport"); 
const AnswerModel = require("../models/Answer");

// const {
//     getAllAnswers,
//     createAnswer,
//     getAnswerById,
//     updateAnswer,
//     deleteAnswer,
// } = require("../controllers/AnswerController");

const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { body,question } = req.body;
        if (!body || !question) {
            return res
                .status(301)
                .json({ err: "Insufficient details to create answer." });
        }
        const user = req.user._id;
        const answerdetails = {body, question, user };
        const createanswer = await AnswerModel.create(answerdetails);
        return res.status(200).json(createanswer);
    }
);

router.get(
    "/",
    async (req, res) => {
        const data = await  AnswerModel.find();
        console.log(data);
        return res.status(200).json(data);
    }
);

router.get(
    "/",
    async(req,res) => {
        const {questioId} = req.query();
        Answer.find({ questionId: questionId })
    .then(answers => {
        res.json({ answers });
    })
    .catch(error => {
        console.error("Error fetching answers:", error);
        res.status(500).json({ error: "Error fetching answers" });
    });
    }
)

// router.route("/").get(getAllAnswers).post(createAnswer);
// router.route("/:id").get(getAnswerById).put(updateAnswer).delete(deleteAnswer);

module.exports = router;