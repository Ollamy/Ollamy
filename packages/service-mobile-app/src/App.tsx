import { NativeBaseProvider, Text } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Routes } from 'react-router-native';
import AppSafeArea from 'src/components/layout/AppSafeArea/AppSafeArea';
import Login from 'src/pages/authentication/login';
import Register from 'src/pages/authentication/register';
import Chat from 'src/pages/chat';
import CourseRouter from 'src/pages/courses/Routes';
import Home from 'src/pages/home';
import Profile from 'src/pages/profile';
import SplashScreen from 'src/pages/splashScreen';
import { store } from 'src/store';
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
            </Routes>
          </Provider>
        </NativeRouter>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default App;
