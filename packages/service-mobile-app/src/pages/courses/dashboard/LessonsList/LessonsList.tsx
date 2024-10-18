import { ArrowBackIcon, Button, ScrollView, Skeleton, Text, VStack } from 'native-base';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import { Status } from 'src/pages/courses/types';
import { useJoinLessonMutation } from 'src/services/lesson/lesson';
import type { LessonResponse } from 'src/services/lesson/lesson.dto';
import { useGetSectionByIdQuery, useGetSectionLessonsQuery } from 'src/services/section/section';

type LessonFormated = (LessonResponse & { last?: boolean })[];

function LessonsList() {
  const { id: courseId, sectionId } = useParams();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {
    data: lessonsData,
    isFetching: isLessonsDataFetching,
    refetch: refetchLessonsData,
  } = useGetSectionLessonsQuery(sectionId!);
  const {
    data: sectionData,
    isFetching: isSectionDataFetching,
    refetch: refetchSectionData,
  } = useGetSectionByIdQuery(sectionId!);
  const [joinLesson] = useJoinLessonMutation();

  const navigate = useNavigate();

  const lessons = useMemo<LessonFormated>(() => {
    if (!lessonsData) return [];

    const lastIdx = lessonsData.findIndex((e) => e.status !== Status.COMPLETED);

    if (lastIdx !== -1 && lessonsData[lastIdx].status !== Status.IN_PROGRESS) {
      const tmp: LessonFormated = lessonsData.concat();
      tmp[lastIdx] = { ...tmp[lastIdx], status: Status.IN_PROGRESS, last: true };
      return tmp;
    }

    return lessonsData;
  }, [lessonsData]);

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const handleJoinLesson = async (id: string, isNotJoined: boolean | undefined) => {
    try {
      if (isNotJoined) await joinLesson(id).unwrap();
      navigate(`lesson/${id}`);
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
    await refetchLessonsData();
    await refetchSectionData();
    setRefreshing(false);
  }, [refetchLessonsData, refetchSectionData]);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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

        {isSectionDataFetching || isLessonsDataFetching ? (
          <>
            <Skeleton mt={'12'} h={'48'} borderRadius={12} />
            <Skeleton h={'16'} borderRadius={5} />
            <Skeleton h={'16'} borderRadius={5} />
          </>
        ) : sectionData && lessons ? (
          <>
            <SectionHeader title={sectionData.title} description={sectionData.description} />
            <VStack w={'full'}>
              {lessons.map((lesson, index) => (
                <LessonListItem
                  lesson={lesson}
                  index={index}
                  key={lesson.id}
                  onPress={() => handleJoinLesson(lesson.id, lesson.last)}
                />
              ))}
            </VStack>
          </>
        ) : (
          <Text fontSize={'md'} color={'coolGray.700'}>
            No lessons found
          </Text>
        )}
      </VStack>
      <Toast />
    </ScrollView>
  );
}

export default LessonsList;
