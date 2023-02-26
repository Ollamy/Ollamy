import styled from "styled-components";
import {useCallback, useState} from "react";

const MultipleChoice4Words = (): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [goodAnswer, setGoodAnswer] = useState('');
  const [wrongAnswer1, setWrongAnswer1] = useState('');
  const [wrongAnswer2, setWrongAnswer2] = useState('');
  const [wrongAnswer3, setWrongAnswer3] = useState('');

  const handleChangeInput = useCallback((e, setter) => {
    setter(e.target.value);
  }, [])

  const handleClickSubmit = useCallback(() => {
    if (question && goodAnswer && wrongAnswer1 && wrongAnswer2 && wrongAnswer3) {
      // alert('ok');
    } else {
      // alert('ERROR')
    }
  }, [question, goodAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3]);

  return (
    <Container>
      <QuestionContainer>
        <Input placeholder={'What is the question ?'} value={question} onChange={(e) => handleChangeInput(e, setQuestion)} />
        <SubmitButton onClick={handleClickSubmit} >Submit</SubmitButton>
      </QuestionContainer>
      <AnswersContainer>
        <SubAnswersContainer>
          <GoodAnswerContainer>
            <Input placeholder={'Correct answer'} value={goodAnswer} onChange={(e) => handleChangeInput(e, setGoodAnswer)} />
          </GoodAnswerContainer>
          <AnswerContainer>
            <Input placeholder={'Wrong answer'} value={wrongAnswer1} onChange={(e) => handleChangeInput(e, setWrongAnswer1)} />
          </AnswerContainer>
        </SubAnswersContainer>
        <SubAnswersContainer>
          <AnswerContainer>
            <Input placeholder={'Wrong answer'} value={wrongAnswer2} onChange={(e) => handleChangeInput(e, setWrongAnswer2)} />
          </AnswerContainer>
          <AnswerContainer>
            <Input placeholder={'Wrong answer'} value={wrongAnswer3} onChange={(e) => handleChangeInput(e, setWrongAnswer3)} />
          </AnswerContainer>
        </SubAnswersContainer>
      </AnswersContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
  
  padding: 48px;
  box-sizing: border-box;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 540px;
  height: 64px;
`;

const SubmitButton = styled.button`
  height: 32px;
  margin-left: 12px;

  color: white;
  border-radius: 4px;
  background: #876BF6;
  border: 2px solid #876BF6;

  cursor: pointer;

  :hover {
    background: rgba(135, 107, 246, 0.7);
  }
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 540px;
  height: 100%;
  margin-top: 48px;
`;

const SubAnswersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
  width: 100%;
  height: 100%;
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 250px;
  height: 260px;
  padding: 0 24px;
  box-sizing: border-box;
  
  border-radius: 8px;
  border: 4px solid #E13E3E;
  background: rgba(225, 62, 62, 0.56);
`;

const GoodAnswerContainer = styled(AnswerContainer)`
  background: #D1FED9;
  border: 4px solid #3BB765;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;

  padding: 0 12px;
  box-sizing: border-box;
`;

export default MultipleChoice4Words;
