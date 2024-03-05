const express = require("express");
const CommentModel = require('../models/Comment');
const passport = require("passport");
const UserModel = require('../models/User');

// const {
//     getAllComments,
//     createComment,
//     getCommentById,
//     updateComment,
//     deleteComment,
// } = require("../controllers/CommentController");

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

// router.get(
//     "/que/:id",
//     async(req,res) => {
//     try{
//         const {id} = req.params;
//       const comments =  CommentModel.find({ question: id });

//         console.log("comments",comments);
//         let commentdetails=[];
//         // for(element of comments){
//         //     let e1  = element.toObject();
//         //     const id = element.user;
//         //     const user = await UserModel.findById(id);
//         //     e1.name = user.username;
//         //     commentdetails.push(e1);
//         // }
//         res.json({ comments });
//     }
//     catch(error) {
//         console.error("Error fetching comments:", error);
//         res.status(500).json({ error: "Error fetching comments" });
//     };
//     }
// )

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

// router.get(
//     "/",
//     async(req,res) => {
//         const {questioId} = req.query();
//         Answer.find({ questionId: questionId })
//     .then(answers => {
//         res.json({ answers });
//     })
//     .catch(error => {
//         console.error("Error fetching answers:", error);
//         res.status(500).json({ error: "Error fetching answers" });
//     });
//     }
// )

// router.route("/").get(getAllComments).post(createComment);
// router.route("/:id").get(getCommentById).put(updateComment).delete(deleteComment);

module.exports = router;