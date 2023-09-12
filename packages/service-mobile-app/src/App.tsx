import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Register from './pages/authentication/register';
import Login from './pages/authentication/login';
import Home from './pages/home';
import Chat from './pages/chat';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NativeRouter>
          <Routes>
            <Route Component={Register} path="/" />
            <Route Component={Login} path="/login" />
            <Route Component={Home} path="/home" />
            <Route Component={Chat} path="/chat" />
          </Routes>
        </NativeRouter>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
