import { Image, Pressable, Text } from 'native-base';
import { useState } from 'react';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function borderColor(currentId: string, selectAnswerId?: string, trueAnswerId?: string) {
  if (trueAnswerId !== undefined) {
    if (selectAnswerId !== trueAnswerId && selectAnswerId === currentId) return 'red';
    if (currentId === trueAnswerId) return 'green';
  } else if (currentId === selectAnswerId) {
    return '#876BF6';
  }
  return '#D9D9D9';
}

function SquareChoice({ answers, correctAnswer, setAnswer }: FactoryComponentInterface) {
  const [selectAnswer, setSelectAnswer] = useState<string | undefined>(undefined);

  return (
    <>
      {answers.map((answer) => (
        <Pressable
          key={answer.id}
          disabled={correctAnswer !== undefined}
          width="48%"
          paddingY="45px"
          borderRadius={12}
          borderWidth={4}
          justifyContent="center"
          alignItems="center"
          marginBottom={5}
          style={{ borderColor: borderColor(answer.id, selectAnswer, correctAnswer) }}
          onPress={() => {
            setAnswer(answer.id);
            setSelectAnswer(answer.id);
          }}
        >
          {answer.picture ? (
            <Image w={100} h={100} alt="picture" resizeMode="contain" source={{ uri: answer.picture }} />
          ) : (
            <Text style={{ fontWeight: '500', fontSize: 20 }}>{answer.data}</Text>
          )}
        </Pressable>
      ))}
    </>
  );
}

export default SquareChoice;
