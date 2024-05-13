import { Button, Heading, Input, VStack } from 'native-base';
import { useCallback, useState } from 'react';
import type { ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { useNavigate } from 'react-router-dom';
import { useJoinCourseMutation } from 'src/services/course/course';

function FindCourse() {
  const [joinCourse, { isLoading: isJoinCourseLoading }] = useJoinCourseMutation();
  const [code, setCourse] = useState<string>('');
  const navigate = useNavigate();

  const showToast = (body: ToastShowParams): void => Toast.show(body);

  const handleClick = useCallback(async () => {
    try {
      await joinCourse({ code }).unwrap();

      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Course joined successfully',
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
    console.log(code);
  }, [code, joinCourse, navigate]);

  return (
    <VStack h={'100%'} space={6} justifyContent={'center'}>
      <Heading>Course code</Heading>
      <Input size={'2xl'} placeholder={'ex: KHJR'} onChangeText={setCourse} />
      <Button onPress={handleClick} isLoading={isJoinCourseLoading}>
        Join this course
      </Button>
    </VStack>
  );
}

export default FindCourse;
