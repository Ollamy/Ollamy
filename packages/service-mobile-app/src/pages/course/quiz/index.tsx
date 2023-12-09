import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Image, ScrollView, Text, View } from 'native-base';
import TopBarContainer from 'src/components/topBarContainer';
import { useNavigate } from 'react-router-native';
import IconButton from 'src/components/buttons/iconButton';

// @ts-ignore
import STAR from '../../../../assets/icons/star.png';
import TextButton from 'src/components/buttons/textButton';
import ProgressBar from 'src/components/progressBar';

interface Question {
	id: number;
	title: string;
	answers: string[];
	difficulty: number;
	isLast: boolean;
}

interface QuizProps {
	courseId: string;
	setQuizState: (v: boolean) => void;
}

const mockQuestions: Question[] = [
	{
		id: 0,
		title: 'What is the capital of France?',
		answers: ['Paris', 'London', 'Berlin', 'Rome'],
		difficulty: 3,
		isLast: false,
	},
	{
		id: 1,
		title: "Who wrote 'Romeo and Juliet'?",
		answers: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
		difficulty: 2,
		isLast: false,
	},
	{
		id: 2,
		title: 'What is the powerhouse of the cell?',
		answers: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic reticulum'],
		difficulty: 3,
		isLast: true,
	},
];

const mockAnswers = {
	1: 'Paris',
	2: 'William Shakespeare',
	3: 'Mitochondria',
};

function Quiz({ courseId, setQuizState }: QuizProps) {
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] = useState<Question>(mockQuestions[0]);
	const [selectAnswer, setSelectAnswer] = useState<number | undefined>(undefined);
	const numberQuestion = 3

	const handleNext = (selectAnswer: number | undefined, currentId: number, isLast: boolean) => {
		if (isLast) navigate('/home');
		setCurrentQuestion(mockQuestions[currentId + 1]);
		setSelectAnswer(undefined);
	};
	return (
		<View>
			<TopBarContainer style={{ display: 'flex', justifyContent: 'flex-start', gap: 32}}>
				<>
					<IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
					<ProgressBar progress={currentQuestion.id / 3} width={220} height={15} />
				</>
			</TopBarContainer>
			<View style={styles.body}>
				<Box style={styles.difficultyContainer}>
					{Array.from({ length: 3 }, (_, idx) => (
						<Box key={idx} height="20px" width="20px">
							<Image style={{ height: '100%', width: '100%' }} source={STAR} alt="difficulty star" />
						</Box>
					))}
				</Box>
				<Text style={styles.questionTitle}>{currentQuestion.title}</Text>
				<View style={{ maxHeight: '40%' }}>
					<ScrollView contentContainerStyle={styles.answerScrollView}>
						{currentQuestion.answers.map((answer, idx) => (
							<TouchableOpacity
								key={idx}
								style={{ ...styles.answerContainer, borderColor: selectAnswer === idx ? '#876BF6' : '#D9D9D9' }}
								onPress={() => setSelectAnswer(idx)}
							>
								<Text style={{ fontWeight: '500', fontSize: 20 }}>{answer}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
				<View style={{ alignItems: 'center', width: '100%' }}>
					<TextButton
						disabled={selectAnswer === undefined}
						title={currentQuestion.isLast ? 'Submit' : 'Next'}
						onPress={() => handleNext(selectAnswer, currentQuestion.id, currentQuestion.isLast)}
						rightIconName="arrow-forward"
					/>
				</View>
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
		paddingVertical: 60,
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

export default Quiz;
