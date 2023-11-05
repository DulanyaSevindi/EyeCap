import { useState } from "react";
import axios from "axios";

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    image: "",
    questions: [],
  });

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      answer: 1,
      image: "",
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/quiz",
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.ok) {
        console.log(response.data.error);
      }

      if (response.data.ok) {
        setQuizData({
          name: "",
          description: "",
          image: "",
          questions: [],
        });
        console.log("New Quiz added", response.data);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <section>
      <div className="container my-5 bg-white py-4">
        <div className="col-md-8 mx-auto">
          <h3 className="text-center font-bold my-4">Add a Quiz </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Quiz Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                onChange={(e) =>
                  setQuizData({ ...quizData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="inputDescription"
                rows="3"
                onChange={(e) =>
                  setQuizData({ ...quizData, description: e.target.value })
                }
                value={quizData.description}
              />
            </div>
            {/* <div className="input-group mb-3">
              <label className="input-group-text" for="inputGroupFile02">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                // onChange={(e) =>
                //   setQuizData({ ...quizData, image: e.target.value })
                // }
                // value={quizData.image}
              />
            </div> */}

            <label className="form-label">Questions</label>
            {quizData.questions.map((question, questionIndex) => (
              <div key={questionIndex}>
                <h3 className="form-label">Question {questionIndex + 1}</h3>
                <label className="col-md-8">
                  Question:
                  <input
                    type="text"
                    className="form-control"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        "question",
                        e.target.value
                      )
                    }
                  />
                </label>{" "}
                <br></br>
                <div class="row align-items-start">
                  {question.options.map((option, optionIndex) => (
                    <div class="col">
                      <label className="col-sm-8" key={optionIndex}>
                        Answer {optionIndex + 1}:
                        <input
                          type="text"
                          className="form-control"
                          id="inputAnswer"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                        />
                        <br></br>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <br></br>
            <button
              className="btn btn-primary mx-1"
              onClick={(e) => {
                addQuestion();
                e.preventDefault();
              }}
            >
              Add Question
            </button>
            <button className="btn btn-primary mx-1" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddQuiz;
