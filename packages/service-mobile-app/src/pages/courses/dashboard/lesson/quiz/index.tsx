import { Spinner, View } from 'native-base';
import { useState } from 'react';
import { useParams } from 'react-router-native';
import { useGetSessionQuery } from 'src/services/session/section';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';

import Question from './question';
import ResultPage from './result';
import TopProgressBar from './topProgressBar'
interface QuizProps {
  sessionId: string;
  sessionQuestionId: string;
}

function Quiz({ sessionId, sessionQuestionId }: QuizProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(sessionQuestionId);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(0);
  const [currentErrorNumber, setCurrentErrorNumber] = useState<number>(0);
  const [nextQuestionId, setNextQuestionId] = useState<string | undefined>(undefined);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const { id: courseId } = useParams();
  const { data: session, isFetching: isSessionFetching } = useGetSessionQuery(sessionId);

  if (!courseId) return <ErrorPage />;
  if (isSessionFetching || !session) return <Spinner />;

  if (isFinish) return <ResultPage totalQuestionNb={session.totalQuestions} errorNb={currentErrorNumber} />;

  const handleNext = async () => {
    try {
      if (isEnd) {
        setIsFinish(true);
      } else if (nextQuestionId) {
        setCurrentQuestionId(nextQuestionId);
        setCurrentQuestionOrder(currentQuestionOrder + 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('rejected', error);
    }
  };

  return (
    <View>
      <TopProgressBar
        courseId={courseId}
        totalQuestions={session.totalQuestions}
        currentQuestionOrder={currentQuestionOrder}
      />
      <Question
        questionId={currentQuestionId}
        sessionId={sessionId}
        nextQuestion={handleNext}
        setNextQuestionId={setNextQuestionId}
        setIsEnd={setIsEnd}
        setCurrentErrorNumber={setCurrentErrorNumber}
      />
    </View>
  );
}

export default Quiz;
