import styled from "styled-components";
import { ReactElement } from "react";

// eslint-disable-next-line
interface LeftProps {
  quizData: any;
}

const Left = ({ quizData }: LeftProps): ReactElement => {
  return (
    <Container>
      <Button>Add question</Button>
      {quizData?.map(({ question, correct }, index) => {
        return <p key={`${index}`}>{question}</p>;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 24px;
  box-sizing: border-box;

  border-right: 1px solid #e5e5e5;
`;

const Button = styled.button``;

export default Left;
