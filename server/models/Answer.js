const mongoose = require('mongoose')
const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }
});

module.exports = mongoose.model('Answer', answerSchema);