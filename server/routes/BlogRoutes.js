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
const CommentModel = require('../models/Comment');

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

router.put(
    "/update/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const { title, body, tags } = req.body;
        console.log("req : ", req.body);
        const updatedblg = await BlogModel.findByIdAndUpdate(id, {title: title, body: body, tags: tags}, { new: true });
        return res.status(200).json(updatedblg);
    }catch(error){
        console.error("Error updating blog");
        return res.status(500).json({ error: "Error updating blog" });
    }
}
);

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
        const { id } = req.params;
        const deletedblg = await BlogModel.findByIdAndDelete(id, { new: true });
        await CommentModel.deleteMany({ blog: id });
        return res.status(200).json(deletedblg);
    }catch(error){
        console.error("Error deleting blog");
        return res.status(500).json({ error: "Error deleting blog" });
    }
}
);

router.get(
    "/",
    async (req, res) => {
        try{
        const data = await BlogModel.find();
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

router.post("/upvote/:id", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;

        if (blog.upvote.includes(user) && blog.downvote.includes(user)) {
            blog.upvote.pull(user);
            blog.downvote.pull(user);
        }
        else if(blog.downvote.includes(user)) {
            blog.downvote.pull(user);
            blog.upvote.push(user);
        }
        else if(blog.upvote.includes(user)) {
            blog.upvote.pull(user);
        }
        else {
            blog.upvote.push(user);
        }

        await blog.save();
        res.json({  msg: 'blog upvoted successfully', blog: blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get("/getvote/:id", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;
        if (blog.upvote.includes(user) && blog.downvote.includes(user)) {
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
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;

        if (blog.upvote.includes(user) && blog.downvote.includes(user)) {
            blog.upvote.pull(user);
            blog.downvote.pull(user);
        }
        else if(blog.upvote.includes(user)) {
            blog.upvote.pull(user);
            blog.downvote.push(user);
        }
        else if(blog.downvote.includes(user)) {
            blog.downvote.pull(user);
        }
        else {
            blog.downvote.push(user);
        }
        
        await blog.save();
        res.json({  msg: 'blog downvoted successfully', blog: blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get all blogs of a user with ':id'
router.get(
    "/owner/:id",
    async(req,res) => {
    try{
        const {id} = req.params;
        const answers =  await BlogModel.find({ user: id });

        res.status(200).json(answers);
    }
    catch(error){
        console.error("Error fetching blogs by user id");
        res.status(500).json({ error: "Error fetching blogs by user id" });
    };
});


// router.route("/").get(getAllBlogs).post(createBlog);
// router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;