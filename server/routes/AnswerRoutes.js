const express = require("express");
const passport = require("passport"); 
const AnswerModel = require("../models/Answer");
const UserModel = require("../models/User");


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
    "/xyz/:id",
    async(req,res) => {
    try{
        const {id} = req.params;
    const answers =  await AnswerModel.find({ question: id });
    
        console.log(answers);
        let answerdetails=[];
        for(let element of answers){
            let e1 = element.toObject();
            const id = element.user;
            const user = await UserModel.findById(id);
            e1.name = user.username;
            answerdetails.push(e1);
        }

        res.json({ answers:answerdetails });
    }
    catch(error){
        console.error("Error fetching answers:", error);
        res.status(500).json({ error: "Error fetching answers" });
    };
});
    
// router.route("/").get(getAllAnswers).post(createAnswer);
// router.route("/:id").get(getAnswerById).put(updateAnswer).delete(deleteAnswer);

module.exports = router;