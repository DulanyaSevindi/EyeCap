const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userQuizData = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    score: {
      type: Number,

      required: true,
    },
  },

  { _id: false }
);

const userQuizSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: true,
  },
  quizdata: [userQuizData],
});

module.exports = mongoose.model("UserQuiz", userQuizSchema);
