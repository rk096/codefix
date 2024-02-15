const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require('../models/User');
const { getToken } = require("../utils/helpers");

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existinguser = await Users.findOne({ email:email });
        if (existinguser) {
            return res.status(404).json({ message: "User already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await Users.create({ username, email, password: hashPassword });
        const token = await getToken(email, newUser);
        const userToReturn = { ...newUser.toJSON(), token };
        //console.log(userToReturn);
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    } catch (error) {
        res.status(500).json("Something went wrong....");
    }
}

const login = async (req, res) => {
 
    const {email, password} = req.body;

    // Check if a user with the given email exists. If not, the credentials are invalid.
    const user = await Users.findOne({email: email});
    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

   // console.log(user);

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }

   
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
}

module.exports = { login, signup };
