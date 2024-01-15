import { ArrowBackIcon, Box, Button, Heading, Icon, ScrollView, Text, VStack } from 'native-base';
import { useNavigate, useParams } from 'react-router-native';
import LessonListItem from 'src/components/LessonListItem';
import { LessonStatus } from 'src/components/VerticalProgressBar';

export interface CourseSection {
	id: string;
	title: string;
	status: LessonStatus;
	image: string;
}

const SECTION_DATA: CourseSection[] = [
	{
		id: 'f075c4f6-8f84-4986-9f6b-ddd81955e1ef2',
		title: 'Introduction',
		status: LessonStatus.COMPLETED,
		image: '',
	},
	{
		id: 'a88daaea-ddf5-4a8f-8e67-b2701002650f3',
		title: 'Getting Started',
		status: LessonStatus.COMPLETED,
		image: '',
	},
	{
		id: '18fadcbf-bbe0-4caf-85f1-10836ab93c514',
		title: 'The Basics',
		status: LessonStatus.IN_PROGRESS,
		image: '',
	},
	{
		id: 'a099102d-d19b-4aee-a117-f6496a3355115',
		title: 'Advanced Concepts',
		status: LessonStatus.NOT_STARTED,
		image: '',
	},
	{
		id: '7afe4fd2-efdf-48c2-9726-d505171a97c22',
		title: 'Final Exam',
		status: LessonStatus.NOT_STARTED,
		image: '',
	},
];

const CourseDashboard = (): JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams();
	const indexToAlignSelf = (index: number) => {
		return index % 4 === 0 ? 'flex-start' : index % 4 === 1 || index % 4 === 3 ? 'center' : 'flex-end';
	};

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
			<Heading size="lg">Learn React in 10 minutes</Heading>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack mt={4}>
					{SECTION_DATA.map((section, idx) => (
						<LessonListItem key={section.id} itemName='Section' index={idx} lesson={section} onPress={() => navigate(`/course/${id}/section/${section.id}`)} />
					))}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default CourseDashboard;
