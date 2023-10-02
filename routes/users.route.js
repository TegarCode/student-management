const express = require("express");
const { USERS, USER_ROLES, STUDENTS } = require("../items");
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

router.put("/invite", protect, (req, res) => {
  // Mendapatkan data dari body permintaan
  const invite = req.body;

  // Mendapatkan pengguna yang sedang login dari middleware protect
  const loggedInUser = req.user;

  console.log(loggedInUser);

  // Mengecek apakah pengguna yang sedang login memiliki izin
  // untuk menginvite user lain ke student dengan id tertentu
  if (loggedInUser.id === invite.student_id ) {
    // Jika pengguna memiliki izin, tambahkan data ke STUDENT
    // dan objek users_role
    const newdata = {
      user_id: invite.user_id,
      role: invite.role,
    };
    // Misalnya, tambahkan data ke STUDENT dengan id 1:
    STUDENTS[0].users_role.push({ newdata });

    // Kemudian kirim respons yang sesuai
    return res.json({ STUDENTS });
  } else {
    // Jika pengguna tidak memiliki izin, kirim pesan error dengan status code 403
    return res.status(403).json({ message: "Access denied" });
  }
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
