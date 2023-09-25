const express = require("express");
const { USERS, USER_ROLES } = require("../items");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    data: USERS.map((item) => {
      delete item.password;
      return item;
    }),
  });
});

module.exports = router;
