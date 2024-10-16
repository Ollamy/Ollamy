import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { Circle, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';
import type { GetAnswerRequest } from 'src/services/question/question.dto';

function MultipleChoice({ answers, correctAnswer, answer, setAnswer }: FactoryComponentInterface) {
  const onPress = (a: GetAnswerRequest) => {
    if (!correctAnswer) {
      setAnswer(a.id);
    }
  };

  return (
    <VStack space={4} w={'full'}>
      {answers.map((a) => (
        <Pressable
          onPress={() => onPress(a)}
          key={a.id}
          id={a.id}
          borderRadius={8}
          borderWidth={1}
          borderColor={
            answer === a.id && !correctAnswer
              ? '#2C8DE7'
              : correctAnswer === a.id
              ? '#3BB765'
              : correctAnswer && answer !== correctAnswer && answer === a.id
              ? '#EB6161'
              : '#303030'
          }
          background={
            correctAnswer === a.id
              ? '#3BB765'
              : correctAnswer && answer !== correctAnswer && answer === a.id
              ? '#EB6161'
              : 'white'
          }
        >
          <HStack p={4} w={'full'} alignItems={'center'} justifyContent={'space-between'} space={4}>
            <Circle
              borderWidth={1}
              borderColor={answer === a.id ? '#2C8DE7' : '#303030'}
              padding={1}
              boxSize={6}
              opacity={correctAnswer ? 0 : 1}
            >
              {answer === a.id && <Circle size={4} bg={'#2C8DE7'} />}
            </Circle>
            <Text
              flex={1}
              color={
                correctAnswer && answer !== correctAnswer && answer === a.id
                  ? 'white'
                  : answer === a.id && !correctAnswer
                  ? '#2C8DE7'
                  : correctAnswer === a.id
                  ? 'white'
                  : '#303030'
              }
              fontWeight={'bold'}
            >
              {a.data}
            </Text>

            {correctAnswer === a.id ? (
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
