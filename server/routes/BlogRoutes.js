const express = require("express");
const passport = require("passport"); 

// const {
//     getAllBlogs,
//     createBlog,
//     getBlogById,
//     updateBlog,
//     deleteBlog,
// } = require("../controllers/BlogController");

const router = express.Router();
const BlogModel = require('../models/Blog');

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { title, body, tags } = req.body;
        if (!title || !body || !tags) {
            return res
                .status(301)
                .json({ err: "Insufficient details to create blog." });
        }
        const user = req.user._id;
        const blogdetails = { title, body, tags, user };
        const createblog = await BlogModel.create(blogdetails);
        return res.status(200).json(createblog);
    }
);

router.get(
    "/",
    async (req, res) => {
        const data = await  BlogModel.find();
        return res.status(200).json(data);
    }
);

// router.route("/").get(getAllBlogs).post(createBlog);
// router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;