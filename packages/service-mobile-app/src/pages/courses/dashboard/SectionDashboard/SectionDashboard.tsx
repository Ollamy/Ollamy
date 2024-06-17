import { ArrowBackIcon, Button, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import type { Lesson } from 'src/pages/courses/types';
import { Status } from 'src/pages/courses/types';
import { useGetCourseByIdQuery } from 'src/services/course/course';
import { useJoinLessonMutation } from 'src/services/lesson/lesson';
import { useGetSectionByIdQuery, useGetSectionLessonsQuery } from 'src/services/section/section';

function SectionDashboard() {
  const { id: courseId, sectionId } = useParams();

  const { data: lessonsData, isFetching: isLessonsDataFetching } = useGetSectionLessonsQuery(sectionId!);
  const { data: sectionData, isFetching: isSectionDataFetching } = useGetSectionByIdQuery(sectionId!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(courseId!);
  const [joinLesson] = useJoinLessonMutation();

  const navigate = useNavigate();

  const lessons = useMemo<Lesson[]>(() => {
    if (!lessonsData) return [];

    const lastIdx = lessonsData.findIndex((e) => e.status !== Status.COMPLETED);

    if (lastIdx !== -1) {
      const tmp = lessonsData.concat();
      tmp[lastIdx] = { ...tmp[lastIdx], status: Status.IN_PROGRESS };
      return tmp;
    }

    return lessonsData;
  }, [lessonsData]);

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  if (isLessonsDataFetching || isCourseDataFetching || isSectionDataFetching) return <Text>Loading...</Text>;
  if (!lessons) return <Text>No lessons found.</Text>;
  if (!courseData) return <Text>No course found.</Text>;
  if (!sectionData) return <Text>Section not found.</Text>;

  const handleJoinLesson = async (id: string) => {
    try {
      await joinLesson(id).unwrap();
      navigate(`lesson/${id}`);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occured. Please try again',
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack w={'full'} space={'md'}>
        <Button
          onPress={() => navigate(`/course/${courseId}`)}
          bg={'coolGray.100'}
          leftIcon={<ArrowBackIcon />}
          alignSelf={'flex-start'}
          variant={'unstyled'}
        >
          <Text bold>Go back</Text>
        </Button>
        <SectionHeader title={sectionData.title} description={sectionData.description} />

        <VStack w={'full'}>
          {lessons.map((lesson, index) => (
            <LessonListItem lesson={lesson} index={index} key={lesson.id} onPress={() => handleJoinLesson(lesson.id)} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default SectionDashboard;
