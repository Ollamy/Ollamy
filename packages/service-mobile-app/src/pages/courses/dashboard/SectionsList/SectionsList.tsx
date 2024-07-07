import { ArrowBackIcon, Button, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import { Status } from 'src/pages/courses/types';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';
import { useJoinSectionMutation } from 'src/services/section/section';
import type { SectionResponse } from 'src/services/section/section.dto';

type SectionFormated = (SectionResponse & { last?: boolean })[];

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
  const showToast = (body: ToastShowParams): void => Toast.show(body);
  const [joinSection] = useJoinSectionMutation();

  const sections = useMemo<SectionFormated>(() => {
    if (!sectionsData) return [];

    const lastIdx = sectionsData.findIndex((e) => e.status !== Status.COMPLETED);

    if (lastIdx !== -1 && sectionsData[lastIdx].status !== Status.IN_PROGRESS) {
      const tmp: SectionFormated = sectionsData.concat();
      tmp[lastIdx] = { ...tmp[lastIdx], status: Status.IN_PROGRESS, last: true };
      return tmp;
    }

    return sectionsData;
  }, [sectionsData]);

  const handleJoinSection = async (sectionId: string, isNotJoined?: boolean) => {
    try {
      if (isNotJoined) await joinSection(sectionId).unwrap();
      navigate(`/course/${id}/section/${sectionId}`);
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occured. Please try again',
      });
    }
  };

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
                  onPress={() => handleJoinSection(section.id, section.last)}
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
      <Toast />
    </ScrollView>
  );
}

export default SectionsList;
