// @ts-ignore
import STAR from 'assets/icons/star.png';
import { Box, Image, Pressable, ScrollView, Spinner, Text, View } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import TextButton from 'src/components/buttons/textButton';
import { useGetAnswerQuery, useGetQuestionQuery, useValidateAnswerMutation } from 'src/services/question/question';

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
    <View style={styles.body}>
      <Box style={styles.difficultyContainer}>
        {Array.from({ length: 2 }, (_, idx) => (
          <Box key={idx} height="20px" width="20px">
            <Image style={{ height: '100%', width: '100%' }} source={STAR} alt="difficulty star" />
          </Box>
        ))}
      </Box>
      <Text style={styles.questionTitle}>{question.title}</Text>
      <View style={{ maxHeight: '35%' }}>
        <ScrollView contentContainerStyle={styles.answerScrollView}>
          {answers.map((answer) => (
            <Pressable
              key={answer.id}
              disabled={trueAnswer !== undefined}
              style={{ ...styles.answerContainer, borderColor: borderColor(answer.id, selectAnswer, trueAnswer) }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    gap: 32,
    marginTop: 23,
    paddingHorizontal: 20,
  },
  difficultyContainer: {
    width: 'auto',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECE6FC',
  },
  answerScrollView: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  answerContainer: {
    width: '48%',
    paddingVertical: 45,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#D9D9D9',
    justifyContent: 'center',

    alignItems: 'center',
    marginBottom: 20,
  },
  questionTitle: {
    alignSelf: 'center',

    color: '#876BF6',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24,
  },
});

export default Question;
