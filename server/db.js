const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const url = "mongodb+srv://dhruvink79:xe0oUEM4cNBUp7rG@dev-cluster.eg0e1f8.mongodb.net/codehub?retryWrites=true&w=majority";

module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("Database connection successful!"))
    .catch((err) => console.log("Error : ", err))
}