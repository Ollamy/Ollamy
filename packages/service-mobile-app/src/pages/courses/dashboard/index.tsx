import { ArrowBackIcon, Button, Heading, ScrollView, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem';
import { LessonStatus } from 'src/components/VerticalProgressBar';
import { useGetCourseByIdQuery, useGetCourseSectionsQuery } from 'src/services/course/course';

export interface CourseSection {
	id: string;
	title: string;
	status: LessonStatus;
}

const CourseDashboard = (): JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data: sectionsData, isFetching: isSectionsDataFetching } = useGetCourseSectionsQuery(id!);
	const { data: courseData, isFetching: isCourseDataFetching } = useGetCourseByIdQuery(id!);

	const sections = useMemo<CourseSection[]>(() => {
		if (!sectionsData) return [];
		const lastSectionIndex = sectionsData.findIndex((s) => s.id === courseData?.lastSectionId);

		return sectionsData.map((s, i) => ({
			...s,
			status:
				lastSectionIndex !== -1
					? i < lastSectionIndex
						? LessonStatus.COMPLETED
						: i === lastSectionIndex
						? LessonStatus.IN_PROGRESS
						: LessonStatus.NOT_STARTED
					: LessonStatus.NOT_STARTED,
		}));
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
};

export default CourseDashboard;
