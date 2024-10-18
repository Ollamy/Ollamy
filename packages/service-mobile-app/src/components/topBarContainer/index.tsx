import { Box, HStack } from 'native-base';
import type { StyleProp, ViewStyle } from 'react-native';

interface TopBarContainerProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

function TopBarContainer({ children, style }: TopBarContainerProps) {
  return (
    <Box
      width={'100%'}
      height={60}
      borderColor={'#BDBDBD'}
      borderWidth={1}
      paddingX={5}
      borderTopWidth={0}
      borderBottomRightRadius={16}
      borderBottomLeftRadius={16}
      shadow={10}
      style={style}
    >
      <HStack w={'full'} h={'full'} justifyContent={'space-between'} alignItems={'center'} space={'12px'}>
        {children}
      </HStack>
    </Box>
  );
}

export default TopBarContainer;
