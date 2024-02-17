import { Spinner, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import ProgressBar from 'src/components/ProgressBar/ProgressBar';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetLessonQuestionsQuery } from 'src/services/lesson/lesson';
import { useValidateAnswerMutation } from 'src/services/question/question';

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
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const { data: questions } = useGetLessonQuestionsQuery({ id: lessonId });
  const [validate] = useValidateAnswerMutation();

  useEffect(() => {
    if (questions && questions.length > 0) setCurrentQuestionId(questions[0].id);
  }, [questions]);
  const numberQuestion = questions === undefined ? 0 : questions.length;

  if (isFinish) return <ResultPage totalQuestionNb={numberQuestion} errorNb={currentErrorNumber} />;

  if (questions === undefined || currentQuestionId === undefined) return <Spinner />;

  const handleNext = async (answerId: string, questionId: string) => {
    try {
      const data = await validate({ answerId, questionId }).unwrap();
      if (!data.success) setCurrentErrorNumber(currentErrorNumber + 1);

      if (data.end) {
        setIsFinish(true);
      } else {
        setCurrentQuestionId(data.nextQuestionId);
        setCurrentQuestionOrder(currentQuestionOrder + 1);
      }
    } catch (error) {
      console.error('rejected', error);
    }
  };

  return (
    <View>
      <TopBarContainer style={{ display: 'flex', justifyContent: 'flex-start', gap: 32 }}>
        <IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
        <ProgressBar progress={currentQuestionOrder / numberQuestion} />
      </TopBarContainer>
      <Question questionId={currentQuestionId} nextQuestion={handleNext} />
    </View>
  );
}

export default Quiz;
