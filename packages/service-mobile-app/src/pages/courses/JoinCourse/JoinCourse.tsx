import { Box, Heading, HStack, Image, ScrollView, Text, VStack } from 'native-base';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import YesNoButton from 'src/components/Buttons/YesNoButton/YesNoButton';
import { useGetCourseByIdQuery, useJoinCourseMutation } from 'src/services/course/course';

function JoinCourse(): JSX.Element {
  const { id } = useParams();
  const { data, isLoading } = useGetCourseByIdQuery(id!);
  const [joinCourse, { isLoading: isJoinCourseLoading }] = useJoinCourseMutation();
  const navigate = useNavigate();

  const goHome = () => navigate('/home');

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const handleJoinCourse = async () => {
    try {
      await joinCourse(id!).unwrap();
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Course joined successfully',
        visibilityTime: 2000,
        onHide: () => navigate('/home'),
      });
    } catch (error) {
      showToast({
        type: 'error',
        text1: 'An error occurred',
        text2: 'Could not join course',
        visibilityTime: 2000,
        onHide: () => navigate('/home'),
      });
    }
  };

  if (!data && !isLoading) {
    return (
      <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
        <Text>Course not found</Text>
      </VStack>
    );
  }

  if (isLoading || !data) {
    return (
      <VStack justifyContent="center" alignItems="center" w="100%" h="100%">
        <Text>Loading...</Text>
      </VStack>
    );
  }

  return (
    <VStack justifyContent="center" alignItems="center" w="100%" h="100%" space="xl">
      <Box borderRadius="12px" borderColor="coolGray.200" borderWidth={1} size="xs">
        <Box w="full" bg="#02539d" py="24px" borderTopRadius="12px">
          <Heading textAlign="center" size="lg" color="white">
            {data.title}
          </Heading>
        </Box>
        <Box w="full" flex="1" p="6">
          <ScrollView w="full" h="full">
            <VStack h="100%" w="100%" justifyContent="center" alignItems="center" space="md">
              <Image w={100} h={100} alt="picture" resizeMode="contain" source={{ uri: data.picture }} />
              <Text fontSize="md" color="coolGray.900">
                {data.description}
              </Text>
            </VStack>
          </ScrollView>
        </Box>
      </Box>
      <VStack space="md" alignItems="center">
        <Heading size="lg" textAlign="center">
          Join this course ?
        </Heading>
        <HStack space="lg">
          <YesNoButton variant="Yes" onPress={handleJoinCourse} isLoading={isJoinCourseLoading} />
          <YesNoButton variant="No" onPress={goHome} />
        </HStack>
      </VStack>
      <Toast />
    </VStack>
  );
}

export default JoinCourse;
