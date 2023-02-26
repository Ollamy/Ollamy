import { View, Text } from 'react-native';

const Button = ({ title }: { title: string }) => {
  return <View style={ { width: 100, height: 50, backgroundColor: 'red' } }>
    <Text>
      { title }
    </Text>
  </View>
}

export {
  Button,
};
