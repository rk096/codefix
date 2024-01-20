const mongoose = require('mongoose')
const answerSchema = new mongoose.Schema({
    body: String,
    vote: Number,
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Object
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
});

module.exports = mongoose.model('Answer', answerSchema);
