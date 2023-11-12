import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

import Lecture from './lecture';

function Course() {
	const courseId = '';
	const [isLectureFinish, setIsLectureFinish] = useState(false);

	return (
		<View>
			{!isLectureFinish ? (
				<Lecture courseId={courseId} setLectureState={setIsLectureFinish} />
			) : (
				<Text style={styles.horizontalContainer}>Quiz</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		gap: 24,
		alignItems: 'center',
	},
	horizontalContainer: {
		paddingTop: '50%',
		alignSelf: 'center',
	},
});

export default Course;
