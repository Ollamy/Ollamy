import { Image, StyleSheet, View } from 'react-native';
import { Box, Text } from 'native-base';
import { useGetUserQuery } from 'src/services/user';

// @ts-ignore
import PROFILE from '../../../assets/icons/user-pp.png';
import BottomBar from '../../components/bottomBar';
import TopBar from '../../components/topBar';

export interface UserInfo {
	firstname: string;
	lastname: string;
	email: string;
}

function Profile() {
	const { data } = useGetUserQuery();

	if (!data) return <Box />;

	return (
		<>
			<TopBar />
			<View style={styles.body}>
				<Box style={styles.profileContainer}>
					<Box height="100px" width="100px">
						<Image style={{ height: '100%', width: '100%' }} source={PROFILE} />
					</Box>
					<Text style={styles.nameContainer}>
						{data.firstname} {data.lastname}
					</Text>
					<Text>{data.email}</Text>
				</Box>
			</View>
			<BottomBar />
		</>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		margin: 24,
	},
	profileContainer: {
		width: '100%',
		gap: 10,
		borderRadius: 8,
		borderColor: '#BDBDBD',
		borderWidth: 1,
		shadowRadius: 10,
		padding: 10,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameContainer: {
		textTransform: 'capitalize',
		fontWeight: 'bold',
	},
});

export default Profile;
