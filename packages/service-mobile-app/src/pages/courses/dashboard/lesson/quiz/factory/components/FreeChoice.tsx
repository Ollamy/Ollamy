import { Input, Text, VStack } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function FreeChoice({ setAnswer, correctAnswer, answers, answer }: FactoryComponentInterface) {
  return (
    <VStack flex={'1'} space={6}>
      <Input
        value={answer}
        onChangeText={setAnswer}
        placeholder={'Your answer'}
        flex={'1'}
        isDisabled={!!correctAnswer}
      />
      {correctAnswer &&
        (answers.find((a) => a.id === correctAnswer)?.data !== answer ? (
          <Text bold fontSize={24}>
            <Text color={'red.700'} bold>
              Correct solution:{' '}
            </Text>
            <Text color={'red.500'} bold>
              {answers.find((a) => a.id === correctAnswer)?.data}
            </Text>
          </Text>
        ) : (
          <Text bold fontSize={24}>
            <Text color={'green.500'} bold>
              Correct !
            </Text>
          </Text>
        ))}
    </VStack>
  );
}

export default FreeChoice;
