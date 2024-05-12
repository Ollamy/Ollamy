import { Radio, Text, VStack } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function MultipleChoice({ answers, correctAnswer, setAnswer }: FactoryComponentInterface) {
  return (
    <VStack space={12}>
      <Radio.Group name="answers" onChange={(value: string) => setAnswer(value)}>
        {answers.map((answer) => (
          <Radio value={answer.id} my={1} key={answer.id}>
            {answer.data}
          </Radio>
        ))}
      </Radio.Group>

      {correctAnswer && (
        <Text bold fontSize={24}>
          Correct answer:{' '}
          <Text color="green.500" bold>
            {answers.find((a) => a.id === correctAnswer)?.data}
          </Text>
        </Text>
      )}
    </VStack>
  );
}

export default MultipleChoice;
