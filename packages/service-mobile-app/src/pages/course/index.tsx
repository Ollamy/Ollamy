import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

import Lecture from './lecture';
import Quiz from './quiz';

function Course() {
	const courseId = '';
	const [isLectureFinish, setIsLectureFinish] = useState(false);
	const [isQuizFinish, setQuizFinish] = useState(false);

	return (
		<View>
			{!isLectureFinish ? (
				<Lecture courseId={courseId} setLectureState={setIsLectureFinish} />
			) : (
				<Quiz courseId={courseId} setQuizState={setQuizFinish}/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});

export default Course;
