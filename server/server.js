const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

import UserRoutes from './routes/Users.js';

const app = express();
const PORT = 8080;

// console.log(process.env);

// DB connection
const CONNECTION_URL = "mongodb+srv://richakamani32:23112003@codehub.j7wwepp.mongodb.net/?retryWrites=true&w=majority";
//console.log('Connection URL:', process.env.URL);

//const CONNECTION_URL = process.env.URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`server running on port ${PORT}`);
  })
  .catch((error) => console.log(error.message));


// Middleware
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended : true, limit: "50mb"}))

app.use(express.json());

// Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})


// API



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
    res.send("this is a code hub");
})

app.use('/user', UserRoutes);

// Server listens
app.listen(PORT, () => {
    console.log(`CODE HUB is running on PORT number : ${PORT}`)
})