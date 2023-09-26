const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { USERS, SECRET_KEY } = require("../items");

router.post("/register", (req, res) => {
  const password = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = {
    id: USERS.length + 1,
    ...req.body,
    password: hashPassword,
  };

  USERS.push({ ...newUser });
  delete newUser.password;

  return res.json({ status: "success", data: newUser });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = USERS.filter((item) => item.username === username);
  if (!users.length) {
    return res
      .status(401)
      .json({ status: "failed", message: "Invalid username or password" });
  }

  const user = users[0];
  const savedPassword = user.password;
  const isMatch = bcrypt.compareSync(password, savedPassword);
  if (!isMatch) {
    return res
      .status(401)
      .json({ status: "failed", message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY);
  const data = { ...user };
  delete data.password;
  data.token = token;

  return res.json({
    status: "success",
    data,
  });
});

module.exports = router;
