import { Pressable, Text, View } from 'native-base';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TextButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  rightIconName?: string;
  disabled?: boolean;
}

function TextButton({ onPress, title, style, rightIconName, disabled }: TextButtonProps) {
  return (
    <Pressable
      width={'80%'}
      backgroundColor={'#876BF6'}
      borderRadius={12}
      paddingY={'20px'}
      paddingX={'12px'}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      opacity={disabled ? 0.5 : 1}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      <View />
      <Text fontSize={16} color={'#fff'} fontWeight={'bold'} alignSelf={'center'} textAlign={'center'}>
        {title}
      </Text>
      {rightIconName ? <Icon name={rightIconName} style={{ fontSize: 24, color: 'white' }} /> : <View />}
    </Pressable>
  );
}

export default TextButton;
