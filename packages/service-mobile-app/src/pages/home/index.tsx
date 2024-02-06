import { Heading, Input, ScrollView, Text, VStack } from 'native-base';
import { useGetUserCoursesQuery } from 'src/services/user/user';
import { useMemo, useState } from 'react';
import CourseRowButton from 'src/components/buttons/CourseRowButton';

function Home() {
	const [inputValue, setInputValue] = useState<string>('');

	const { data, isFetching } = useGetUserCoursesQuery();

	const filteredCourseData = useMemo(() => {
		if (!data || isFetching) return [];
		return data.courses.filter((c) => c.title.toLowerCase().includes(inputValue.toLowerCase()));
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
