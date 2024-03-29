// @ts-ignore
import { Pressable, ScrollView, Spinner, Text, View, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import TextButton from 'src/components/buttons/textButton';
import { useGetAnswerQuery, useGetQuestionQuery, useValidateAnswerMutation } from 'src/services/question/question';

import QuestionDifficulty from './questionDifficulty';
import QuestionTitle from './questionTitle';

interface QuestionProps {
  questionId: string;
  nextQuestion: (answerId: string, questionId: string) => void;
}

function borderColor(currentId: string, selectAnswerId?: string, trueAnswerId?: string) {
  if (trueAnswerId !== undefined) {
    if (selectAnswerId !== trueAnswerId && selectAnswerId === currentId) return 'red';
    if (currentId === trueAnswerId) return 'green';
  } else if (currentId === selectAnswerId) {
    return '#876BF6';
  }
  return '#D9D9D9';
}

function Question({ questionId, nextQuestion }: QuestionProps) {
  const [selectAnswer, setSelectAnswer] = useState<string | undefined>(undefined);
  const [trueAnswer, setTrueAnswer] = useState<string | undefined>(undefined);

  const [validate] = useValidateAnswerMutation();

  const { data: question } = useGetQuestionQuery({ id: questionId });
  const { data: answers } = useGetAnswerQuery({ id: questionId });

  useEffect(() => {
    setTrueAnswer(undefined);
    setSelectAnswer(undefined);
  }, [questionId]);
  if (question === undefined || answers === undefined) return <Spinner />;

  const validateAnswer = async (answerId: string) => {
    try {
      const data = await validate({ answerId, questionId }).unwrap();
      setTrueAnswer(data.answer);
    } catch (error) {
      console.error('rejected', error);
    }
  };
  return (
    <VStack height="100%" space="32px" marginTop={23} paddingX="20px">
      <QuestionDifficulty difficulty={2} />
      <QuestionTitle title={question.title} />
      <View maxHeight="35%">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {answers.map((answer) => (
            <Pressable
              key={answer.id}
              disabled={trueAnswer !== undefined}
              width="48%"
              paddingY="45px"
              borderRadius={12}
              borderWidth={4}
              justifyContent="center"
              alignItems="center"
              marginBottom={5}
              style={{ borderColor: borderColor(answer.id, selectAnswer, trueAnswer) }}
              onPress={() => setSelectAnswer(answer.id)}
            >
              <Text style={{ fontWeight: '500', fontSize: 20 }}>{answer.data}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <TextButton
          disabled={selectAnswer === undefined}
          title={trueAnswer !== undefined ? 'Next' : 'Submit'}
          onPress={() =>
            selectAnswer &&
            (trueAnswer !== undefined ? nextQuestion(selectAnswer, questionId) : validateAnswer(selectAnswer))
          }
          rightIconName="arrow-forward"
        />
      </View>
    </VStack>
  );
}

export default Question;
