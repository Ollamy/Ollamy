import { Button, Pressable } from 'native-base';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import ProgressBar from 'src/components/ProgressBar';
import { CourseInfo } from 'src/services/course/course.dto';

const CourseRowButton = ({ course }: { course: CourseInfo }) => {
	const navigate = useNavigate();

	return (
		<Pressable w="100%" onPress={() => navigate(`/course/${course.id}`)}>
			<View
				style={{
					...styles.courseContainer,
					backgroundColor: course.color,
				}}
			>
				<Image width={48} height={48} resizeMode="contain" source={{ uri: course.picture }} />
				<View style={styles.courseTextsContainer}>
					<Text style={{ fontWeight: '600', fontSize: 14 }}>{course.title}</Text>
					{course.progress > 0 ? (
						<>
							<Text style={{ fontSize: 12 }}>{(course.progress * 100).toFixed(0)}% completed</Text>
							<ProgressBar progress={course.progress} />
						</>
					) : (
						<Text style={styles.startCourseLink}>Get started now</Text>
					)}
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	courseContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		gap: 10,
		padding: 12,
		borderRadius: 12,
	},
	courseTextsContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: 8,
	},
	startCourseLink: {
		color: '#005BE2',
		fontSize: 12,
		fontWeight: '600',
	},
});

export default CourseRowButton;
