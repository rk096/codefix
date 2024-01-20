const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    body: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: Object
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