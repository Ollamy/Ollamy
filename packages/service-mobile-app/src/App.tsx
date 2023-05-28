import { SafeAreaProvider } from 'react-native-safe-area-context';
import Register from './pages/authentication/register';
import { NativeBaseProvider } from 'native-base';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Login from './pages/authentication/login';

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
