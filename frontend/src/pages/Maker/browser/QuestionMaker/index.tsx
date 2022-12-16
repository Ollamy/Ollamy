import styled from "styled-components";
import Content from "src/pages/Maker/browser/QuestionMaker/Content";
import RightSidePanel, {
  QuestionRefNameType,
} from "src/pages/Maker/browser/QuestionMaker/RightSidePanel";
import Footer from "src/pages/Maker/browser/QuestionMaker/Footer";
import {DataType} from "src/pages/Maker/browser/index";
import {useEffect, useState} from "react";

interface QuestionMakerProps {
  data: DataType[];
  isDisplayed: boolean;
  currentQuestion: number;
  setCurrentQuestion: (nbr: number) => void;
}

const QuestionMaker = ({ data, isDisplayed, currentQuestion, setCurrentQuestion }: QuestionMakerProps): JSX.Element => {
  const [questionType, setQuestionType] = useState<QuestionRefNameType>(undefined);

  return (
    <Container isDisplayed={isDisplayed} >
      <SubContainer>
        <Content questionType={questionType} questionNumber={currentQuestion} />
        <Footer questionNumber={currentQuestion} maximumQuestionIndex={data.length} setCurrentQuestion={setCurrentQuestion} />
      </SubContainer>
      <RightSidePanel setQuestionType={setQuestionType} />
    </Container>
  );
};

interface ContainerProps {
  isDisplayed: boolean;
}

const Container = styled.div<ContainerProps>`
  display: ${({ isDisplayed }) => isDisplayed ? 'flex' : 'none'};
  align-items: center;
  
  flex-grow: 1;
  height: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  height: 100%;
`;

export default QuestionMaker;
