import { Spinner, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import HealthPoints from 'src/components/HealthPoints';
import ProgressBar from 'src/components/ProgressBar/ProgressBar';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetCourseUserHpQuery } from 'src/services/course/course';
import { useGetLessonQuestionsQuery } from 'src/services/lesson/lesson';

import Question from './question';
import ResultPage from './result';

interface QuizProps {
  lessonId: string;
}

function Quiz({ lessonId }: QuizProps) {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState<string | undefined>(undefined);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(0);
  const [currentErrorNumber, setCurrentErrorNumber] = useState<number>(0);
  const [nextQuestionId, setNextQuestionId] = useState<string | undefined>(undefined);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const { data: questions, isFetching: isQuestionsFetching } = useGetLessonQuestionsQuery({ id: lessonId });

  const { id: courseId } = useParams();

  const { data: userHp, isFetching: isUserHpFetching } = useGetCourseUserHpQuery(courseId!);

  useEffect(() => {
    if (questions && questions.length > 0) setCurrentQuestionId(questions[0].id);
  }, [questions]);
  const numberQuestion = questions === undefined ? 0 : questions.length;

  if (isFinish) return <ResultPage totalQuestionNb={numberQuestion} errorNb={currentErrorNumber} />;

  if (isQuestionsFetching || questions === undefined || currentQuestionId === undefined) return <Spinner />;

  if (!userHp && !isUserHpFetching) return <ErrorPage customMessage="Unexpected error loading user health points" />;

  const handleNext = async () => {
    try {
      if (isEnd) {
        setIsFinish(true);
      } else {
        setCurrentQuestionId(nextQuestionId);
        setCurrentQuestionOrder(currentQuestionOrder + 1);
      }
    } catch (error) {
      console.error('rejected', error);
    }
  };

  return (
    <View>
      <TopBarContainer>
        <IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
        <ProgressBar
          progress={currentQuestionOrder / numberQuestion}
          nextProgress={(currentQuestionOrder + 1) / numberQuestion}
        />
        <HealthPoints health={userHp?.hp} />
      </TopBarContainer>
      <Question
        questionId={currentQuestionId}
        nextQuestion={handleNext}
        setNextQuestionId={setNextQuestionId}
        setIsEnd={setIsEnd}
        setCurrentErrorNumber={setCurrentErrorNumber}
      />
    </View>
  );
}

export default Quiz;
