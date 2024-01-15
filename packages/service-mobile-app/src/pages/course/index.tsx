import { useState } from 'react';
import { View } from 'native-base';

import Lecture from './lecture';
import Quiz from './quiz';

function Course() {
	const lessonId = 'cdcb1351-bd68-4b05-a69d-8ceb52effb31';
	const [isLectureFinish, setIsLectureFinish] = useState(false);

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

export default Course;
