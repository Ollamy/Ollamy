import OLLAMY from 'assets/Ollamy.png';
import { Center } from 'native-base';
import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useGetUserQuery } from 'src/services/user/user';

function SplashScreen() {
  const navigate = useNavigate();
  const imageScale = new Animated.Value(0.1);
  const { isSuccess } = useGetUserQuery();

  const handleAnimationCallback = useCallback(
    ({ finished }: { finished: boolean }) => {
      if (finished) {
        if (isSuccess) {
          navigate('/home');
        } else {
          navigate('/register');
        }
      }
    },
    [navigate, isSuccess],
  );

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start(handleAnimationCallback);

  return (
    <Center flex="1">
      <Animated.Image source={OLLAMY} style={{ width: 200, height: 100, transform: [{ scale: imageScale }] }} />
    </Center>
  );
}

export default SplashScreen;
