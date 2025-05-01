import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function Set() {
  let params = useParams();
  const setId = params.setId;

  const [questionIndex, setQuestionIndex] = useState(0);

  const [setData, setSetData] = useState(null);
  const [questionArr, setQuestionArr] = useState(null);
  const [answersArr, setAnswersArr] = useState(null);

  const [currAnswersArr, setCurrAnswersArr] = useState([]);

  useEffect(() => {
    fetchSetData();
  }, []);

  const fetchSetData = async () => {
    try {
      const apiURI = "http://localhost:3300/sets/set_id/" + setId;

      const response = await fetch(apiURI);
      const result = (await response.json())[0];

      setSetData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (setData !== null) {
      fetchQuestionArr();
    }
  }, [setData]);

  const fetchQuestionArr = async () => {
    try {
      const apiURI = "http://localhost:3300/questions/set_id/" + setId;

      const response = await fetch(apiURI);
      const result = await response.json();

      setQuestionArr(result);
      console.log(apiURI)
      console.log('result')
      console.log(result)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (setData !== null) {
      fetchAnswersArr(setId);
    }
  }, [setData]);

  const fetchAnswersArr = async (setId) => {
    try {
      const apiURI = "http://localhost:3300/answers/set_id/" + setId;

      const response = await fetch(apiURI);
      const result = await response.json();

      setAnswersArr(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    randomizeAnswers();
  }, [answersArr, questionIndex]);

  const randomizeAnswers = () => {
    let tempCurrAnswersArr = [];

    if (answersArr !== null) {
      tempCurrAnswersArr.push(answersArr[questionIndex]);

      while (tempCurrAnswersArr.length < 4) {
        let randInt = Math.floor(Math.random() * answersArr.length);
        let randAns = answersArr[randInt];

        if (answersArr.length < 4 || !tempCurrAnswersArr.includes(randAns)) {
          tempCurrAnswersArr.push(randAns);
        }
      }

      // console.log(tempCurrAnswersArr);
    }

    setCurrAnswersArr(tempCurrAnswersArr);
  };

  const handleAnswerSelect = (e, answerData) => {
    let bgColor =
      answerData.answer_index === questionIndex + 1 ? "#68d391" : "#f56565";

    const selectedInput = e.currentTarget;

    selectedInput.labels[0].style.backgroundColor = bgColor;

    if (questionArr.length === questionIndex + 1) {
      return;
    }

    setTimeout(() => {
      selectedInput.labels[0].style.backgroundColor = "inherit";
      setQuestionIndex(questionIndex + 1);
    }, 1000);
  };

  console.log(questionArr)
  console.log(questionIndex)

  return (
    <>
      {answersArr !== null ? (
        <div>
          <p>{setData.title}</p>
          <p>{questionArr[questionIndex].question_text}</p>
          <form>
            {currAnswersArr.map((answer, index) => {
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
