import { Image, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Box, View } from 'native-base';

// @ts-ignore
import EARTH from 'assets/icons/earth.png';
// @ts-ignore
import PROFILE from 'assets/icons/profile.png';
// @ts-ignore
import TRESOR from 'assets/icons/tresor.png';
import CustomIconButton from 'src/components/buttons/customIconButton';
import TopBarContainer from 'src/components/topBarContainer';

function TopBar() {
	const navigate = useNavigate();
	const handlePress = () => {
		// eslint-disable-next-line no-console
		console.log('Button Pressed');
	};

	return (
		<TopBarContainer>
			<>
				<Box style={styles.iconContainer}>
					<CustomIconButton onPress={() => navigate('/home')} style={{ padding: 5 }}>
						<Box height="30px" width="30px">
							<Image style={{ height: '100%', width: '100%' }} source={EARTH} />
						</Box>
					</CustomIconButton>
				</Box>
				<Box style={styles.iconContainer}>
					<CustomIconButton onPress={handlePress} style={{ padding: 5 }}>
						<Box height="35px" width="35px">
							<Image style={{ height: '100%', width: '100%' }} source={TRESOR} />
						</Box>
					</CustomIconButton>
					<View
						style={{
							borderWidth: 1,
							borderColor: '#BDBDBD',
							marginLeft: 5,
							marginRight: 3,
							height: 30,
						}}
					/>
					<CustomIconButton onPress={() => navigate('/profile')} style={{ padding: 5 }}>
						<Box height="35px" width="35px">
							<Image style={{ height: '100%', width: '100%' }} source={PROFILE} />
						</Box>
					</CustomIconButton>
				</Box>
			</>
		</TopBarContainer>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		borderRadius: 8,
		shadowRadius: 10,
		shadowColor: '#BDBDBD',

		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default TopBar;
