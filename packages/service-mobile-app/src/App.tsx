import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { NativeBaseProvider, Text } from 'native-base';
import { store } from 'src/store';

import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Chat from './pages/chat';
import Home from './pages/home';
import Profile from './pages/profile';
import SplashScreen from './pages/splashScreen';
import CourseRouter from 'src/pages/courses/Routes';
import AppSafeArea from 'src/components/SafeArea/AppSafeArea';
import customTheme from 'src/theme/theme';

function App() {
	return (
		<NativeBaseProvider theme={customTheme}>
			<SafeAreaProvider>
				<NativeRouter>
					<Provider store={store}>
						<Routes>
							<Route element={<AppSafeArea />} errorElement={<Text>Error</Text>}>
								<Route Component={SplashScreen} path="/" />
								<Route Component={Home} path="home" />
								<Route Component={CourseRouter} path="course/*" />
								<Route Component={Profile} path="profile" />
								<Route Component={Chat} path="chat" />
							</Route>

							<Route Component={Register} path="register" />
							<Route Component={Login} path="login" />

							<Route Component={() => <Text>404 Not Found.</Text>} path="*" />
						</Routes>
					</Provider>
				</NativeRouter>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}

export default App;
