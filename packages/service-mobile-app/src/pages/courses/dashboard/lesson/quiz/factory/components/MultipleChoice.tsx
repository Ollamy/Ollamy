import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Circle, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function MultipleChoice({ answers, correctAnswer, currentAnswer, setAnswer }: FactoryComponentInterface) {
  return (
    <VStack space={4}>
      {answers.map((answer) => (
        <Pressable
          onPress={() => setAnswer(answer.id)}
          key={answer.id}
          id={answer.id}
          p={4}
          borderRadius={8}
          borderWidth={1}
          borderColor={
            currentAnswer === answer.id && !correctAnswer
              ? '#2C8DE7'
              : correctAnswer === answer.id
              ? '#3BB765'
              : correctAnswer && currentAnswer !== correctAnswer && currentAnswer === answer.id
              ? '#EB6161'
              : '#303030'
          }
          background={
            correctAnswer === answer.id
              ? '#3BB765'
              : correctAnswer && currentAnswer !== correctAnswer && currentAnswer === answer.id
              ? '#EB6161'
              : 'white'
          }
        >
          <HStack
            w={'full'}
            alignItems={'center'}
            justifyContent={correctAnswer ? 'space-between' : undefined}
            space={24}
          >
            <Circle
              borderWidth={1}
              borderColor={currentAnswer === answer.id ? '#2C8DE7' : '#303030'}
              padding={1}
              boxSize={6}
              opacity={correctAnswer ? 0 : 1}
            >
              {currentAnswer === answer.id && <Circle size={4} bg={'#2C8DE7'} />}
            </Circle>
            <Text
              color={
                correctAnswer && currentAnswer !== correctAnswer && currentAnswer === answer.id
                  ? 'white'
                  : currentAnswer === answer.id && !correctAnswer
                  ? '#2C8DE7'
                  : correctAnswer === answer.id
                  ? 'white'
                  : '#303030'
              }
              fontWeight={'bold'}
            >
              {answer.data}
            </Text>

            {correctAnswer === answer.id ? (
              <Icon as={FontAwesome5} name={'check'} color={'white'} />
            ) : (
              <Icon as={Entypo} name={'cross'} color={'white'} />
            )}
          </HStack>
        </Pressable>
      ))}
    </VStack>
  );
}

export default MultipleChoice;
