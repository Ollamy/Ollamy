import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Register from './register';
import Login from './login';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Register />
        {/* <Login /> */}
      </SafeAreaProvider>
    </NativeBaseProvider>
    // <Text>Hello world</Text>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="register">
    //     <Stack.Screen name="register" component={Register} />
    //     <Stack.Screen name="login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
