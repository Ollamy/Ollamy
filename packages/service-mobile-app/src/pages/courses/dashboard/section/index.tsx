import { ArrowBackIcon, Button, ScrollView, Text, VStack } from 'native-base';
import { useNavigate, useParams } from 'react-router-native';
import { LessonStatus } from 'src/components/VerticalProgressBar';
import SectionHeader from 'src/components/SectionHeader';
import LessonListItem from 'src/components/LessonListItem';
import { useGetSectionByIdQuery, useGetSectionLessonsQuery } from 'src/services/section/section';
import { useMemo } from 'react';
import { useGetCourseByIdQuery } from 'src/services/course/course';

export interface Lesson {
	id: string;
	title: string;
	status: LessonStatus;
}

interface Section {
	id: string;
	icon: string;
	title: string;
	description: string;
	lessons: Lesson[];
}

const SectionDashboard = () => {
	const { id: courseId, sectionId } = useParams();

	const { data: lessonsData, isFetching: isLessonsDataFetching } = useGetSectionLessonsQuery(sectionId!);
	const { data: sectionData, isFetching: isSectionDataFetching } = useGetSectionByIdQuery(sectionId!);
	const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(courseId!);
	const navigate = useNavigate();

	const lessons = useMemo<any[]>(() => {
		if (!lessonsData) return [];
		const lastLessonIndex = lessonsData.findIndex((s) => s.id === courseData?.lastLessonId);

		return lessonsData.map((s, i) => ({
			...s,
			status:
				lastLessonIndex !== -1
					? i < lastLessonIndex
						? LessonStatus.COMPLETED
						: i === lastLessonIndex
						? LessonStatus.IN_PROGRESS
						: LessonStatus.NOT_STARTED
					: LessonStatus.NOT_STARTED,
		}));
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
};

export default SectionDashboard;
