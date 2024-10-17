// @ts-ignore
import HEART from 'assets/icons/heart.png';
import type { IModalProps } from 'native-base';
import { Box, HStack, Modal, Text, VStack } from 'native-base';
import { Image } from 'react-native';
import timeToCountdown from 'src/utils/timeToCountdown';

interface HealthModalProps extends IModalProps {
  health: number;
  nextHeartDate: number;
}

function HealthModal({ health, nextHeartDate, size = 'full', ...props }: HealthModalProps) {
  const { formatted } = timeToCountdown(nextHeartDate);

  return (
    <Modal size={size} {...props} closeOnOverlayClick safeAreaTop>
      <Modal.Content marginBottom={0} marginTop={'auto'} py={'10'}>
        <Modal.Body>
          <VStack w={'full'} h={'full'} position={'relative'} alignItems={'center'}>
            <HStack alignItems={'flex-end'}>
              <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'} mt={4}>
                You have {health}
              </Text>
              <Box height={'32px'} width={'32px'}>
                <Image style={{ height: '100%', width: '100%' }} source={HEART} />;
              </Box>
              <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'} mt={4}>
                {' '}
                left
              </Text>
            </HStack>

            <HStack alignItems={'flex-end'}>
              <Text textAlign={'center'} fontSize={'xl'} color={'gray.600'}>
                Next one in <Text color={'red.500'}>{formatted}</Text>
              </Text>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default HealthModal;
