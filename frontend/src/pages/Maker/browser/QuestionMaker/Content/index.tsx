import styled from "styled-components";
import {QuestionRefNameType} from "src/pages/Maker/browser/QuestionMaker/RightSidePanel";
import MultipleChoice4Words from "src/pages/Maker/browser/QuestionMaker/Content/MultipleChoice4Words";
import {useEffect} from "react";

interface ContentProps {
  questionNumber: number;
  questionType: QuestionRefNameType;
}

const questionComponents = {
  multiple_choice_4_words: MultipleChoice4Words
};

const Content = ({ questionNumber, questionType }: ContentProps): JSX.Element => {
  const Question = questionComponents[questionType];

  return (
    <Container>
      {questionType && <Question/>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #f1f1f1;
`;

export default Content;
