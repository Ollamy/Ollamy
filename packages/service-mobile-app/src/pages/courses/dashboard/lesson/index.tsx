import { View } from 'native-base';
import { useState } from 'react';
import { useParams } from 'react-router-native';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';

import Lecture from './lecture/LessonLecture';
import Quiz from './quiz';

function Lesson() {
  const { lessonId } = useParams();
  const [isLectureFinish, setIsLectureFinish] = useState(false);

  if (!lessonId) return <ErrorPage />;
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
