const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,

      required: true,
    },

    options: [
      {
        type: String,

        required: true,
      },
    ],

    answer: {
      type: Number,

      required: true,
    },
    image: {
      type: String,

      required: false,
    },
  },

  { _id: false }
);

const quizSchema = new Schema(
  {
    name: {
      type: String,

      required: true,
    },

    description: {
      type: String,

      required: true,
    },

    image: {
      type: String,

      required: false,
    },

    questions: [questionSchema],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
