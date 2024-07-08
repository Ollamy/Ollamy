import { ScrollView, Spinner, View, VStack } from 'native-base';
import React, { createElement, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import TextButton from 'src/components/Buttons/TextButton';
import { quizFactory } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';
import QuestionDifficulty from 'src/pages/courses/dashboard/lesson/quiz/question/questionDifficulty';
import QuestionTitle from 'src/pages/courses/dashboard/lesson/quiz/question/questionTitle';
import { useGetAnswerQuery, useGetQuestionQuery, useValidateAnswerMutation } from 'src/services/question/question';
import { AnswerType } from 'src/services/question/question.dto';
import { useValidateQuestionMutation } from 'src/services/session/section';

interface QuestionProps {
  questionId: string;
  sessionId: string;
  nextQuestion: () => void;
  setNextQuestionId: (id: string | undefined) => void;
  setIsEnd: (isEnd: boolean) => void;
  setCurrentErrorNumber: React.Dispatch<React.SetStateAction<number>>;
}

function Question({
  questionId,
  sessionId,
  nextQuestion,
  setNextQuestionId,
  setIsEnd,
  setCurrentErrorNumber,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [trueAnswer, setTrueAnswer] = useState<string | undefined>(undefined);

  const [validate] = useValidateQuestionMutation();

  const { data: question } = useGetQuestionQuery({ id: questionId });
  const { data: answers } = useGetAnswerQuery({ id: questionId });

  useEffect(() => {
    setTrueAnswer(undefined);
    setSelectedAnswer(undefined);
  }, [questionId]);

  if (question === undefined || answers === undefined) return <Spinner />;

  const validateAnswer = async (answer: string, answerType: AnswerType) => {
    try {
      const data = await validate({
        sessionId,
        body: {
          questionId,
          answer: {
            id: answerType === AnswerType.FREE_ANSWER ? undefined : answer,
            data: answerType === AnswerType.FREE_ANSWER ? answer : undefined,
          },
        },
      }).unwrap();
      setNextQuestionId(data.nextQuestionId ?? undefined);
      setTrueAnswer(data.answerId);
      setIsEnd(!data.nextQuestionId);
      Keyboard.dismiss();
      if (!data.success) setCurrentErrorNumber((old) => old + 1);
    } catch (error) {
      console.error('rejected', error);
    }
  };
  return (
    <VStack height={'100%'} space={'24px'} marginTop={23} paddingX={'20px'}>
      {question.difficulty && <QuestionDifficulty difficulty={question.difficulty} />}
      <QuestionTitle title={question.title} />
      <View maxHeight={'35%'}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {createElement(quizFactory[question.typeAnswer], {
            answer: selectedAnswer,
            answers,
            setAnswer: (answer) => setSelectedAnswer(answer),
            correctAnswer: trueAnswer,
          })}
        </ScrollView>
      </View>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <TextButton
          disabled={selectedAnswer === undefined}
          title={trueAnswer !== undefined ? 'Next' : 'Submit'}
          onPress={() =>
            selectedAnswer &&
            (trueAnswer !== undefined ? nextQuestion() : validateAnswer(selectedAnswer, question.typeAnswer))
          }
          rightIconName={'arrow-forward'}
        />
      </View>
    </VStack>
  );
}

export default Question;
