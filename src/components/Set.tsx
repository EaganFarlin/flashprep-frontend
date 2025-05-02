import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { fetchSet, fetchQuestions, fetchAnswers } from "../api/api.ts";

export default function Set() {
  let params = useParams();
  const setId = params.setId;

  const [set, setSet] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currAnswers, setCurrAnswers] = useState([]);

  useEffect(() => {
    fetchSet(setId).then((res) => setSet(res));
  }, []);

  useEffect(() => {
    if (set !== null) {
      fetchQuestions(setId).then((res) => setQuestions(res));
    }
  }, [set]);

  useEffect(() => {
    if (set !== null) {
      fetchAnswers(setId).then((res) => setAnswers(res));
    }
  }, [set]);

  useEffect(() => {
    randomizeAnswers();
  }, [answers, questionIndex]);

  const randomizeAnswers = () => {
    let tempCurrAnswers = [];

    if (answers !== null) {
      tempCurrAnswers.push(answers[questionIndex]);

      while (tempCurrAnswers.length < 4) {
        let randInt = Math.floor(Math.random() * answers.length);
        let randAns = answers[randInt];

        if (answers.length < 4 || !tempCurrAnswers.includes(randAns)) {
          tempCurrAnswers.push(randAns);
        }
      }

      // console.log(tempCurrAnswers);
    }

    setCurrAnswers(tempCurrAnswers);
  };

  const handleAnswerSelect = (e, answerData) => {
    let bgColor =
      answerData.answer_index === questionIndex + 1 ? "#68d391" : "#f56565";

    const selectedInput = e.currentTarget;

    selectedInput.labels[0].style.backgroundColor = bgColor;

    if (questions.length === questionIndex + 1) {
      return;
    }

    setTimeout(() => {
      selectedInput.labels[0].style.backgroundColor = "inherit";
      setQuestionIndex(questionIndex + 1);
    }, 1000);
  };

  // console.log(questions);
  // console.log(questionIndex);

  return (
    <>
      {questions !== null && answers !== null ? (
        <div>
          <p>{set.title}</p>
          <p>{questions[questionIndex].question_text}</p>
          <form>
            {currAnswers.map((answer, index) => {
              return (
                <div key={answer.answer_text}>
                  <input
                    type="radio"
                    id={answer.answer_text}
                    name="answer_option"
                    value={answer.answer_text}
                    onChange={(e) => handleAnswerSelect(e, answer)}
                  />
                  <label htmlFor={answer.answer_text}>
                    {answer.answer_text}
                  </label>
                  <br />
                </div>
              );
            })}
          </form>
        </div>
      ) : (
        <div>
          <p>loading...</p>
        </div>
      )}
    </>
  );
}
