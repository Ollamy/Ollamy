import { Pressable } from 'native-base';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
	onPress: () => void;
	children: JSX.Element;
	style?: StyleProp<ViewStyle>;
}

function CustomIconButton({ onPress, children, style }: Props) {
	return (
		<Pressable onPress={onPress}>
			<View style={style ?? styles.buttonContainer}>{children}</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: 'transparent',
		padding: 10,
	},
});

export default CustomIconButton;
