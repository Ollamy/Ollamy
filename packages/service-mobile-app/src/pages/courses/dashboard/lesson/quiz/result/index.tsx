import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Box, Image, Text } from 'native-base';
import TextButton from 'src/components/buttons/textButton';
import TopBar from 'src/components/topBar';

// @ts-ignore
import BADCHECK from 'assets/icons/badCheck.png';
// @ts-ignore
import CUP from 'assets/icons/cup.png';
// @ts-ignore
import FAIL from 'assets/icons/fail.png';
// @ts-ignore
import GOODCHECK from 'assets/icons/goodCheck.png';

interface LectureProps {
	totalQuestionNb: number;
	errorNb: number;
}

function ResultPage({ totalQuestionNb, errorNb }: LectureProps) {
	const navigate = useNavigate();
	const haveFailled = errorNb / totalQuestionNb >= 2 / 3;

	return (
		<>
			<TopBar />
			<View style={styles.bg}>
				<View style={{ marginTop: 40, marginBottom: 100, width: 300 }}>
					<View style={styles.lectureContainer}>
						<Text style={styles.titleContainer}> {haveFailled ? 'Do it again!' : 'Good job!'}</Text>
						<Box height="100px" width="100px">
							{haveFailled ? (
								<Image style={{ height: '100%', width: '100%' }} source={FAIL} alt="Fail body" />
							) : (
								<Image style={{ height: '100%', width: '100%' }} source={CUP} alt="Result cup" />
							)}
						</Box>
						<View style={styles.resultContainer}>
							<View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<Box height="24px" width="24px">
									<Image style={{ height: '100%', width: '100%' }} source={GOODCHECK} alt="Good heck" />
								</Box>
								<Text>
									{totalQuestionNb - errorNb} / {totalQuestionNb}
								</Text>
								<Text>Good Answers</Text>
							</View>
							<View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<Box height="24px" width="24px">
									<Image style={{ height: '100%', width: '100%' }} source={BADCHECK} alt="Bad heck" />
								</Box>
								<Text>
									{errorNb} / {totalQuestionNb}
								</Text>
								<Text>Wrong Answers</Text>
							</View>
						</View>
					</View>
				</View>
				<TextButton title="Main Menu" onPress={() => navigate('/home')} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	bg: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#EDE8FF',
		width: '100%',
		height: '100%',
	},
	lectureContainer: {
		width: '100%',
		borderRadius: 8,
		borderColor: '#BDBDBD',
		borderWidth: 1,
		shadowRadius: 10,
		padding: 28,
		paddingBottom: 95,
		gap: 34,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	titleContainer: {
		fontSize: 15,
		fontWeight: '500',
		textAlign: 'center',
	},
	resultContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ResultPage;
