import Chat from 'pages/chat';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function AuthNavigator() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="chat">
			<Stack.Screen name="chat" component={Chat} />
		</Stack.Navigator>
	);
}

export default AuthNavigator;
