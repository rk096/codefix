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
        try {
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
    }catch(error){
        console.error("Error creating blog");
        return res.status(500).json({ error: "Error creating blog" });
    }
}
);

router.get(
    "/",
    async (req, res) => {
        try{
        const data = await  BlogModel.find();
        return res.status(200).json(data);
        }catch{
            console.error("Error fetching blog:");
            res.status(500).json({ error: "Error fetching blog" });
        }
    }
);

router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params; 
        try {
            const data = await BlogModel.findById(id); 
            console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching blog:", error);
            return res.status(500).json({ error: "Error fetching blog" });
        }
    }
);
// router.route("/").get(getAllBlogs).post(createBlog);
// router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;