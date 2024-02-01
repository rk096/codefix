const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
});

module.exports = mongoose.model('Comment', commentSchema);