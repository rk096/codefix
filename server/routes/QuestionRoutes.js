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




// router.route("/").get(getAllQuestions).post(createQuestion);
// router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = router;