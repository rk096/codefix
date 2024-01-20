const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    bio: String,
    links: [
        {type: String}
    ],
    profilepic: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

module.exports =  mongoose.model('User', userSchema);
