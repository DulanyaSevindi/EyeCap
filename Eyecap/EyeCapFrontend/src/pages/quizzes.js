import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Quizzes = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [userQuiz, setUserQuiz] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const email = props.user?.email;

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      setLoadingQuizzes(true);
      try {
        const response = await axios.get("http://localhost:4000/api/quiz");
        setLoadingQuizzes(false);
        setQuizzes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllQuizzes();
  }, []);

  useEffect(() => {
    if (email) {
      fetch("http://localhost:4000/api/userQuiz", {
        method: "POST",
        body: JSON.stringify({ user: email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserQuiz(data);
        });
    }
  }, [email]);

  const handleReset = async (name) => {
    const result = window.confirm(
      "Are you sure you want to perform this action?"
    );

    if (result) {
      const response = await fetch("http://localhost:4000/api/userQuiz", {
        method: "DELETE",
        body: JSON.stringify({ user: props.user?.email, name: name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        console.log(json);

        alert("Successfully deleted");

        window.location.href = "/quizzes";
      }
    } else {
    }
  };

  return (
    <>
      {!loadingQuizzes ? (
        <div className="container mt-5 mb-3">
          <div className="row">
            {quizzes?.map((q, index) => (
              <div key={index} className="col-md-4">
                <div className="card p-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <img
                        className="img-fluid img-size"
                        src={`../assets/${q.image}`}
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <h3 className="heading">{q.name}</h3>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <p className="card-text">{q.description}</p>
                    </div>
                  </div>
                  <div>
                    {userQuiz.quizdata ? (
                      <div className="mt-2">
                        {userQuiz?.quizdata?.some(
                          (item) => item.name === q?.name
                        ) ? (
                          <button
                            className="btn btn-danger mx-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleReset(q?.name);
                            }}
                          >
                            Reset Quiz
                          </button>
                        ) : (
                          <Link to={`/Quiz/${q?.name}`}>
                            <button className="btn btn-primary mx-1">
                              Start Quiz
                            </button>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Quizzes;
