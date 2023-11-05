import { useState, useEffect } from "react";
import QuizResult from "../components/QuizResult";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const Quiz = () => {
  const { name } = useParams();
  const { user } = useAuthContext();
  const [currentQuestion, setCurrentQuetion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userQuiz, setUserQuiz] = useState(null);

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/quiz/${name}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [name]);

  useEffect(() => {
    if (user) {
      const fetchUserQuizzes = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/userQuiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quizname: name, user: user.email }),
          });
          setUserQuiz(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserQuizzes();
    }
  }, [user, name]);

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuetion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };
  const updateScore = () => {
    if (clickedOption === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuetion(0);
    setClickedOption(0);
    setScore(0);
  };

  const submitHandle = async () => {
    const userQuiz = {
      user: user.email,
      quizdata: {
        name: quiz.name,
        score: score,
      },
    };

    const response = await fetch("http://localhost:4000/api/userQuiz/create", {
      method: "POST",
      body: JSON.stringify(userQuiz),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/quizzes";
    }
  };

  return (
    <>
      <p className="heading-txt">{quiz?.name}</p>
      {quiz && (
        <div className="container-quiz">
          {showResult ? (
            <QuizResult
              score={score ? score : userQuiz?.score}
              totalScore={quiz.questions.length}
              tryAgain={resetAll}
              submit={submitHandle}
            />
          ) : (
            <>
              <div className="question">
                <span id="question-number">{currentQuestion + 1}.</span>
                <span id="quetion-txt">
                  {quiz.questions[currentQuestion].question}{" "}
                </span>
              </div>
              <div className="option-container">
                {quiz.questions[currentQuestion].options
                  .filter((item) => item !== "")
                  .map((option, i) => {
                    return (
                      <button
                        className={`option-btn ${
                          clickedOption === i + 1 ? "checked" : null
                        }`}
                        key={i}
                        onClick={() => setClickedOption(i + 1)}
                      >
                        {option}
                      </button>
                    );
                  })}
              </div>
              <input
                type="button"
                value="Next"
                id="next-button"
                className="btn btn-primary"
                onClick={changeQuestion}
              ></input>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
