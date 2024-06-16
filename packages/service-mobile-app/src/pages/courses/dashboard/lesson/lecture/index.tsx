import { Button, Heading, ScrollView, Text, useDisclose, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigate, useParams } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import HealthPoints from 'src/components/HealthPoints';
import HealthModal from 'src/components/Modal/HealthModal';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetCourseUserHpQuery } from 'src/services/course/course';
import { useGetLessonByIdQuery, useGetLessonLectureQuery } from 'src/services/lesson/lesson';

interface LectureProps {
  lessonId: string;
  setLectureState: (v: boolean) => void;
}

function Lecture(props: LectureProps) {
  const navigate = useNavigate();
  const { setLectureState, lessonId } = props;

  const { id: courseId } = useParams();
  const { data: course, isFetching: isLessonLectureFetching } = useGetLessonLectureQuery({ id: lessonId });
  const {
    data: userHp,
    isFetching: isCourseHpFetching,
    refetch: refetchHealthPoints,
  } = useGetCourseUserHpQuery(courseId!);

  const { data: lessonData, isFetching: isLessonDataFetching } = useGetLessonByIdQuery(lessonId);

  const { isOpen, onClose, onOpen } = useDisclose();
  const [next, setNext] = useState<number | undefined>();

  useEffect(() => {
    if (userHp?.timer) {
      setNext(new Date(userHp.timer).getTime() - Date.now());
    }
  }, [userHp]);

  const handleTakeQuiz = useCallback(() => {
    if (!userHp) return;

    if (userHp.hp > 0) {
      setLectureState(true);
    } else {
      onOpen();
    }
  }, [onOpen, setLectureState, userHp]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (userHp?.timer) {
          const timeBeforeNextLife = new Date(userHp.timer).getTime() - Date.now();
          if (timeBeforeNextLife < 0) await refetchHealthPoints();
          setNext(timeBeforeNextLife);
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [next, refetchHealthPoints, userHp?.timer]);

  useEffect(() => {
    if (userHp?.hp && userHp.hp > 0) onClose();
  }, [onClose, userHp]);

  if (isCourseHpFetching || isLessonLectureFetching || isLessonDataFetching) return <Text>Loading...</Text>;
  if (!course || !userHp || !lessonData) return <ErrorPage />;

  return (
    <>
      <TopBarContainer>
        <IconButton onPress={() => navigate('/home')} iconName={'close'} style={{}} />
        <Heading>{lessonData.title}</Heading>
        <HealthPoints health={userHp.hp} />
      </TopBarContainer>
      <VStack width={'100%'} height={'100%'} alignItems={'center'} px={4}>
        <VStack
          paddingBottom={95}
          space={34}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'65%'}
          width={'full'}
          px={4}
          marginY={10}
        >
          <Text color={'#876BF6'} fontSize={24} fontWeight={700}>
            Lecture
          </Text>
          <SafeAreaView style={{ width: '100%' }}>
            <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
              <Markdown>{course[0].data}</Markdown>
            </ScrollView>
          </SafeAreaView>
        </VStack>
        {next && <HealthModal health={userHp.hp} nextHeartDate={next} isOpen={isOpen} onClose={onClose} />}
        <Button
          size={'lg'}
          w={'full'}
          variant={'purple'}
          onPress={handleTakeQuiz}
          rightIcon={<Icon name={'arrow-forward'} style={{ fontSize: 24, color: 'white' }} />}
        >
          Take the quiz
        </Button>
      </VStack>
    </>
  );
}

export default Lecture;
