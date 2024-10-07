import { Image, Pressable, Text } from 'native-base';
import { useState } from 'react';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

interface SquareColor {
  borderColor: string;
  background: string;
  textColor: string;
}

function getSquareColors(currentId: string, selectAnswerId?: string, trueAnswerId?: string): SquareColor {
  if (trueAnswerId !== undefined) {
    if (selectAnswerId !== trueAnswerId && selectAnswerId === currentId)
      return { borderColor: '#F4ADAD', background: '#F7CDCD', textColor: '#530000' };
    if (currentId === trueAnswerId) return { borderColor: '#3BB765', background: '#D1FED9', textColor: '#002F08' };
  } else if (currentId === selectAnswerId) {
    return { borderColor: '#F7AC16', background: 'white', textColor: '#1d0040' };
  }
  return { borderColor: '#D9D9D9', background: 'white', textColor: 'black' };
}

function SquareChoice({ answers, correctAnswer, setAnswer }: FactoryComponentInterface) {
  const [selectAnswer, setSelectAnswer] = useState<string | undefined>(undefined);

  return (
    <>
      {answers.map((answer) => {
        const squareColor = getSquareColors(answer.id, selectAnswer, correctAnswer);
        return (
          <Pressable
            key={answer.id}
            disabled={correctAnswer !== undefined}
            width={'48%'}
            paddingY={'45px'}
            borderRadius={12}
            borderWidth={4}
            justifyContent={'center'}
            alignItems={'center'}
            marginBottom={5}
            style={{ borderColor: squareColor.borderColor, backgroundColor: squareColor.background }}
            onPress={() => {
              setAnswer(answer.id);
              setSelectAnswer(answer.id);
            }}
          >
            {answer.picture ? (
              <Image w={100} h={100} alt={'picture'} resizeMode={'contain'} source={{ uri: answer.picture }} />
            ) : (
              <Text style={{ fontWeight: '500', fontSize: 20, color: squareColor.textColor }}>{answer.data}</Text>
            )}
          </Pressable>
        );
      })}
    </>
  );
}

export default SquareChoice;
