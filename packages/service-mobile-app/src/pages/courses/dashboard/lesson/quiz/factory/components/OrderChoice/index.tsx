import { Text, View, VStack } from 'native-base';
import { useMemo, useRef, useState } from 'react';
import type { View as ViewType } from 'react-native';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

import DragAndDropCard from './DragDrop';
import DragAndDropTargetCard from './DragDropTarget';

const measureComponent = (component: ViewType): Promise<{ x: number; y: number; width: number; height: number }> => {
  return new Promise((resolve) => {
    component.measure((x, y, width, height) => {
      resolve({ x, y, width, height });
    });
  });
};

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function OrderChoice({ setAnswer, correctAnswer, answers, answer, setScrollEnable }: FactoryComponentInterface) {
  const targetsBoxRef = useRef<ViewType[]>([]);

  const isAnswerCorrect = useMemo(() => {
    if (correctAnswer) {
      return answers.find((a) => a.id === correctAnswer)?.data === answer;
    }
    return false;
  }, [answer, answers, correctAnswer]);

  const listOfAnswers = useMemo(() => {
    if (answers[0].data) return shuffle(answers[0].data.split('/'));
    return [];
  }, [answers]);
  const [answersOrder, setAnswersOrder] = useState(Array(listOfAnswers.length).fill(-1));

  if (listOfAnswers.length === 0) throw new Error('List of answers is empty');

  const checkCollision = async (
    idx: number,
    draggableBox: {
      left: number;
      top: number;
    },
  ): Promise<{ x: number; y: number } | null> => {
    // eslint-disable-next-line no-restricted-syntax
    for (const currentRef of targetsBoxRef.current) {
      if (answersOrder[currentRef.context.idx] === -1) {
        // eslint-disable-next-line no-await-in-loop
        const { x, y, width, height } = await measureComponent(currentRef);
        const targetBox = {
          left: x,
          top: y,
          right: x + width,
          bottom: y + height,
        };

        // Check if boxes intersect
        if (
          draggableBox.left - (width + 30) >= targetBox.left &&
          draggableBox.left - (width + 30) <= targetBox.right &&
          draggableBox.top >= targetBox.top &&
          draggableBox.top <= targetBox.bottom
        ) {
          answersOrder[currentRef.context.idx] = idx;
          setAnswersOrder(answersOrder);

          if (answersOrder.every((v) => v !== -1)) {
            const answersOrdered: string[] = [];
            answersOrder.forEach((v) => answersOrdered.push(listOfAnswers[v]));
            setAnswer(answersOrdered.join('/'));
          }

          return { x: width + 30, y: targetBox.top };
        }
      } else if (answersOrder[currentRef.context.idx] === idx) {
        answersOrder[currentRef.context.idx] = -1;
      }
    }
    return null;
  };

  return (
    <VStack flex={'1'} space={6}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            display: 'flex',
            height: 200,
            width: '50%',
            paddingRight: 15,
          }}
          zIndex={1000}
        >
          {listOfAnswers.map((v, idx) => (
            <DragAndDropCard
              key={v}
              heading={v}
              idx={idx}
              checkCollision={checkCollision}
              style={correctAnswer ? { borderColor: isAnswerCorrect ? '#3BB765' : 'red' } : undefined}
              setScrollEnable={setScrollEnable}
            />
          ))}
        </View>
        <View
          style={{
            display: 'flex',
            height: '100%',
            width: '50%',
            paddingLeft: 15,
          }}
        >
          {Array.from(Array(listOfAnswers.length).keys()).map((v) => (
            <DragAndDropTargetCard
              key={v}
              ref={(el) => {
                targetsBoxRef.current[v] = el;
                if (targetsBoxRef.current[v]) targetsBoxRef.current[v].context = { idx: v };
              }}
            />
          ))}
        </View>
      </View>
      {correctAnswer &&
        (!isAnswerCorrect ? (
          <Text bold fontSize={24}>
            <Text color={'red.700'} bold>
              Correct solution:{' '}
            </Text>
            <Text color={'red.500'} bold>
              '{answers.find((a) => a.id === correctAnswer)?.data?.replaceAll('/', ' ')}'
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

export default OrderChoice;
