// @ts-ignore
import HEART from 'assets/icons/heart.png';
import { Box, HStack, Text } from 'native-base';
import { Image } from 'react-native';

interface HealthPointsProps {
  health?: number;
}

function HealthPoints({ health }: HealthPointsProps) {
  return (
    <Box bg="white" shadow="3" px="8px" py="4px" borderRadius={8}>
      <HStack alignItems="center" space="12px">
        <Text fontWeight="medium" fontSize={20}>
          {health}
        </Text>
        <Box height="32px" width="32px">
          <Image style={{ height: '100%', width: '100%' }} source={HEART} />
        </Box>
      </HStack>
    </Box>
  );
}

export default HealthPoints;
