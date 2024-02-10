import { ArrowBackIcon, Button, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import { type Lesson, LessonStatus } from 'src/pages/courses/types';
import { useGetCourseByIdQuery } from 'src/services/course/course';
import { useGetSectionByIdQuery, useGetSectionLessonsQuery } from 'src/services/section/section';

function SectionDashboard() {
  const { id: courseId, sectionId } = useParams();

  const { data: lessonsData, isFetching: isLessonsDataFetching } = useGetSectionLessonsQuery(sectionId!);
  const { data: sectionData, isFetching: isSectionDataFetching } = useGetSectionByIdQuery(sectionId!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(courseId!);
  const navigate = useNavigate();

  const lessons = useMemo<Lesson[]>(() => {
    if (!lessonsData) return [];
    const lastLessonIndex = lessonsData.findIndex((s) => s.id === courseData?.lastLessonId);

    return lessonsData.map((s, i) => {
      if (lastLessonIndex === -1) return { ...s, status: LessonStatus.NOT_STARTED };
      if (i < lastLessonIndex) return { ...s, status: LessonStatus.COMPLETED };
      if (i === lastLessonIndex) return { ...s, status: LessonStatus.IN_PROGRESS };
      return { ...s, status: LessonStatus.NOT_STARTED };
    });
  }, [courseData, lessonsData]);

  if (isLessonsDataFetching || isCourseDataFetching || isSectionDataFetching) return <Text>Loading...</Text>;
  if (!lessonsData) return <Text>No lessons found.</Text>;
  if (!courseData) return <Text>No course found.</Text>;
  if (!sectionData) return <Text>Section not found.</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack w="full" space="md">
        <Button
          onPress={() => navigate(`/course/${courseId}`)}
          bg="coolGray.100"
          size="lg"
          leftIcon={<ArrowBackIcon />}
          alignSelf="flex-start"
          variant="unstyled"
        >
          Go back
        </Button>
        <SectionHeader title={sectionData.title} description={sectionData.description} />

        <VStack w="full">
          {lessons.map((lesson, index) => (
            <LessonListItem lesson={lesson} index={index} key={lesson.id} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default SectionDashboard;
