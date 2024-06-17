import { ArrowBackIcon, Button, Heading, ScrollView, Text, VStack } from 'native-base';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';
import { useJoinSectionMutation } from 'src/services/section/section';

function CourseDashboard(): JSX.Element {
  const navigate = useNavigate();
  const showToast = (body: ToastShowParams): void => Toast.show(body);
  const [joinSection] = useJoinSectionMutation();

  const { id } = useParams();

  const { data: sections, isFetching: isSectionsDataFetching } = useGetCourseSectionsQuery(id!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(id!);

  if (isSectionsDataFetching || isCourseDataFetching) return <Text>Loading...</Text>;
  if (!sections) return <Text>Sections not found</Text>;
  if (!isCourseDataFetching && !courseData) return <Text>Course not found</Text>;

  const handleJoinSection = async (sectionId: string) => {
    try {
      await joinSection(sectionId).unwrap();
      navigate(`/course/${id}/section/${sectionId}`);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occured. Please try again',
      });
    }
  };

  return (
    <VStack flex={'1'} w={'100%'} space={'8'}>
      <Button
        onPress={() => navigate('/home')}
        bg={'coolGray.100'}
        leftIcon={<ArrowBackIcon />}
        alignSelf={'flex-start'}
        variant={'unstyled'}
      >
        <Text bold>Go back</Text>
      </Button>
      {courseData && <Heading size={'lg'}>{courseData?.title}</Heading>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack mt={4}>
          {sections.map((section, idx) => (
            <LessonListItem
              key={section.id}
              itemName={'Section'}
              index={idx}
              lesson={section}
              onPress={() => handleJoinSection(section.id)}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default CourseDashboard;
