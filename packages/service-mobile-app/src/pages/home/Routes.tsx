import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '.';

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
