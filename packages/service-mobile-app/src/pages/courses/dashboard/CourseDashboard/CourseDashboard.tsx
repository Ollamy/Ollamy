import { ArrowBackIcon, Button, Heading, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem/LessonListItem';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';
import { useJoinSectionMutation } from 'src/services/section/section';
import type { SectionResponse } from 'src/services/section/section.dto';

import { Status } from '../../types';

type SectionFormated = (SectionResponse & { last?: boolean })[];

function CourseDashboard(): JSX.Element {
  const navigate = useNavigate();
  const showToast = (body: ToastShowParams): void => Toast.show(body);
  const [joinSection] = useJoinSectionMutation();

  const { id } = useParams();

  const { data: sectionsData, isFetching: isSectionsDataFetching } = useGetCourseSectionsQuery(id!);
  const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(id!);

  const sections: SectionFormated = useMemo(() => {
    if (!sectionsData) return [];

    const lastIdx = sectionsData.findIndex((e) => e.status !== Status.COMPLETED);

    if (lastIdx !== -1 && sectionsData[lastIdx].status !== Status.IN_PROGRESS) {
      const tmp: SectionFormated = sectionsData.concat();
      tmp[lastIdx] = { ...tmp[lastIdx], status: Status.IN_PROGRESS, last: true };
      return tmp;
    }

    return sectionsData;
  }, [sectionsData]);

  if (isSectionsDataFetching || isCourseDataFetching) return <Text>Loading...</Text>;
  if (!isCourseDataFetching && !courseData) return <Text>Course not found</Text>;

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
              onPress={() => handleJoinSection(section.id, section.last)}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default CourseDashboard;
