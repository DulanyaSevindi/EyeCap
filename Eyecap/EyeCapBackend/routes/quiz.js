const express = require("express");

// controller functions
const {
  getQuizdetails,
  updateQuizdetails,
  deleteQuizdetails,
  createQuiz,
  getAllQuizzes,
} = require("../controllers/quizController");

const router = express.Router();

router.post("/", createQuiz);

router.get("/", getAllQuizzes);

router.get("/:name", getQuizdetails);

router.patch("/:id", updateQuizdetails);

router.delete("/:id", deleteQuizdetails);

module.exports = router;
