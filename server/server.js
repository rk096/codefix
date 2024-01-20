const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const path = require("path")

const db = require("./db.js")
const questionRouter = require("./routes/QuestionRoutes");
const userRouter = require("./routes/UserRoutes");
const answerRouter = require("./routes/AnswerRoutes");
const commentRouter = require("./routes/CommentRoutes");
const blogRouter = require("./routes/BlogRoutes");

const PORT = process.env.PORT || 80

// DB connection
db.connect();


// Middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended : true, limit: "50mb"}))
app.use(express.json())


// Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})


// API
app.use("/codehub/question", questionRouter);
app.use("/codehub/user", userRouter);
app.use("/codehub/comment", commentRouter);
app.use("/codehub/blog", blogRouter);
app.use("/codehub/answer", answerRouter);

// Static resources
app.use('/upload', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../client/build')))

app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/..client/build/index.html`))
    } catch (e) {
        res.send('Oops ! an error occured')
    }
})


// Cors
app.use(cors())


// Server listens
app.listen(PORT, () => {
    console.log(`CODE HUB is running on PORT number : ${PORT}`)
})