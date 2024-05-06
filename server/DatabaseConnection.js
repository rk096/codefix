const mongoose = require('mongoose');
require('dotenv').config();



const url = "mongodb+srv://richakamani32:23112003@codehub.j7wwepp.mongodb.net/?retryWrites=true&w=majority"


// const url = process.env.MONGO_URI;
module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("Database connection successful!"))
    .catch((err) => console.log("Error : ", err))
}