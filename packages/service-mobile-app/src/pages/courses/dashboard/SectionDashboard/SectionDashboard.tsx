import { ArrowBackIcon, Button, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import { type Lesson, LessonStatus } from 'src/pages/courses/types';
import { useGetCourseByIdQuery } from 'src/services/course/course';
import { useJoinLessonMutation } from 'src/services/lesson/lesson';
import type { LessonResponse } from 'src/services/lesson/lesson.dto';
import { useGetSectionByIdQuery, useGetSectionLessonsQuery } from 'src/services/section/section';

function getLastLessonIndex(sectionsData: LessonResponse[], lastLessonId: string | undefined) {
  if (!lastLessonId) return 0;
  const lastSectionIndex = sectionsData.findIndex((s) => s.id === lastLessonId);

  return lastSectionIndex !== -1 ? lastSectionIndex : 0;
}

function SectionDashboard() {
  const { id: courseId, sectionId } = useParams();

  const { data: lessonsData, isFetching: isLessonsDataFetching } = useGetSectionLessonsQuery(sectionId!);
  const { data: sectionData, isFetching: isSectionDataFetching } = useGetSectionByIdQuery(sectionId!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(courseId!);
  const [joinLesson] = useJoinLessonMutation();

  const navigate = useNavigate();

  const lessons = useMemo<Lesson[]>(() => {
    if (!lessonsData) return [];
    const lastLessonIndex = getLastLessonIndex(lessonsData, courseData?.lastLessonId);

    return lessonsData.map((s, i) => {
      if (i > lastLessonIndex) return { ...s, status: LessonStatus.NOT_STARTED };
      if (i === lastLessonIndex) return { ...s, status: LessonStatus.IN_PROGRESS };
      return { ...s, status: LessonStatus.NOT_STARTED };
    });
  }, [courseData, lessonsData]);

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  if (isLessonsDataFetching || isCourseDataFetching || isSectionDataFetching) return <Text>Loading...</Text>;
  if (!lessonsData) return <Text>No lessons found.</Text>;
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
      <VStack w="full" space="md">
        <Button
          onPress={() => navigate(`/course/${courseId}`)}
          bg="coolGray.100"
          leftIcon={<ArrowBackIcon />}
          alignSelf="flex-start"
          variant="unstyled"
        >
          <Text bold>Go back</Text>
        </Button>
        <SectionHeader title={sectionData.title} description={sectionData.description} />

        <VStack w="full">
          {lessons.map((lesson, index) => (
            <LessonListItem lesson={lesson} index={index} key={lesson.id} onPress={() => handleJoinLesson(lesson.id)} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default SectionDashboard;
