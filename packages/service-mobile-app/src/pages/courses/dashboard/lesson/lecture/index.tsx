import { ScrollView, Text, VStack } from 'native-base';
import { SafeAreaView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useNavigate } from 'react-router-native';
import IconButton from 'src/components/Buttons/IconButton/IconButton';
import TextButton from 'src/components/buttons/textButton';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetLessonLectureQuery } from 'src/services/lesson/lesson';

interface LectureProps {
  lessonId: string;
  setLectureState: (v: boolean) => void;
}

function Lecture(props: LectureProps) {
  const navigate = useNavigate();
  const { setLectureState, lessonId } = props;

  const { data: course, isLoading } = useGetLessonLectureQuery({ id: lessonId });

  if (isLoading || !course) return <ErrorPage />;

  return (
    <VStack width="100%" height="100%" alignItems="center">
      <TopBarContainer>
        <IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
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
      <TextButton title="Take the Quiz" onPress={() => setLectureState(true)} rightIconName="arrow-forward" />
    </VStack>
  );
}

export default Lecture;
