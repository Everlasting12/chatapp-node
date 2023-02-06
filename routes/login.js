const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../model/users.model");

router.post("/", async (req, res) => {
  let result = {};
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    result = {
      status: 404,
      data: null,
      token: null,
      message: "User not registered!",
    };
    return res.status(200).send(result);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    result = {
      status: 404,
      data: null,
      token: null,
      message: "Invalid Username or Password!",
    };
    return res.status(200).send(result);
  }
  const token = user.getAuthToken();
  const userData = {
    _id: user._id,
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
    user_tags: user.user_tags,
    __v: user.__v,
  };
  result = {
    token,
    data: userData,
    status: 200,
    message: "Login successful!",
  };
  return res.status(200).send(result);
});

function validate(data) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(data);
}
module.exports = router;
