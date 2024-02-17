import { Text } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
    <View style={styles.body}>
      <TopBarContainer>
        <IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
      </TopBarContainer>
      <View style={{ paddingHorizontal: 24, maxHeight: '60%', marginTop: 40, marginBottom: 100 }}>
        <View style={styles.lectureContainer}>
          <Text style={styles.titleContainer}>{'Lecture'}</Text>
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <Markdown>{course.data}</Markdown>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
      <TextButton title="Take the Quiz" onPress={() => setLectureState(true)} rightIconName="arrow-forward" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  lectureContainer: {
    width: '100%',
    borderRadius: 8,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    shadowRadius: 10,
    padding: 28,
    paddingBottom: 95,
    gap: 34,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    color: '#876BF6',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Lecture;
