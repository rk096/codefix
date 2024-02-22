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
        try {
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
    catch(error){  
        console.error("Error creating answer");
        return res.status(500).json({ error: "Error creating answer" });
    }
    }
);

router.get(
    "/",
    async (req, res) => {
        try {
        const data = await  AnswerModel.find();
        return res.status(200).json(data);
        }
        catch(error){
            console.error("Error fetching answer:");
            res.status(500).json({ error: "Error fetching answer" });
        }
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
        console.error("Error fetching answers:");
        res.status(500).json({ error: "Error fetching answers" });
    };
});


// router.route("/").get(getAllAnswers).post(createAnswer);
// router.route("/:id").get(getAnswerById).put(updateAnswer).delete(deleteAnswer);

module.exports = router;