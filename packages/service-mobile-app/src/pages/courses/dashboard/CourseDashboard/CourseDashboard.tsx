import { ArrowBackIcon, Button, Heading, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import { type CourseSection, LessonStatus } from 'src/pages/courses/types';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';

function CourseDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: sectionsData, isFetching: isSectionsDataFetching } = useGetCourseSectionsQuery(id!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(id!);

  const sections = useMemo<CourseSection[]>(() => {
    if (!sectionsData) return [];
    const lastSectionIndex = sectionsData.findIndex((s) => s.id === courseData?.lastSectionId);

    return sectionsData.map((s, i) => {
      if (lastSectionIndex === -1) return { ...s, status: LessonStatus.NOT_STARTED };
      if (i < lastSectionIndex) return { ...s, status: LessonStatus.COMPLETED };
      if (i === lastSectionIndex) return { ...s, status: LessonStatus.IN_PROGRESS };
      return { ...s, status: LessonStatus.NOT_STARTED };
    });
  }, [courseData, sectionsData]);

  if (isSectionsDataFetching || isCourseDataFetching) return <Text>Loading...</Text>;
  if (!isSectionsDataFetching && !sectionsData) return <Text>Sections not found</Text>;
  if (!isCourseDataFetching && !courseData) return <Text>Course not found</Text>;

  return (
    <VStack flex="1" w="100%" space="8">
      <Button
        onPress={() => navigate('/home')}
        bg="coolGray.100"
        size="lg"
        leftIcon={<ArrowBackIcon />}
        alignSelf="flex-start"
        variant="unstyled"
      >
        Go back
      </Button>
      {courseData && <Heading size="lg">{courseData?.title}</Heading>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack mt={4}>
          {sections.map((section, idx) => (
            <LessonListItem
              key={section.id}
              itemName="Section"
              index={idx}
              lesson={section}
              onPress={() => navigate(`/course/${id}/section/${section.id}`)}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default CourseDashboard;
