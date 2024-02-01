const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const url = <MONGO_DB_CONNECT>

module.exports.connect = () => {
    mongoose.connect(url)
    .then((res) => console.log("Database connection successful!"))
    .catch((err) => console.log("Error : ", err))
}
