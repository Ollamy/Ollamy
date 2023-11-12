import { Image, StyleSheet, View } from 'react-native';
import { Box, Text } from 'native-base';
import { useGetUserQuery } from 'src/services/user';

// @ts-ignore
import OLLAMY from '../../../assets/Ollamy.png';
import BottomBar from '../../components/bottomBar';
import TopBar from '../../components/topBar';

function Home() {
	const response = useGetUserQuery();

	return (
		<>
			<TopBar />
			<View style={styles.body}>
				<Box height="100px" width="200px">
					<Image style={{ height: '100%', width: '100%' }} source={OLLAMY} />
				</Box>
				<Text style={styles.horizontalContainer}>Home</Text>
				{response.data && <Text style={styles.horizontalContainer}>Welcome {response.data.firstname}</Text>}
			</View>
			<BottomBar />
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: 'center',
		gap: 24,
		alignItems: 'center',
	},
	horizontalContainer: {
		textTransform: 'capitalize',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});

export default Home;
