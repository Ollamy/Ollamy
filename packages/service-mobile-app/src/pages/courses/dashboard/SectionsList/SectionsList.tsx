import { ArrowBackIcon, Button, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import { type CourseSection, LessonStatus } from 'src/pages/courses/types';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';
import type { SectionResponse } from 'src/services/section/section.dto';

function getLastSectionIndex(sectionsData: SectionResponse[], lastSectionId: string | undefined) {
  if (!lastSectionId) return 0;
  const lastSectionIndex = sectionsData.findIndex((s) => s.id === lastSectionId);

  return lastSectionIndex !== -1 ? lastSectionIndex : 0;
}

function SectionsList() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: sectionsData,
    isFetching: isSectionsDataFetching,
    refetch: refetchSectionsData,
  } = useGetCourseSectionsQuery(id!);
  const { data: courseData, isFetching: isCourseDataFetching, refetch: refetchCourseData } = useGetCourseByIdQuery(id!);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const sections = useMemo<CourseSection[]>(() => {
    if (!sectionsData) return [];
    const lastSectionIndex = getLastSectionIndex(sectionsData, courseData?.lastSectionId);

    return sectionsData.map((s, i) => {
      if (i > lastSectionIndex) return { ...s, status: LessonStatus.NOT_STARTED };
      if (i === lastSectionIndex) return { ...s, status: LessonStatus.IN_PROGRESS };
      return { ...s, status: LessonStatus.NOT_STARTED };
    });
  }, [courseData, sectionsData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetchCourseData();
    await refetchSectionsData();
    setRefreshing(false);
  }, [refetchCourseData, refetchSectionsData]);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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

        {isCourseDataFetching || isSectionsDataFetching ? (
          <>
            <Skeleton.Text lines={1} />
            <Skeleton h={'16'} borderRadius={5} />
            <Skeleton h={'16'} borderRadius={5} />
            <Skeleton h={'16'} borderRadius={5} />
          </>
        ) : courseData && sections.length > 0 ? (
          <>
            <Heading size={'lg'}>{courseData?.title}</Heading>
            <VStack mt={4}>
              {sections.map((section, idx) => (
                <LessonListItem
                  key={section.id}
                  itemName={'Section'}
                  index={idx}
                  lesson={section}
                  onPress={() => navigate(`/course/${id}/section/${section.id}`)}
                />
              ))}
            </VStack>
          </>
        ) : (
          <Text fontSize={'md'} color={'coolGray.700'}>
            No sections found
          </Text>
        )}
      </VStack>
    </ScrollView>
  );
}

export default SectionsList;
