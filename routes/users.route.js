const express = require("express");
const { USERS, USER_ROLES } = require("../items");
const { protect } = require("../middleware");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    data: USERS.map((item) => {
      // delete item.password;
      return item;
    }),
  });
});

router.get("/:id", protect, (req, res) => {
  const id = req.params.id;
  const loggedInUser = req.user;

  const user = USERS.filter((item) => item.id === +id)[0];
  if (user.id !== +loggedInUser.id) {
    delete user.username;
    delete user.password;
  }

  return res.json({
    data: user,
  });
});

module.exports = router;
