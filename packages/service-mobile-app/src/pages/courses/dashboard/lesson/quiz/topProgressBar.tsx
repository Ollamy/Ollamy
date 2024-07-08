import { Spinner } from 'native-base';
import { useNavigate } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import HealthPoints from 'src/components/HealthPoints';
import ProgressBar from 'src/components/ProgressBar/ProgressBar';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetCourseUserHpQuery } from 'src/services/course/course';

interface QuizProps {
  courseId: string;
  totalQuestions: number;
  currentQuestionOrder: number;
}

function TopProgressBar({ courseId, totalQuestions, currentQuestionOrder }: QuizProps) {
  const navigate = useNavigate();
  const { data: userHp, isFetching: isUserHpFetching } = useGetCourseUserHpQuery(courseId);

  if (isUserHpFetching || !userHp) return <Spinner />;

  return (
    <TopBarContainer>
      <IconButton onPress={() => navigate('/home')} iconName={'close'} style={{}} />
      <ProgressBar
        progress={currentQuestionOrder / totalQuestions}
        nextProgress={(currentQuestionOrder + 1) / totalQuestions}
      />
      <HealthPoints health={userHp?.hp} />
    </TopBarContainer>
  );
}

export default TopProgressBar;
