import styled from 'styled-components';
import { useCallback, useState } from 'react';
import DifficultyStar from './DifficultyStar';
import ArrowButton from '../Button/ArrowButton';
import { StyleColor } from '../Button/ArrowButton';

export interface CheckResponse {
  success: boolean
  id: string 
}

interface DifficultyProps {
  question: string
  answers : string[]
  summitAnswer: ({ id }) => void
  handleNext: () => void

  checkResponse?: CheckResponse
};

const answerBoxColor = (curId: string, answerId: string, checkResponse?: CheckResponse): {background?: string, borderColor?: string} => {
  if (!checkResponse) {
    if ( answerId === curId)
      return {borderColor: '#876BF6'}
  } else {
    if (checkResponse.success === false && curId === answerId)
      return {background: 'rgba(225, 62, 62, 0.56)', borderColor: '#E13E3E'}
    if (curId === checkResponse.id)
      return {background: '#D1FED9', borderColor: '#3BB765'}
  }
  return {}
}

const QuestionDisplay = ({question, answers, summitAnswer, checkResponse, handleNext}: DifficultyProps): JSX.Element => {
  const [tempAnswerId, setTempAnswerId] = useState<string>();

  const handleClick = useCallback(() => {
    summitAnswer({id: tempAnswerId})
  }, [tempAnswerId]);

  const handleClickNext = useCallback(() => {
    setTempAnswerId(undefined)
    handleNext()
  }, [tempAnswerId]);

  return (
    <Container>
      <DifficultyStar difficulty={2} difficultyMax={3}/>
      <QuestionContainer>
        {question}
      </QuestionContainer>
      <AnswersContainer>
        {answers.map((str, idx) => (
          <AnswerContainer key={idx} col={idx % 2 + 1} row={Math.floor((idx + 1) / 3) + 1} onClick={() => {!checkResponse && setTempAnswerId(str)}}>
            <Answer {...answerBoxColor(str, tempAnswerId, checkResponse)}>
              {str}
            </Answer>
          </AnswerContainer>
          )
        )}
      </AnswersContainer>
      {checkResponse ?
        <ArrowButton onClick={handleClickNext} buttonText={"Next"} styleColor={StyleColor.Purple}/> :
        <ArrowButton onClick={tempAnswerId ? handleClick : undefined} buttonText={"Summit"} styleColor={tempAnswerId ? StyleColor.Purple : undefined}/>
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  margin: 20px;
`;

const AnswersContainer = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const AnswerContainer = styled.div<{row: number, col: number}>`
  grid-column-start: ${({ col }) => `${col}`};
  grid-column-end: ${({ col }) => `${col + 1}`};
  grid-row-start: ${({ row }) => `${row}`};
  grid-row-end: ${({ row }) => `${row + 1}`};
`;

const Answer = styled.div<{background?: string, borderColor?: string}>`
  color: black;
  background: ${({ background }) => background};
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;

  padding: 30% 30%;

  border: ${({ borderColor }) => `4px solid ${borderColor ? borderColor : '#D9D9D9'}`};
  border-radius: 12px;
`;

const QuestionContainer = styled.text`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #876BF6;
`;

export default QuestionDisplay;