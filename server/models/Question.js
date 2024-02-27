const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: [],
    created_at: {
        type: Date,
        default: Date.now()
    },
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    downvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);