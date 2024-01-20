const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    bio: String,
    links: [
        {link: String}
    ],
    profilepic: String,
    questions: [
        {question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    }
    ],
    answers: [
        {answer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    }
    ],
    blogs: [
        {blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    }
    ]
})

module.exports =  mongoose.model('User', userSchema);