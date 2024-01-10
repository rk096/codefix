const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name : {
        type:String,
        required : true
    },

    email : {
        type: String,
        required:true
    },

    password : {
        type: String,
        required:true
    },

    about : {
        type: String,
    }

})

export default mongoose.model("User", userSchema);