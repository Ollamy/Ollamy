import { Button, Heading, Input, VStack } from 'native-base';
import { useCallback, useState } from 'react';

function FindCourse() {
  const [course, setCourse] = useState<string>('');

  const handleClick = useCallback(() => {
    console.log(course);
  }, [course]);

  return (
    <VStack h="100%" space={6} justifyContent="center">
      <Heading>Course code</Heading>
      <Input size="2xl" placeholder="ex: KHJR" onChangeText={setCourse} />
      <Button onPress={handleClick}>Join this course</Button>
    </VStack>
  );
}

export default FindCourse;
