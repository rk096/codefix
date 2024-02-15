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
        const {id} = req.params;
        const data = await  UserModel.findById(id);
        console.log(data);
        return res.status(200).json(data);
    }
);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

