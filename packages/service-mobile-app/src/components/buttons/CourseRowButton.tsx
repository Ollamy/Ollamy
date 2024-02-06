import { HStack, Pressable } from 'native-base';
import { Image, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import { UserCourse } from 'src/services/user/user.dto';

const CourseRowButton = ({ course }: { course: UserCourse }) => {
	const navigate = useNavigate();

	return (
		<Pressable w="100%" onPress={() => navigate(`/course/${course.id}`)}>
			<HStack alignItems="center" w="full" space="10px" p="12px" rounded="md" borderColor="gray.100" borderWidth={1}>
				<Image width={48} height={48} resizeMode="contain" source={{ uri: course.picture_id }} />
				<Text style={{ fontWeight: '600', fontSize: 14 }}>{course.title}</Text>
			</HStack>
		</Pressable>
	);
};

export default CourseRowButton;
