import { View } from 'native-base';
import { useState } from 'react';
import { useParams } from 'react-router-native';

import Lecture from './lecture';
import Quiz from './quiz';

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
