import { ButtonProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Button = ({ onClick, ...otherProps }: Omit<ButtonProps, 'onPress'> & { onClick?: ButtonProps['onPress'] }) => {
  const isPressed = useSharedValue(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isPressed.value ? 0.8 : 1) }],
      opacity: withSpring(isPressed.value ? 0.2 : 1),
      // backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  const gesture = Gesture.Tap()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedButton style={animatedStyles}>
        <MyText>{otherProps.title}</MyText>
      </AnimatedButton>
    </GestureDetector>
  );
};

const AnimatedButton = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 42px;
  border-radius: 4px;
  background: orange;
  color: pink;
`;

const MyButton = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 42px;
  border-radius: 4px;
  background: orange;
  color: pink;
`;

const MyText = styled.Text`
  color: white;
`;

export { Button };
