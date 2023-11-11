import SplashScreen from 'pages/splashScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function SplashScreenNavigator() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="profile">
			<Stack.Screen name="profile" component={SplashScreen} />
		</Stack.Navigator>
	);
}

export default SplashScreenNavigator;
