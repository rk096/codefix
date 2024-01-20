const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [],
    created_at: {
        type: Date,
        default: Date.now()
    },
    vote: Number,
    user: {
        type: Object
    }
});

module.exports = mongoose.model('Question', questionSchema);