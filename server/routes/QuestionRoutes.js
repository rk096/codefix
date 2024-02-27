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
        try {
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
    }catch(error){
        console.error("Error creating question");
        return res.status(500).json({ error: "Error creating question" });
    }
}
);


router.get(
    "/",
    async (req, res) => {
        try {
        const data = await  QuestionModel.find();
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching question");
            res.status(500).json({ error: "Error fetching question" });
        }
    }
);

router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params; 
        try {
            const data = await QuestionModel.findById(id); 
            console.log("data",data);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching question");
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

        if (question.upvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this question', exist:"user" });
        }
        question.upvote.push(user);
        await question.save();
       // console.log("question updated : ", question);

        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error("error in question upvote");
        res.status(500).send('Server Error');
    }
});

router.get("/:id/getvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;
        //console.log("getvote");
        if (question.upvote.includes(user) || question.downvote.includes(user)) {
            return res.json({  msg: 'User already voted', exist:"user" });
        }else{
            //console.log("enter");
            return res.json({msg:'user can proceed'});
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post("/:id/downvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.downvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this question', exist:"user" });
        }
        question.downvote.push(user);
        await question.save();
       console.log("question updated : ", question);

        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get("/:id/getvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;
        //console.log("getvote");
        if (question.upvote.includes(user) || question.downvote.includes(user)) {
            return res.json({  msg: 'User already voted', exist:"user" });
        }else{
            //console.log("enter");
            return res.json({msg:'user can proceed'});
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post("/:id/downvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.downvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this question', exist:"user" });
        }
        question.downvote.push(user);
        await question.save();
       console.log("question updated : ", question);

        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get("/:id/getvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;
        //console.log("getvote");
        if (question.upvote.includes(user) || question.downvote.includes(user)) {
            return res.json({  msg: 'User already voted', exist:"user" });
        }else{
            //console.log("enter");
            return res.json({msg:'user can proceed'});
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post("/:id/downvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.downvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this question', exist:"user" });
        }
        question.downvote.push(user);
        await question.save();
       console.log("question updated : ", question);

        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// router.route("/").get(getAllQuestions).post(createQuestion);
// router.route("/:id").get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = router;