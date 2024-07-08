import { ArrowBackIcon, Button, ScrollView, Spinner, Text, View, VStack } from 'native-base';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import { useGetUserCourseStatisticQuery } from 'src/services/statistic/statistic';

import LessonRawPreview from './lessonRawPreview';
import LessonStatistic from './lessonSessionStatistic';

function CourseStatistic() {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const [selectedlessonId, setSelectedlessonId] = useState<string | undefined>();
  if (!courseId) return <ErrorPage />;

  const { data: statistic, isLoading } = useGetUserCourseStatisticQuery(courseId);

  const selectedLessonStats = useMemo(() => {
    if (selectedlessonId && statistic) {
      return statistic.find((lesson) => lesson.lessonId === selectedlessonId);
    }
    return undefined;
  }, [selectedlessonId]);

  if (!statistic || isLoading) return <Spinner />;

  if (!selectedLessonStats) {
    return (
      <View h={'90%'}>
        <Button
          onPress={() => navigate(`/course/${courseId}`)}
          bg={'coolGray.100'}
          leftIcon={<ArrowBackIcon />}
          alignSelf={'flex-start'}
          variant={'unstyled'}
          marginBottom={'18px'}
        >
          <Text bold>Go back</Text>
        </Button>
        <ScrollView>
          <VStack w={'100%'} flex={'1'} space={'4'}>
            {statistic.map((lessonStats) => (
              <LessonRawPreview lessonStats={lessonStats} onPress={setSelectedlessonId} />
            ))}
          </VStack>
        </ScrollView>
      </View>
    );
  }
  return (
    <View h={'90%'}>
      <Button
        onPress={() => setSelectedlessonId(undefined)}
        bg={'coolGray.100'}
        leftIcon={<ArrowBackIcon />}
        alignSelf={'flex-start'}
        variant={'unstyled'}
        marginBottom={'6px'}
      >
        <Text bold>Go back</Text>
      </Button>
      <LessonStatistic lessonStats={selectedLessonStats} />
    </View>
  );
}

export default CourseStatistic;
