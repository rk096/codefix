const express = require("express");
const passport = require("passport"); 
const QuestionModel = require("../models/Question");


// const {
//     getAllQuestions,
//     createQuestion,
//     getQuestionById,
//     updateQuestion,
//     deleteQuestion,
// } = require("../controllers/QuestionController");


const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { title, body, tags } = req.body;
        if (!title || !body || !tags) {
            return res
                .status(301)
                .json({ err: "Insufficient details to create question." });
        }
        const user = req.user._id;
        const questiondetails = { title, body, tags, user };
        const createquestion = await QuestionModel.create(questiondetails);
        return res.status(200).json(createquestion);
    }
);


router.get(
    "/",
    async (req, res) => {
        const data = await  QuestionModel.find();
        console.log(data);
        return res.status(200).json(data);
    }
);

router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params; 
        try {
            const data = await QuestionModel.findById(id); 
            console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching question:", error);
            return res.status(500).json({ error: "Error fetching question" });
        }
    }
);

router.post("/:id/upvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.vote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this question' });
        }

       
        question.vote.push(user);

        await question.save();
       // console.log("question updated : ", question);

        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// router.route("/").get(getAllQuestions).post(createQuestion);
// router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = router;