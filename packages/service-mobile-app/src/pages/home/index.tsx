import { Heading, Input, ScrollView, Text, VStack } from 'native-base';
import { useGetUserQuery } from 'src/services/user/user';
import { useMemo, useState } from 'react';
import { CourseInfo } from 'src/services/course/course.dto';
import CourseRowButton from 'src/components/buttons/CourseRowButton';

const COURSE_DATA: CourseInfo[] = [
	{
		id: '1',
		title: 'Learn React in 10 minutes',
		picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png',
		progress: 0.58,
		color: '#E4F2FF',
	},
	{
		id: '2',
		title: 'Typescript in 8 minutes',
		picture:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
		progress: 0,
		color: '#E4EAFF',
	},
];

function Home() {
	const [inputValue, setInputValue] = useState<string>('');

	const filteredCourseData = useMemo(() => {
		return COURSE_DATA.filter((c) => c.title.toLowerCase().includes(inputValue.toLowerCase()));
	}, [inputValue]);

	return (
		<>
			<VStack w="100%" flex="1" space="8">
				<Input
					py="12px"
					fontSize="md"
					placeholder="Search for a course"
					value={inputValue}
					onChangeText={setInputValue}
				/>
				<Heading>My courses</Heading>

				<ScrollView>
					<VStack w="100%" flex="1" space="4">
						{filteredCourseData.length > 0 ? (
							filteredCourseData.map((course) => <CourseRowButton key={course.id} course={course} />)
						) : (
							<Text fontSize="md" color="coolGray.700">No course found.</Text>
						)}
					</VStack>
				</ScrollView>
			</VStack>
		</>
	);
}

export default Home;
