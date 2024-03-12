const express = require("express");
const CommentModel = require('../models/Comment');
const passport = require("passport");
const UserModel = require('../models/User');

const router = express.Router();

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { body, question } = req.body;
            if (!body) {
                return res
                    .status(301)
                    .json({ err: "Insufficient details to create comment." });
            }

            const user = req.user._id;

            let commentDetails;
            if (question) {
                commentDetails = { body, question, user };
            } else {
                const { blog } = req.body;
                if (!blog) {
                    return res
                        .status(301)
                        .json({ err: "Insufficient details to create comment." });
                }
                commentDetails = { body, blog, user };
            }

            const createcomment = await CommentModel.create(commentDetails);
            return res.status(200).json(createcomment);
        } catch (error) {
            console.error("Error creating comment");
            return res.status(500).json({ error: "Error creating comment" });

        }
    }
);

router.get(
    "/que/:id",
    async (req, res) => {
        try {
            const { id } = req.params;
            const comments = await CommentModel.find({ question: id });
            let commentDetails = [];
            for (let element of comments) {
                let e1 = element.toObject();
                const user = await UserModel.findById(element.user);
                e1.name = user.username;
                e1.email = user.email;
                commentDetails.push(e1);
            }

            res.status(200).json({comments: commentDetails});
        }

        catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: "Error fetching comments" });
        };
    }
);


router.get(
    "/blg/:id",
    async (req, res) => {

            try {
                const { id } = req.params;
                const comments = await CommentModel.find({ blog: id });
                let commentDetails = [];
                for (let element of comments) {
                    let e1 = element.toObject();
                    const user = await UserModel.findById(element.user);
                    e1.name = user.username;
                    e1.email = user.email;
                    commentDetails.push(e1);
                }
    
                res.status(200).json({comments: commentDetails});
            }
    
            catch (error) {
                console.error("Error fetching comments:", error);
                res.status(500).json({ error: "Error fetching comments" });
            };
    }
)

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const deletedcmnt = await CommentModel.findByIdAndDelete(id, { new: true });
        return res.status(200).json(deletedcmnt);
    }catch(error){
        console.error("Error deleting comment");
        return res.status(500).json({ error: "Error deleting comment" });
    }
}
);

module.exports = router;