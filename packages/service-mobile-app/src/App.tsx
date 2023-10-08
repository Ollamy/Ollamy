import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { NativeBaseProvider } from 'native-base';

import Login from 'src/pages/authentication/login';
import Register from 'src/pages/authentication/register';
import { store } from 'src/store';

const App = () => {
	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<NativeRouter>
					<Provider store={store}>
						<Routes>
							<Route Component={Register} path="/" />
							<Route Component={Login} path="/login" />
						</Routes>
					</Provider>
				</NativeRouter>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
};

export default App;
