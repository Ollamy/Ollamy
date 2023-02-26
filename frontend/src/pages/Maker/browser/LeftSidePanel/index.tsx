import styled from "styled-components";
import {useCallback, useEffect, useState} from "react";
import {DataType} from "src/pages/Maker/browser/index";

interface LeftSidePanelProps {
  data: DataType[];
  currentQuestion: number;
  setData: (data: any) => void;
  setCurrentQuestion: (nbr: any) => void;
}

const LeftSidePanel = ({ data, currentQuestion, setData, setCurrentQuestion }: LeftSidePanelProps): JSX.Element => {
  const handleQuestionClicked = useCallback((index: number) => {
    setCurrentQuestion(index);
  }, [setCurrentQuestion]);

  const createNewLesson = useCallback(() => {
    // alert('test')
  }, []);

  const handleClickCreateNewQuestion = useCallback(() => {
    if (currentQuestion === undefined) {
      createNewLesson();
    }
    setData((old: DataType[]) => {
      return [...old, {
        name: `Question ${old.length}`
      }];
    });
    setCurrentQuestion((old) => old !== undefined ? data.length : 0);
  }, [currentQuestion, data, setData, setCurrentQuestion, createNewLesson]);

  return (
    <Container>
      <TitleContainer>
        <Icon src={'/assets/react.webp'} />
        <Title>React TS</Title>
      </TitleContainer>
      <CreateQuestion onClick={handleClickCreateNewQuestion} >Create new question [+]</CreateQuestion>
      {data?.map((element, index) => {
        return (
          <QuestionContainer isSelected={index === currentQuestion} key={index} onClick={() => handleQuestionClicked(index)} >
            {element.name}
          </QuestionContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 95%;
  max-height: 840px;

  padding: 12px;
  box-sizing: border-box;
  
  background: white;
  border-radius: 0 12px 12px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  
  overflow-y: scroll;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  width: 100%;
  padding: 16px;
  margin-bottom: 24px;
  box-sizing: border-box;

  border-radius: 8px;
  border: 2px solid #876BF6;
  box-shadow: 2px 2px 8px rgba(189, 189, 189, 0.25);
`;

const Icon = styled.img`
  height: 40px;
`;

const Title = styled.h1`
  margin: 12px 0 0 0;
  color: #3D3D3D;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
`;

interface QuestionContainerProps {
  isSelected?: boolean;
}

const QuestionContainer = styled.div<QuestionContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border: ${({ isSelected }) => isSelected ? '1px solid #876BF6' : 'unset'};
  
  color: #3D3D3D;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;

  cursor: pointer;
  
  :not(:last-child) {
    margin-bottom: 16px;
  }
  
  :hover {
    background: #ECE6FC;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`;

const CreateQuestion = styled(QuestionContainer)`
  color: white;
  background: #876BF6;
  
  :hover {
    color: #3D3D3D;
  }
`;

export default LeftSidePanel;
