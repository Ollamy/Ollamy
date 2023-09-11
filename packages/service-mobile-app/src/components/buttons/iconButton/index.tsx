import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPress: () => void;
  iconName: string;
}

const IconButton = ({ onPress, iconName }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon name={iconName} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 25,
  },
  icon: {
    fontSize: 30,
    color: 'black',
  },
});

export default IconButton;
