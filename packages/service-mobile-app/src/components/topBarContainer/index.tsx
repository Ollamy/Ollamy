import { Box } from 'native-base';
import type { StyleProp, ViewStyle } from 'react-native';

interface TopBarContainerProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

function TopBarContainer({ children, style }: TopBarContainerProps) {
  return (
    <Box
      width="100%"
      height={60}
      borderColor="#BDBDBD"
      borderWidth={1}
      paddingX={5}
      borderBottomRightRadius={16}
      borderBottomLeftRadius={16}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      shadow={10}
      style={style}
    >
      {children}
    </Box>
  );
}

export default TopBarContainer;
