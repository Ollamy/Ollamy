import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { NativeBaseProvider } from 'native-base';

import Login from 'src/pages/authentication/login';
import Register from 'src/pages/authentication/register';

export default function App() {
	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<NativeRouter>
					<Routes>
						<Route Component={Register} path="/" />
						<Route Component={Login} path="/login" />
					</Routes>
				</NativeRouter>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}
