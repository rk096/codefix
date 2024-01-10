const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import Users from '../models/user,js';

export const signup = async(req,res)=>{
    const{ name, email, password} = req.body;
    try{
        const existinguser = await Users.findOne({email});
        if(existinguser){
            return res.status(404).json({message:"User already exist."})
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = await Users.create({name, email ,password:hashPassword});
        const token = jwt.sign({email:newUser.email, id:newUser.id}, "test", {expiersIn : '1h'});
        res.status(200).json({ result: newUser, token})
    }
    catch(error){
        res.status(500).json("Something went wrong....");
    }
}

export const login = async(req,res)=>{
    const{ email, password} = req.body;
    
    try{
        const existinguser = await Users.findOne({email});
        if(!existinguser){
            return res.status(404).json({message:"User doesn't already exist."})
        }

        const isPassword = await bcrypt.compare(password, existinguser.password);

        if(!isPassword){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.signup({ email:existinguser.email, id:existinguser.id}, "test", {expiresIn:'1h'});
        res.status(200).json({result: existinguser, token});


    }
    catch(error){
        res.status(500).json("Something went wrong....");
    }
}