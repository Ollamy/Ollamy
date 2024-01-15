import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { Spinner, View } from 'native-base';
import IconButton from 'src/components/buttons/iconButton';
import ProgressBar from 'src/components/progressBar';
import TopBarContainer from 'src/components/topBarContainer';
import { useGetLessonQuestionsQuery } from 'src/services/lesson';
import { useValidateAnswerMutation } from 'src/services/question';

import Question from './question';

interface QuizProps {
	lessonId: string;
}

function Quiz({ lessonId }: QuizProps) {
	const navigate = useNavigate();
	const [currentQuestionId, setCurrentQuestionId] = useState<string | undefined>(undefined);
	const [currentQuestionOrder, setCurrentQuestionOrder] = useState<number>(0);
	const [currentErrorNumber, setCurrentErrorNumber] = useState<number>(0);

	const { data: questions } = useGetLessonQuestionsQuery({ id: lessonId });
	const [validate] = useValidateAnswerMutation();

	useEffect(() => {
		if (questions && questions.length > 0) setCurrentQuestionId(questions[0].id);
	}, [questions]);

	if (questions === undefined || currentQuestionId === undefined) return <Spinner />;

	const numberQuestion = questions.length;

	const handleNext = async (answerId: string, questionId: string) => {
		try {
			const data = await validate({ answerId, questionId }).unwrap();
			if (data.end) navigate('/home');

			if (!data.success) setCurrentErrorNumber(currentErrorNumber + 1);
			setCurrentQuestionId(data.nextQuestionId);
			setCurrentQuestionOrder(currentQuestionOrder + 1);
		} catch (error) {
			console.error('rejected', error);
		}
	};
	return (
		<View>
			<TopBarContainer style={{ display: 'flex', justifyContent: 'flex-start', gap: 32 }}>
				<>
					<IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
					<ProgressBar progress={currentQuestionOrder / numberQuestion} width={220} height={15} />
				</>
			</TopBarContainer>
			<Question questionId={currentQuestionId} nextQuestion={handleNext} />
		</View>
	);
}

export default Quiz;
