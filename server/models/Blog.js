const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [],
    vote: Number,
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Object
    }
});

module.exports = mongoose.model('Blog', blogSchema);