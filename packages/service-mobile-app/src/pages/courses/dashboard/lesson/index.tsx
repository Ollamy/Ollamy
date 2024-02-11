import { useState } from 'react';
import { View } from 'native-base';

import Lecture from './lecture';
import Quiz from './quiz';
import { useParams } from 'react-router-native';

function Lesson() {
	const { lessonId } = useParams();
	const [isLectureFinish, setIsLectureFinish] = useState(false);


	if (!lessonId) return <></>;
	return (
		<View>
			{!isLectureFinish ? (
				<Lecture lessonId={lessonId} setLectureState={setIsLectureFinish} />
			) : (
				<Quiz lessonId={lessonId} />
			)}
		</View>
	);
}

export default Lesson;
