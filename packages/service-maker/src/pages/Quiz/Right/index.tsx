import styled from "styled-components";
import { ReactElement, useCallback } from "react";

// eslint-disable-next-line
interface RightProps {
  typeSelected: "single" | "multiple" | "free";
  setTypeSelected: any;
  doneStatus: boolean;
  setDoneStatus: any;
  quizData: any;
}

const Right = ({
  typeSelected,
  setTypeSelected,
  setDoneStatus,
  doneStatus,
  quizData,
}: RightProps): ReactElement => {
  const handleClickDoneButton = useCallback(() => {
    if (doneStatus) return;

    setDoneStatus((old) => !old);
    setTypeSelected("single");
  }, [doneStatus, setDoneStatus, setTypeSelected]);

  return (
    <Container>
      <DoneButton onClick={handleClickDoneButton}>Done</DoneButton>
      <Header>
        <Title>Options</Title>
        <Description>{`Question ${quizData.length + 1}`}</Description>
      </Header>
      <Body>
        <SubTitle>Type of question</SubTitle>
        <QuestionTypeParentContainer>
          {/*<QuestionTypeContainer*/}
          {/*  isSelected={typeSelected === "single"}*/}
          {/*  onClick={() => setTypeSelected("single")}*/}
          {/*>*/}
          {/*  Single choice*/}
          {/*</QuestionTypeContainer>*/}
          {/*<QuestionTypeContainer*/}
          {/*  isSelected={typeSelected === "multiple"}*/}
          {/*  onClick={() => setTypeSelected("multiple")}*/}
          {/*>*/}
          {/*  Multiple choice*/}
          {/*</QuestionTypeContainer>*/}
          <QuestionTypeContainer
            isSelected={typeSelected === "free"}
            onClick={() => setTypeSelected("free")}
          >
            Input
          </QuestionTypeContainer>
        </QuestionTypeParentContainer>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  box-shadow: -2px 4px 39.4px 0 rgba(0, 0, 0, 0.17);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  border-bottom: 1px solid #e8e8e8;

  padding: 16px 12px;
  box-sizing: border-box;
`;

const Body = styled.div`
  display: block;

  width: 100%;

  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: #3d3d3d;

  margin: 0;
`;

const Description = styled.p`
  color: #797878;
  font-weight: 400;
  margin: 0;
`;

const SubTitle = styled.h4`
  color: #3d3d3d;
`;

const QuestionTypeParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
`;

interface QuestionTypeContainerProps {
  isSelected: boolean;
}

const QuestionTypeContainer = styled.div<QuestionTypeContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 230px;
  height: 100px;

  border-radius: 8px;

  padding: 20px;
  box-sizing: border-box;

  cursor: pointer;

  border: ${({ isSelected }) =>
    isSelected ? "1px solid #876bf6" : "1px solid #d9d9d9"};

  :hover {
    border: 1px solid #876bf6;
  }
`;

const DoneButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 40px;

  color: white;
  border: none;
  border-radius: 4px;
  background: royalblue;

  cursor: pointer;
`;

export default Right;
