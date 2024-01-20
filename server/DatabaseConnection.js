const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const url = <your mongo db uri>

module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("Database connection successful!"))
    .catch((err) => console.log("Error : ", err))
}
