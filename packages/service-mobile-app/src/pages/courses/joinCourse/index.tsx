import { AxiosError } from 'axios';
import { Box, Button, HStack, Heading, Image, Text, VStack } from 'native-base';
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { useNavigate, useParams } from 'react-router-native';
import { useGetCourseByIdQuery, useJoinCourseMutation } from 'src/services/course/course';

const JoinCourse = (): JSX.Element => {
	const { id } = useParams();
	const { data, isLoading } = useGetCourseByIdQuery(id!);
	const [joinCourse, { isLoading: isJoinCourseLoading }] = useJoinCourseMutation();

	const goHome = () => navigate('/home');

	const navigate = useNavigate();
	const showToast = (body: ToastShowParams): void => Toast.show(body);


	const handleJoinCourse = async () => {
		try {
			await joinCourse(id!).unwrap();
			showToast({
				type: 'success',
				text1: 'Success',
				text2: 'You have successfully logged in',
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
			<Box borderRadius="24px" borderColor="coolGray.200" borderWidth={1} size="xs">
				<Box w="full" bg="#02539d" py="24px" borderTopRadius="24px">
					<Heading textAlign="center" size="lg" color="white">
						{data.title}
					</Heading>
				</Box>
				<Box w="full" flex="1" p="6">
					<VStack h="100%" w="100%" justifyContent="center" alignItems="center" space="md">
						<Image w={100} h={100} alt="picture" source={{ uri: data.picture }} />
						<Text fontSize="sm" color="coolGray.900">
							{data.description}
						</Text>
					</VStack>
				</Box>
			</Box>
			<VStack space="md" alignItems="center">
				<Heading size="lg" textAlign="center">
					Join this course ?
				</Heading>
				<HStack space="md">
					<Button
						onPress={handleJoinCourse}
						isLoading={isJoinCourseLoading}
						bg="green.600"
						color="white"
						py="8px"
						px="24px"
						borderRadius="4px"
					>
						Yes
					</Button>
					<Button onPress={goHome} bg="red.600" color="white" py="8px" px="24px" borderRadius="4px">
						No
					</Button>
				</HStack>
			</VStack>
			<Toast />
		</VStack>
	);
};

export default JoinCourse;
