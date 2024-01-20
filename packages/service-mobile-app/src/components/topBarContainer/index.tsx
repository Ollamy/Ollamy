import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Box } from 'native-base';

interface TopBarContainerProps {
	children: JSX.Element;
	style?: StyleProp<ViewStyle>;
}

function TopBarContainer({ children, style }: TopBarContainerProps) {
	return <Box style={[styles.container, style]}>{children}</Box>;
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 60,
		borderColor: '#BDBDBD',
		borderWidth: 1,
		paddingHorizontal: 10,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowRadius: 10,
		shadowColor: '#BDBDBD',
	},
});

export default TopBarContainer;
