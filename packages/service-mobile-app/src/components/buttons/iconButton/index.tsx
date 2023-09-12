import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPress: () => void;
  iconName: string;
  style?: StyleProp<ViewStyle>;
  styleIcon?: StyleProp<ViewStyle>;
}

const IconButton = ({ onPress, iconName, style, styleIcon }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style ?? styles.buttonContainer}>
        <Icon name={iconName} style={styleIcon ?? styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 25,
  },
  icon: {
    fontSize: 30,
    color: 'black',
  },
});

export default IconButton;
