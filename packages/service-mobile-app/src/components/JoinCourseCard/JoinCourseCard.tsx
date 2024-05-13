import { Box, Heading, HStack, Image, ScrollView, Text, VStack } from 'native-base';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-native';
import YesNoButton from 'src/components/Buttons/YesNoButton/YesNoButton';
import { useJoinCourseMutation } from 'src/services/course/course';

interface CourseData {
  title: string;
  description: string;
  picture: string;
}

interface JoinCourseCardProps {
  id: string;
  data: CourseData;
}

function JoinCourseCard({ id, data }: JoinCourseCardProps) {
  const [joinCourse, { isLoading: isJoinCourseLoading }] = useJoinCourseMutation();
  const navigate = useNavigate();

  const showToast = (body: ToastShowParams): void => Toast.show(body);
  const goHome = () => navigate('/home');

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

  return (
    <VStack justifyContent="center" alignItems="center" w="100%" space="xl">
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

export default JoinCourseCard;
