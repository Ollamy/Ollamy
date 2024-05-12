import { Input, Skeleton, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import JoinCourseCard from 'src/components/JoinCourseCard/JoinCourseCard';
import { useGetCourseByIdQuery } from 'src/services/course/course';
import type { CourseResponse } from 'src/services/course/course.dto';

function FindCourse() {
  const [course, setCourse] = useState<string>('');

  const [courseData, setCourseData] = useState<CourseResponse | undefined>();

  const { data, isFetching } = useGetCourseByIdQuery(course);

  useEffect(() => {
    console.log({ data });

    if (data) {
      setCourseData(data);
    }
  }, [data]);

  return (
    <VStack space={6} alignItems="center">
      <Input placeholder="Find a course..." onChangeText={setCourse} />
      {courseData ? <JoinCourseCard id={course} data={courseData} /> : null}
      {isFetching ? <Skeleton h="200" w="80" /> : null}
    </VStack>
  );
}

export default FindCourse;
