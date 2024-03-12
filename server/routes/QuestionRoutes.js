const express = require("express");
const passport = require("passport"); 
const QuestionModel = require("../models/Question");
const CommentModel = require("../models/Comment");
const AnswerModel = require("../models/Answer");

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

router.put(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const { title, body, tags } = req.body;
        const updatedques = await QuestionModel.findByIdAndUpdate(id, {title: title, body: body, tags: tags}, { new: true });
        return res.status(200).json(updatedques);
    }catch(error){
        console.error("Error updating question");
        return res.status(500).json({ error: "Error updating question" });
    }
}
);

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const deletedques = await QuestionModel.findByIdAndDelete(id, { new: true });
        await CommentModel.deleteMany({ question: id });
        await AnswerModel.deleteMany({ question: id });
        return res.status(200).json(deletedques);
    }catch(error){
        console.error("Error deleting question");
        return res.status(500).json({ error: "Error deleting question" });
    }
}
);

router.get(
    "/",
    async (req, res) => {
        try {
        const queDetails = await QuestionModel.find();
        let data = [];
        for (let element of queDetails) {
            let e1 = element.toObject();
            const ans = await AnswerModel.find({question: e1._id});
            e1.answer_length = ans.length;
            data.push(e1);
        }
        return res.status(200).json(data);
        }catch(error){
            console.error("error fetching question");
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

router.post("/upvote/:id", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.upvote.includes(user) && question.downvote.includes(user)) {
            question.upvote.pull(user);
            question.downvote.pull(user);
        }
        else if(question.upvote.includes(user)) {
            question.upvote.pull(user);
        }
        else if(question.downvote.includes(user)) {
            question.downvote.pull(user);
            question.upvote.push(user);
        }
        else {
            question.upvote.push(user);
        }

        await question.save();
        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error("error in question upvote");
        res.status(500).send('Server Error');
    }
});

router.get("/getvote/:id", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;
        if (question.upvote.includes(user) && question.downvote.includes(user)) {
            return res.json({  msg: 'User already voted', exist:"user" });
        }else{
            return res.json({msg:'user can proceed'});
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post("/downvote/:id", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const question = await QuestionModel.findById(id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }
        const user = req.user._id;

        if (question.upvote.includes(user) && question.downvote.includes(user)) {
            question.upvote.pull(user);
            question.downvote.pull(user);
        }
        else if(question.upvote.includes(user)) {
            question.upvote.pull(user);
            question.downvote.push(user);
        }
        else if(question.downvote.includes(user)) {
            question.downvote.pull(user);
        }
        else {
            question.downvote.push(user);
        }
        
        await question.save();
        res.json({  msg: 'Question upvoted successfully', question: question });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get all questions of a user with ':id'
router.get(
    "/owner/:id",
    async(req,res) => {
    try{
        const {id} = req.params;
        const answers =  await QuestionModel.find({ user: id });

        res.status(200).json(answers);
    }
    catch(error){
        console.error("Error fetching answers by user id");
        res.status(500).json({ error: "Error fetching answers by user id" });
    };
});

module.exports = router;