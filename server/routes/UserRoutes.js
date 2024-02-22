const express = require("express");
const passport = require("passport"); 
const UserModel = require("../models/User");
// const {
//     getAllUsers,
//     createUser,
//     getUserById,
//     updateUser,
//     deleteUser,
// } = require("../controllers/UserController");

const router = express.Router();

router.get(
    "/:id",
    async (req, res) => {
        try {
        const {id} = req.params;
        const data = await  UserModel.findById(id);
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching user by id");
            res.status(500).json({ error: "Error fetching user" });
        
        }
    }
);

router.get(
    "/",
    async (req, res) => {
        try {
        const data = await  UserModel.find();
        return res.status(200).json(data);
        }catch(error){
            console.error("Error fetching user");
            res.status(500).json({ error: "Error fetching user" });
        }
    }
);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

