import Profile from 'pages/profile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ProfileNavigator() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="profile">
			<Stack.Screen name="profile" component={Profile} />
		</Stack.Navigator>
	);
}

export default ProfileNavigator;
