import { Text, VStack } from 'native-base';
import { useParams } from 'react-router-native';
import JoinCourseCard from 'src/components/JoinCourseCard/JoinCourseCard';
import { useGetCourseByIdQuery } from 'src/services/course/course';

function JoinCourse(): JSX.Element {
  const { id } = useParams();
  const { data, isLoading } = useGetCourseByIdQuery(id!);

  if (!data && !isLoading) {
    return (
      <VStack justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
        <Text>Course not found</Text>
      </VStack>
    );
  }

  if (isLoading || !data) {
    return (
      <VStack justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
        <Text>Loading...</Text>
      </VStack>
    );
  }

  return <JoinCourseCard data={data} id={id!} />;
}

export default JoinCourse;
