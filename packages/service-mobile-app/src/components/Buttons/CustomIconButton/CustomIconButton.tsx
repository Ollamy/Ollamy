import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: () => void;
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

function CustomIconButton({ onPress, children, style }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style ?? styles.buttonContainer}>{children}</View>
    </TouchableOpacity>
  );
}

export default CustomIconButton;
