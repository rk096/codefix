const express = require("express");
const passport = require("passport"); 
const UserModel = require("../models/User");
const BlogModel = require("../models/Blog");
const CommentModel = require("../models/Comment");
const AnswerModel = require("../models/Answer");
const QuestionModel = require("../models/Question");
// const {
//     getAllUsers,
//     createUser,
//     getUserById,
//     updateUser,
//     deleteUser,
// } = require("../controllers/UserController");

const router = express.Router();

router.get(
    "/id/:id",
    async (req, res) => {
        try {
        const {id} = req.params;
        const data = await UserModel.findById(id);
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching user by id");
            res.status(500).json({ error: "Error fetching user" });
        
        }
    }
);

router.get(
    "/email/:email",
    async (req, res) => {
        try {
        const {email} = req.params;
        const data = await UserModel.findOne({email: email});
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching user by email");
            res.status(500).json({ error: "Error fetching user" });
        
        }
    }
);

router.get(
    "/",
    async (req, res) => {
        try {
        const data = await  UserModel.find();
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching user");
            res.status(500).json({ error: "Error fetching user" });
        }
    }
);

router.put(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const { username, password, bio } = req.body;
        const updatedusr = await UserModel.findByIdAndUpdate(id, {username: username, password: password, bio: bio}, { new: true });
        return res.status(200).json(updatedusr);
    }catch(error){
        console.error("Error updating user");
        return res.status(500).json({ error: "Error updating user" });
    }
}
);

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const deletedusr = await UserModel.findByIdAndDelete(id, { new: true });
        await BlogModel.deleteMany({ user: id });
        await QuestionModel.deleteMany({ user: id });
        await AnswerModel.deleteMany({ user: id });
        await CommentModel.deleteMany({ user: id });
        return res.status(200).json(deletedusr);
    }catch(error){
        console.error("Error deleting user");
        return res.status(500).json({ error: "Error deleting user" });
    }
}
);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

