import { Image, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Box } from 'native-base';

// @ts-ignore
import COMMUNITY from '../../../assets/icons/community.png';
// @ts-ignore
import EVENT from '../../../assets/icons/event.png';
// @ts-ignore
import MEDAL from '../../../assets/icons/medal.png';
// @ts-ignore
import PROGRESS from '../../../assets/icons/progress.png';
import CustomIconButton from '../buttons/customIconButton';

function BottomBar() {
	const handlePress = () => {
		// eslint-disable-next-line no-console
		console.log('Button Pressed');
	};
	const navigate = useNavigate();

	return (
		<Box style={styles.container}>
			<CustomIconButton onPress={handlePress}>
				<Box height="35px" width="35px">
					<Image style={{ height: '100%', width: '100%' }} source={PROGRESS} />
				</Box>
			</CustomIconButton>
			<CustomIconButton onPress={handlePress}>
				<Box height="35px" width="35px">
					<Image style={{ height: '100%', width: '100%' }} source={EVENT} />
				</Box>
			</CustomIconButton>
			<CustomIconButton onPress={() => navigate('/chat')}>
				<Box height="35px" width="35px">
					<Image style={{ height: '100%', width: '100%' }} source={COMMUNITY} />
				</Box>
			</CustomIconButton>
			<CustomIconButton onPress={handlePress}>
				<Box height="35px" width="35px">
					<Image style={{ height: '100%', width: '100%' }} source={MEDAL} />
				</Box>
			</CustomIconButton>
		</Box>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		borderColor: '#BDBDBD',
		borderWidth: 1,
		shadowRadius: 10,
		shadowColor: '#BDBDBD',
		paddingHorizontal: 10,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default BottomBar;
