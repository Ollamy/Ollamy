import QuestionDisplay, { CheckResponse } from "src/Components/question";
import {PagesProps} from "src/pages/interface";
import styled from "styled-components";
import TopBarLesson from '../../../Components/Topbar/lesson/index';
import { useCallback, useState } from 'react';

export interface LessonMobileProps extends PagesProps {
  lessonId: string
}

const LessonMobile = ({ children, lessonId }: LessonMobileProps): JSX.Element => {
  const [questionResp, setQuestionResp] = useState<CheckResponse>();
  const [nb, setnb] = useState(0);

  const questions = [{question: 'Quel opérateur  permet de tester une égalité ?', answers: ['==', '!=', '>=', '<=']},{question: 'question 2', answers: ['==', '!=', '>=', '<=']}]
  const summitAnswer = useCallback(({ id }: {id: string}) => {
    if (id) {
      const res = {success: false, id: '=='}
      setQuestionResp(res)
    }
  }, []);
  const handleNext = useCallback(() => {
    setQuestionResp(undefined)
    if (questions.length === nb + 1)
      window.open('/course', '_self');
    else
      setnb(nb + 1)
  }, [nb]);

  return (
    <Container>
      {children}
      <TopBarLesson completion={30} lifeCount={5}/>
      <QuestionDisplay {...{question: questions[nb].question, answers: questions[nb].answers, summitAnswer, handleNext, checkResponse: questionResp}}/>
    </Container>
  )
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fafafa;
`;

export default LessonMobile;
