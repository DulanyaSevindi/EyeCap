const Quiz = require("../models/quizModel");

const mongoose = require("mongoose");

const createQuiz = async (req, res) => {
  const { name, description, questions } = req.body;
  try {
    const quiz = await Quiz.create({
      name,
      description,

      questions,
    });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getQuizdetails = async (req, res) => {
  const { name } = req.params;

  const quiz = await Quiz.findOne({ name: name });

  if (!quiz) {
    return res.status(404).json({ error: "No data found" });
  }

  res.status(200).json(quiz);
};

const updateQuizdetails = async (req, res) => {
  const { id } = req.params;

  await Quiz.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  const quiz = await Quiz.findOne({ _id: id });

  if (!quiz) {
    return res.status(400).json({ error: "No such quiz" });
  }

  res.status(200).json(quiz);
};

// delete user
const deleteQuizdetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such quiz" });
  }

  const quiz = await Quiz.findOneAndDelete({ _id: id });

  if (!quiz) {
    return res.status(400).json({ error: "No such quiz" });
  }

  res.status(200).json(quiz);
};

const getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({}).sort({ createdAt: -1 });

  if (!quizzes) {
    return res.status(404).json({ error: "No data found" });
  }

  res.status(200).json(quizzes);
};

module.exports = {
  createQuiz,
  getQuizdetails,
  updateQuizdetails,
  deleteQuizdetails,
  getAllQuizzes,
};
