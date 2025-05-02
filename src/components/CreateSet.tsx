import { nanoid } from "nanoid";
import { useState } from "react";

import { createSet } from "../api/api.ts";

export default function CreateSet() {
  const [qnaArr, setQNAArr] = useState([{ question: "", answer: "" }]);

  const handleQNAChange = (e, qnaIndex) => {
    let currVal = e.currentTarget.value;
    let objProp = e.currentTarget.id === "enterTerm" ? "question" : "answer";

    setQNAArr((s) => [
      ...s.slice(0, qnaIndex),
      { ...s[qnaIndex], [objProp]: currVal },
      ...s.slice(qnaIndex + 1),
    ]);

    if (qnaArr.length === qnaIndex + 1) {
      setQNAArr((s) => [...s, { question: "", answer: "" }]);
    }
  };

  const handleSetCreation = () => {
    let setTitle = prompt("insert title");

    // detect and disallow null input values
    if (setTitle.length === 0) {
      console.log("Title is null");
      return;
    }

    if (qnaArr.length <= 1) {
      console.log("No QNA values");
      return;
    }

    for (let i = 0; i < qnaArr.length - 1; i++) {
      let qna = qnaArr[i];

      if (qna.question.length === 0 || qna.answer.length === 0) {
        console.log("Null QNA values detected");
        return;
      }
    }

    setQNAArr(qnaArr.splice(-1, 1));

    console.log(qnaArr);

    let newSet = {
      set: {
        id: nanoid(),
        title: setTitle,
        description: "insert desc",
      },
      qna: qnaArr,
    };

    createSet(newSet);

    setQNAArr([{ question: "", answer: "" }]);
  };

  return (
    <>
      <p>Create set</p>
      <form action={handleSetCreation}>
        {qnaArr.map((qnaObj, index) => {
          return (
            <div key={`qna-container-${index}`}>
              <input
                id="enterTerm"
                type="text"
                value={qnaObj.question}
                placeholder="Enter term"
                onChange={(e) => handleQNAChange(e, index)}
              />
              <label htmlFor="enterTerm">Term</label>
              <br />
              <input
                id="enterDef"
                type="text"
                value={qnaObj.answer}
                placeholder="Enter definition"
                onChange={(e) => handleQNAChange(e, index)}
              />
              <label htmlFor="enterDef">Definition</label>
            </div>
          );
        })}

        <input type="submit" value="Create" />
      </form>
    </>
  );
}
