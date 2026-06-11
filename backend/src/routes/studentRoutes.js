const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  transferStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

router.post("/", createStudent);

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.put("/:id/transfer", transferStudent);

router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);

module.exports = router;
