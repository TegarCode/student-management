const express = require("express");
const router = express.Router();
const { USERS, SECRET_KEY } = require("../items");

router.post("/register", (req, res) => {
  const newUser = {
    id: USERS.length + 1,
    ...req.body,
  };

  USERS.push(newUser);
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
  return res.json({
    status: "success",
    data: user,
  });
});

module.exports = router;
