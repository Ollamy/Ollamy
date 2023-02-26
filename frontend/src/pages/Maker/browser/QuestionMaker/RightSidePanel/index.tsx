import styled from "styled-components";
import { useCallback } from "react";
import DifficultySelector from "src/Components/DifficultySelector";

export type QuestionRefNameType = "multiple_choice_4_words";

interface QuestionsTypesType {
  label: string;
  refName: QuestionRefNameType;
  iconPath: string;
}

const questionsTypes: QuestionsTypesType[] = [
  {
    label: "Multiple choice between 4 words",
    refName: "multiple_choice_4_words",
    iconPath: "/assets/tiles.png",
  },
];

interface RightSidePanelProps {
  setQuestionType: (type: QuestionRefNameType) => void;
}

const RightSidePanel = ({
  setQuestionType,
}: RightSidePanelProps): JSX.Element => {
  const handleClick = useCallback(
    (type: QuestionRefNameType) => {
      setQuestionType(type);
    },
    [setQuestionType]
  );

  return (
    <Container>
      <Title>Configuration</Title>
      <DifficultySelector />
      <QuestionTypeContainer>
        {questionsTypes.map((element, index) => {
          return (
            <QuestionType
              key={index}
              onClick={() => handleClick(element.refName)}
            >
              <Icon src={element.iconPath} />
              {element.label}
            </QuestionType>
          );
        })}
      </QuestionTypeContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 95%;
  padding: 24px;
  box-sizing: border-box;
  gap: 24px;

  background: white;
  border-radius: 12px 0 0 12px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
`;

const Title = styled.h1`
  width: 100%;

  margin: 0 0 24px 0;
  color: #3d3d3d;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const QuestionTypeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const QuestionType = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  //height: 50px;
  padding: 8px;
  box-sizing: border-box;

  color: #3d3d3d;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-family: "Poppins", sans-serif;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;

  cursor: pointer;

  :hover {
    background: #ece6fc;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
`;

const Icon = styled.img`
  height: 30px;
  margin-right: 8px;
`;

export default RightSidePanel;
