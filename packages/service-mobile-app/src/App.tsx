import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@ollamy/design-system/components/Button/Button';
import { DoubleButton } from '@ollamy/design-system/components/Button/DoubleButton';
import helloFLower from '@ollamy/utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useState } from 'react';

const Fun = () => {
  return (
    <>
      <Animated.View
        entering={FadeInUp.delay(200)}
        style={{ width: 50, height: 50, backgroundColor: 'red' }}
      ></Animated.View>
      <Animated.View
        entering={FadeInUp.delay(400)}
        style={{ width: 50, height: 50, backgroundColor: 'red' }}
      ></Animated.View>
      <Animated.View
        entering={FadeInUp.delay(600)}
        style={{ width: 50, height: 50, backgroundColor: 'red' }}
      ></Animated.View>
      <Animated.View
        entering={FadeInUp.delay(800)}
        style={{ width: 50, height: 50, backgroundColor: 'red' }}
      ></Animated.View>
    </>
  );
};

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'green',
          }}
          onPress={() => {
            setShow(!show);
          }}
        ></TouchableOpacity>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button onClick={() => helloFLower()} title={'Hello'} />
        {show && <Fun />}
        <DoubleButton />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
