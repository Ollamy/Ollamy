import { Input, Text, VStack } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function FreeChoice({ setAnswer, correctAnswer, answers }: FactoryComponentInterface) {
  return (
    <VStack flex={'1'}>
      <Input onChangeText={(text) => setAnswer(text)} placeholder={'Your answer'} flex={'1'} />
      {correctAnswer && (
        <Text bold fontSize={24}>
          Correct answer:{' '}
          <Text color={'green.500'} bold>
            {answers.find((a) => a.id === correctAnswer)?.data}
          </Text>
        </Text>
      )}
    </VStack>
  );
}

export default FreeChoice;
