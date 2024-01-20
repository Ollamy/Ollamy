import Home from 'pages/home';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeNavigator() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="home">
			<Stack.Screen name="home" component={Home} />
		</Stack.Navigator>
	);
}

export default HomeNavigator;
