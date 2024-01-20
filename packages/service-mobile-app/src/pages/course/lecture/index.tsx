import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useNavigate } from 'react-router-native';
import { Text } from 'native-base';
import IconButton from 'src/components/buttons/iconButton';
import TextButton from 'src/components/buttons/textButton';
import TopBarContainer from 'src/components/topBarContainer';

interface LectureProps {
	lessonId: string;
	setLectureState: (v: boolean) => void;
}
const courseMock = {
	title: "Un peu d'histoire, pour les motivés !",
	data: "C'est un beau jour ensoleillé de 1970 que Monsieur Codd, du laboratoire de recherche d'IBM de San José, crée le **_modèle relationnel_**.\n\nC'était bien vu, car celui-ci a réussi à s'imposer et se retrouve aujourd'hui dans la majorité des bases de données !\n\nEn effet, ce modèle a été implémenté dans les systèmes de gestion des bases de données relationnelles (SGBDR) comme le IBM System R, Oracle, DB2 ou MySQL. Il a également donné naissance au langage de manipulation des données SQL.",
};

function Lecture(props: LectureProps) {
	const navigate = useNavigate();
	const { setLectureState, lessonId } = props;
	// need to query course
	const course = courseMock;

	return (
		<View style={styles.body}>
			<TopBarContainer>
				<IconButton onPress={() => navigate('/home')} iconName="close" style={{}} />
			</TopBarContainer>
			<View style={{ paddingHorizontal: 24, maxHeight: '60%', marginTop: 40, marginBottom: 100 }}>
				<View style={styles.lectureContainer}>
					<Text style={styles.titleContainer}>{course.title}</Text>
					<SafeAreaView>
						<ScrollView contentInsetAdjustmentBehavior="automatic">
							<Markdown>{course.data}</Markdown>
						</ScrollView>
					</SafeAreaView>
				</View>
			</View>
			<TextButton title="Take the Quiz" onPress={() => setLectureState(true)} rightIconName="arrow-forward" />
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
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
	},
	titleContainer: {
		color: '#876BF6',
		fontSize: 24,
		fontWeight: '700',
		textAlign: 'center',
	},
});

export default Lecture;
