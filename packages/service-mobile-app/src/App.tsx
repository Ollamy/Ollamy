import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { NativeBaseProvider } from 'native-base';
import { store } from 'src/store';

import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Chat from './pages/chat';
import Home from './pages/home';
import Profile from './pages/profile';
import SplashScreen from './pages/splashScreen';

function App() {
	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<NativeRouter>
					<Provider store={store}>
						<Routes>
							<Route Component={SplashScreen} path="/" />
							<Route Component={Register} path="/register" />
							<Route Component={Login} path="/login" />
							<Route Component={Home} path="/home" />
							<Route Component={Profile} path="/profile" />
							<Route Component={Chat} path="/chat" />
						</Routes>
					</Provider>
				</NativeRouter>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}

export default App;
