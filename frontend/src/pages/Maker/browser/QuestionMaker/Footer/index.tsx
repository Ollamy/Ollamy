import styled from "styled-components";
import {useCallback} from "react";

interface FooterProps {
  questionNumber: number;
  maximumQuestionIndex: number;
  setCurrentQuestion: (data: any) => void;
}

const Footer = ({ questionNumber, maximumQuestionIndex, setCurrentQuestion }: FooterProps): JSX.Element => {
  const handleClickPrevious = useCallback(() => {
    setCurrentQuestion((old) => (old - 1 < 0) ? old : old - 1);
  }, [setCurrentQuestion]);

  const handleClickNext = useCallback(() => {
    setCurrentQuestion((old) => (old + 1 >= maximumQuestionIndex) ? old : old + 1);
  }, [setCurrentQuestion, maximumQuestionIndex])

  return (
    <Container>
      <Button onClick={handleClickPrevious} >Précédent</Button>
      <QuestionNumber>{questionNumber}</QuestionNumber>
      <Button onClick={handleClickNext} >Suivant</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;
  min-height: 80px;
  
  margin-bottom: 24px;
  padding: 12px 128px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;

  border: none;
  border-radius: 12px;
  background: #ECE6FC;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);

  color: #3D3D3D;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;

  cursor: pointer;

  :hover {
    background: rgba(135, 107, 246, 0.4);
  }
`;

const QuestionNumber = styled.h1`
  margin: 0;
  
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  
  color: #3D3D3D;
`;

export default Footer;
