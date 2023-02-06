const express =  require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User, validateUser} = require("../model/users.model");



router.post("/", async (req, res) => {
    let result ={};
    const { error } = validateUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const { username, password, firstname, lastname, phone, email } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        result = {
            status:409,
            data:null,
            message:"User is alreay registered!"
        }
        return res.status(200).send(result);
    }

    user = new User({ username, password, firstname, lastname, phone, email });

    user.id = Math.floor(Math.random() * 10000000000);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    try {
        await user.save();

        delete user.password;
        result = {
            data :user,
            status:201,
            message:"User created successfully!"
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        result = {
            data:error,
            status:422,
            message:"Something Went Wrong!"
        }
    }
})

module.exports = router;