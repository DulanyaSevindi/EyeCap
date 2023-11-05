const express = require("express");

// controller functions
const {
  createUserQuiz,
  getAllUserQuizzes,
  getUserQuizdetails,
  deleteUserQuizdetails,
} = require("../controllers/userQuizController");

const router = express.Router();

router.post("/create", createUserQuiz);

router.get("/all", getAllUserQuizzes);

router.post("/", getUserQuizdetails);

router.delete("/", deleteUserQuizdetails);

module.exports = router;
