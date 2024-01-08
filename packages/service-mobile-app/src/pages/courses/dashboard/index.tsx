import { ArrowBackIcon, Box, Button, Heading, Icon, ScrollView, Text, VStack } from 'native-base';
import { useNavigate } from 'react-router-native';

export interface CourseSection {
	id: string;
	title: string;
	completed: boolean;
}

const SECTION_DATA: CourseSection[] = [
	{
		id: '1',
		title: 'Introduction',
		completed: true,
	},
	{
		id: '2',
		title: 'Getting Started',
		completed: true,
	},
	{
		id: '3',
		title: 'The Basics',
		completed: true,
	},
	{
		id: '4',
		title: 'Advanced Concepts',
		completed: false,
	},
	{
		id: '5',
		title: 'Final Exam',
		completed: false,
	},
];

const CourseDashboard = (): JSX.Element => {
	const navigate = useNavigate();
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
			<ScrollView>
				<VStack space={24} mt={4}>
					{SECTION_DATA.map((section, idx) => (
						<Box
							key={section.id}
							alignSelf={indexToAlignSelf(idx)}
							borderWidth={1}
							borderRadius={8}
							background={section.completed ? 'green.100' : 'amber.100'}
							borderColor={section.completed ? 'green.700' : 'amber.700'}
							p="6"
						>
							<Heading size="sm">{section.title}</Heading>
							<Text>{section.completed ? 'Completed' : 'Incomplete'}</Text>
						</Box>
					))}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default CourseDashboard;
