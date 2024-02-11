import { Pressable } from 'native-base';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
	onPress: () => void;
	iconName: string;
	style?: StyleProp<ViewStyle>;
	styleIcon?: StyleProp<ViewStyle>;
}

function IconButton({ onPress, iconName, style, styleIcon }: Props) {
	return (
		<Pressable onPress={onPress}>
			<View style={style ?? styles.buttonContainer}>
				<Icon name={iconName} style={styleIcon ?? styles.icon} />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: 'orange',
		padding: 10,
		borderRadius: 25,
	},
	icon: {
		fontSize: 30,
		color: 'black',
	},
});

export default IconButton;
