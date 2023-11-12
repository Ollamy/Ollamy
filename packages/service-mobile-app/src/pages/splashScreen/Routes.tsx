import SplashScreen from 'pages/splashScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function SplashScreenNavigator() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="">
			<Stack.Screen name="splashScreen" component={SplashScreen} />
		</Stack.Navigator>
	);
}

export default SplashScreenNavigator;
