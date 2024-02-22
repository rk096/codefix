const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();

const url = "mongodb+srv://richakamani32:23112003@codehub.j7wwepp.mongodb.net/?retryWrites=true&w=majority"

module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("Database connection successful!"))
    .catch((err) => console.log("Error : ", err))
}
