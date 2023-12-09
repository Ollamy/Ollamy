import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TextButtonProps {
	onPress: () => void;
	title: string;
	style?: StyleProp<ViewStyle>;
	rightIconName?: string;
	disabled?: boolean;
}

function TextButton({ onPress, title, style, rightIconName, disabled }: TextButtonProps) {
	return (
		// @ts-ignore
		<TouchableOpacity onPress={onPress} style={{...(style ?? styles.buttonContainer), opacity: disabled ? 0.5 : 1}} disabled={disabled}>
			<View />
			<Text style={styles.buttonText}>{title}</Text>
			{rightIconName ? <Icon name={rightIconName} style={{ fontSize: 24, color: 'white' }} /> : <View />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: '80%',
		backgroundColor: '#876BF6',
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 12,

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
	},
});

export default TextButton;
