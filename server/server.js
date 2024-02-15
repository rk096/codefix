const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const Users = require('./models/User.js');



const db = require("./DatabaseConnection.js");
const authRouter = require("./routes/AuthRoutes.js");
const questionRouter = require("./routes/QuestionRoutes.js");
const userRouter = require("./routes/UserRoutes.js");
const answerRouter = require("./routes/AnswerRoutes.js");
const commentRouter = require("./routes/CommentRoutes.js");
const blogRouter = require("./routes/BlogRoutes.js");

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

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await Users.findOne({ _id: jwt_payload.identifier });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (err) {
            return done(err, false);
        }
    })
);



// API
app.use('/auth/', authRouter);
app.use("/codehub/question", questionRouter);
app.use("/codehub/user", userRouter);
app.use("/codehub/comment", commentRouter);
app.use("/codehub/blog", blogRouter);
app.use("/codehub/answer", answerRouter);

// Static resources
// app.use('/upload', express.static(path.join(__dirname, '/../uploads')))
// app.use(express.static(path.join(__dirname, '/../client/build')))

// app.get('*', (req, res) => {
//     try {
//         res.sendFile(path.join(`${__dirname}/..client/build/index.html`))
//     } catch (e) {
//         res.send('Oops ! an error occured')
//     }
// })


// Cors
app.use(cors())

app.get('/', (req,res)=>{
    res.send("welcome to code hub");
})


// Server listens
app.listen(PORT, () => {
    console.log(`CODE HUB is running on PORT number : ${PORT}`)
})