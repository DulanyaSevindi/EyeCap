const UserQuiz = require("../models/userQuizModel");

const mongoose = require("mongoose");

const createUserQuiz = async (req, res) => {
  const { user, quizdata } = req.body;

  const quizdataArray = Array.isArray(quizdata) ? quizdata : [quizdata];

  try {
    const existingUserQuiz = await UserQuiz.findOne({ user });

    if (existingUserQuiz) {
      const uniqueQuizdata = [];
      for (const newItem of quizdataArray) {
        const isDuplicate = existingUserQuiz.quizdata.some(
          (existingItem) => existingItem.name === newItem.name
        );

        if (!isDuplicate) {
          uniqueQuizdata.push(newItem);
        }
      }

      if (uniqueQuizdata.length > 0) {
        existingUserQuiz.quizdata.push(...uniqueQuizdata);
        await existingUserQuiz.save();
      }

      res.status(200).json(existingUserQuiz);
    } else {
      const newUserQuiz = await UserQuiz.create({
        user,
        quizdata: quizdataArray,
      });
      res.status(200).json(newUserQuiz);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUserQuizzes = async (req, res) => {
  const { user } = req.body;
  const userQuiz = await UserQuiz.find({ user: user });

  if (!userQuiz) {
    return res.status(404).json({ error: "No data found" });
  }

  res.status(200).json(userQuiz);
};

const getUserQuizdetails = async (req, res) => {
  const { user } = req.body;

  const userQuiz = await UserQuiz.findOne({ user: user });

  if (!userQuiz) {
    return res.status(400).json({ error: "No such data" });
  }

  res.status(200).json(userQuiz);
};

const deleteUserQuizdetails = async (req, res) => {
  const { user, name } = req.body;

  try {
    const existingUserQuiz = await UserQuiz.findOne({ user });

    if (!existingUserQuiz) {
      return res.status(404).json({ error: "User not found" });
    }

    const quizdata = existingUserQuiz.quizdata;

    const itemIndexToDelete = quizdata.findIndex((item) => item.name === name);

    if (itemIndexToDelete === -1) {
      return res.status(404).json({ error: "Item not found in quizdata" });
    }

    quizdata.splice(itemIndexToDelete, 1);

    await existingUserQuiz.save();

    res.status(200).json(existingUserQuiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUserQuiz,
  getAllUserQuizzes,
  getUserQuizdetails,
  deleteUserQuizdetails,
};
