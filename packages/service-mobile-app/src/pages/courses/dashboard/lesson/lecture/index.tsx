import { ScrollView, Text, useDisclose, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useNavigate, useParams } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import TextButton from 'src/components/Buttons/TextButton';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import HealthPoints from 'src/components/HealthPoints';
import HealthModal from 'src/components/Modal/HealthModal';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetCourseUserHpQuery } from 'src/services/course/course';
import { useGetLessonLectureQuery } from 'src/services/lesson/lesson';

interface LectureProps {
  lessonId: string;
  setLectureState: (v: boolean) => void;
}

function Lecture(props: LectureProps) {
  const navigate = useNavigate();
  const { setLectureState, lessonId } = props;

  const { id: courseId } = useParams();
  const { data: course, isFetching: isLessonLectureFetching } = useGetLessonLectureQuery({ id: lessonId });
  const { data: userHp, isFetching: isCourseHpFetching } = useGetCourseUserHpQuery(courseId!);

  const { isOpen, onClose, onOpen } = useDisclose();

  const nextHeartDate = new Date('Wed Apr 11 2024 08:25:23 GMT-0700');

  const [next, setNext] = useState<number>(nextHeartDate.getTime() - Date.now());

  const handleTakeQuiz = useCallback(() => {
    if (!userHp) return;

    if (userHp.hp > 0) {
      setLectureState(true);
    } else {
      onOpen();
    }
  }, [onOpen, setLectureState, userHp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNext(nextHeartDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [next]);

  if (isCourseHpFetching || isLessonLectureFetching) return <Text>Loading...</Text>;
  if (!course || !userHp) return <ErrorPage />;

  return (
    <VStack width="100%" height="100%" alignItems="center">
      <TopBarContainer>
        <IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
        <HealthPoints health={userHp.hp} />
      </TopBarContainer>
      <VStack
        borderRadius={8}
        borderColor="#BDBDBD"
        borderWidth={1}
        shadow={10}
        padding={28}
        paddingBottom={95}
        space={34}
        justifyContent="flex-start"
        alignItems="center"
        height="65%"
        width="80%"
        marginY={10}
      >
        <Text color="#876BF6" fontSize={24} fontWeight={700}>
          Lecture
        </Text>
        <SafeAreaView style={{ width: '100%' }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Markdown>{course.data}</Markdown>
          </ScrollView>
        </SafeAreaView>
      </VStack>
      <HealthModal health={userHp.hp} nextHeartDate={next} isOpen={isOpen} onClose={onClose} />
      <TextButton title="Take the quiz" onPress={handleTakeQuiz} rightIconName="arrow-forward" />
    </VStack>
  );
}

export default Lecture;
