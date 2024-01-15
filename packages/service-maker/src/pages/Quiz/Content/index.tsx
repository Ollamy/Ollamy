import styled from "styled-components";
import { ReactElement, useCallback, useEffect, useState } from "react";

// eslint-disable-next-line
interface ContentProps {
  doneStatus: boolean;
  setQuizData: any;
  typeSelected: "single" | "multiple" | "free";
  setDoneStatus: any;
}

const Content = ({
  doneStatus,
  setQuizData,
  typeSelected,
  setDoneStatus,
}: ContentProps): ReactElement => {
  const [questionValue, setQuestionValue] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChangeQuestionValue = useCallback((e) => {
    setQuestionValue(e.target.value);
  }, []);

  const handleChangeAnswer = useCallback((e) => {
    setAnswer(e.target.value);
  }, []);

  useEffect(() => {
    if (doneStatus) {
      setQuizData((old) => [
        ...old,
        { question: questionValue, correct: answer },
      ]);
      setDoneStatus(false);
    } else {
      setQuestionValue("");
      setAnswer("");
    }
  }, [doneStatus, setQuizData]);

  return (
    <Container>
      <InputQuestion
        placeholder={"Write your question here..."}
        value={questionValue}
        onChange={handleChangeQuestionValue}
      />
      <TitleCorrect>Correct Answer</TitleCorrect>
      {typeSelected === "free" && (
        <InputQuestion
          value={answer}
          onChange={handleChangeAnswer}
          placeholder={"The expected response"}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 60px;

  padding: 40px;
  box-sizing: border-box;
`;

const InputQuestion = styled.input`
  width: 800px;
  height: 40px;

  color: #3d3d3d;

  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  outline: none;
  border: none;
`;

const TitleCorrect = styled.h3`
  margin: 0;
  color: #088c4a;
`;

export default Content;
