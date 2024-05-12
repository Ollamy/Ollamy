import { Button, Heading, Input, ScrollView, Text, VStack } from 'native-base';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-native';
import CourseRowButton from 'src/components/Buttons/CourseRowButton/CourseRowButton';
import { useGetUserCoursesQuery } from 'src/services/user/user';

function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');

  const { data, isFetching } = useGetUserCoursesQuery();

  const filteredCourseData = useMemo(() => {
    if (!data || isFetching) return [];
    return data.courses.filter((c) => c.title.toLowerCase().includes(inputValue.toLowerCase()));
  }, [inputValue, data, isFetching]);

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <VStack w="100%" flex="1" space="4">
      <Input
        py="12px"
        fontSize="md"
        placeholder="Search for a course"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button variant="secondary" onPress={() => navigate('/course/find')}>
        Join a new course
      </Button>

      <Heading>My courses</Heading>

      <ScrollView>
        <VStack w="100%" flex="1" space="4">
          {filteredCourseData.length > 0 ? (
            filteredCourseData.map((course) => <CourseRowButton key={course.id} course={course} />)
          ) : (
            <Text fontSize="md" color="coolGray.700">
              No course found.
            </Text>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default Home;
