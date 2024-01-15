import React, { useCallback } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useGetUserQuery } from 'src/services/user/user';

import OLLAMY from 'assets/Ollamy.png';

function SplashScreen() {
	const navigate = useNavigate();
	const imageScale = new Animated.Value(0.1);
	const { isSuccess } = useGetUserQuery();

	const handleAnimationCallback = useCallback(
		({ finished }: { finished: boolean }) => {
			if (finished) {
				if (isSuccess) {
					navigate('/home');
					console.log('logged in!')
				} else {
					console.log('not logged in')
					navigate('/register');
				}
			}
		},
		[navigate, isSuccess],
	);

	Animated.timing(imageScale, {
		toValue: 1,
		duration: 1000,
		useNativeDriver: true,
	}).start(handleAnimationCallback);

	return (
		<View style={styles.container}>
			<Animated.Image source={OLLAMY} style={[styles.image, { transform: [{ scale: imageScale }] }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	image: {
		width: 200,
		height: 100,
	},
});

export default SplashScreen;
