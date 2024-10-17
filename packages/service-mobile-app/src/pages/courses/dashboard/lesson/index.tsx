import { Spinner, View } from 'native-base';
import React, { useState } from 'react';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useParams } from 'react-router-native';
import ErrorPage from 'src/components/ErrorPage/ErrorPage';
import { useCreateSessionMutation } from 'src/services/session/section';
import type { CreateSessionResponse } from 'src/services/session/session.dto';

import Lecture from './lecture/LessonLecture';
import Quiz from './quiz';

function Lesson() {
  const { lessonId } = useParams();
  const [session, setSession] = useState<CreateSessionResponse | undefined>(undefined);
  const [isLectureFinish, setIsLectureFinish] = useState(false);
  const [createSession] = useCreateSessionMutation();
  const showToast = (body: ToastShowParams): void => Toast.show(body);

  if (!lessonId) return <ErrorPage />;

  const StartQuiz = async (lectureFinish: boolean) => {
    if (lectureFinish) {
      try {
        const newSession = await createSession(lessonId).unwrap();
        setSession(newSession);
        setIsLectureFinish(true);
      } catch (error) {
        showToast({
          type: 'error',
          text1: 'An error occurred',
          text2: 'Could not create quiz Session',
          visibilityTime: 2000,
        });
      }
    }
  };

  return (
    <View>
      {!isLectureFinish ? (
        <Lecture lessonId={lessonId} setLectureState={StartQuiz} />
      ) : session ? (
        <Quiz sessionId={session.sessionId} sessionQuestionId={session.currentQuestionId} />
      ) : (
        <Spinner />
      )}
      <Toast />
    </View>
  );
}

export default Lesson;
