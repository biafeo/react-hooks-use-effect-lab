import React, { useEffect, useState, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          onAnswered(false);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearTimeout(intervalRef.current);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    clearInterval(intervalRef.current);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button
            key={answer}
            onClick={() => {
              handleAnswer(isCorrect);
            }}
          >
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
