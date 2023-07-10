import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'pages/authentication/login';
import Register from 'pages/authentication/register';

const AuthNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="register">
			<Stack.Screen name="register" component={Register} />
			<Stack.Screen name="login" component={Login} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
