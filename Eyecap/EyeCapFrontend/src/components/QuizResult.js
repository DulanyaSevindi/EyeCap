import React from "react";

const QuizResult = (props) => {
  return (
    <>
      <div className="show-score">
        Your Score: {props.score}/{props.totalScore}
        <br />
        <div className="alert alert-info" role="alert">
          <p>0-1: Symptoms for visually significant, the diesease are lower.</p>
          <p>
            2-3: Symptoms for visually significant, the diesease are moderate.
          </p>
          4-5: Symptoms for visually significant,the diesease are higher.
        </div>
      </div>

      <button
        id="next-button"
        className="shiftleft text-bg-danger"
        onClick={props.tryAgain}
      >
        Reset
      </button>
      <button
        id="next-button"
        className="shiftright text-bg-primary"
        onClick={props.submit}
      >
        Submit
      </button>
    </>
  );
};
export default QuizResult;
