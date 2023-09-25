const express = require("express");
const { STUDENTS } = require("../items");
const { protect } = require("../middleware");
const router = express.Router();

router.get("/", protect, (req, res) => {
  return res.json({ status: "success", data: STUDENTS });
});

router.post("/", (req, res) => {
  const newStudent = { id: STUDENTS.length + 1, ...req.body };
  STUDENTS.push(newStudent);
  return res.json({ status: "success", data: newStudent });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const indexId = STUDENTS.map((item) => item.id).indexOf(+id);
  if (indexId === -1) {
    return res
      .status(404)
      .json({ status: "failed", message: "data not found" });
  }

  STUDENTS[indexId] = { id: +id, ...req.body };

  return res.json({
    status: "success",
    data: req.body,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const indexId = STUDENTS.map((item) => item.id).indexOf(+id);
  if (indexId === -1) {
    return res
      .status(404)
      .json({ status: "failed", message: "data not found" });
  }

  STUDENTS.splice(indexId, 1);

  return res.json({
    status: "success",
    message: "student is removed",
  });
});

module.exports = router;
