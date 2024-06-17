// @ts-ignore
import MEDAL from 'assets/icons/medal.png';
import { Box, Heading, HStack, Image, Text, VStack } from 'native-base';
import type { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

interface StatCardProps extends InterfaceBoxProps {
  title: string;
  value: string;
  bg?: InterfaceBoxProps['bg'];
  icon?: JSX.Element;
}

function StatCard({ title, value, icon, bg = 'white', ...props }: StatCardProps) {
  return (
    <Box w={'full'} shadow={2} borderColor={'coolGray.200'} borderWidth={1} borderRadius={12} bg={bg} p={4} {...props}>
      <HStack w={'full'} alignItems={'center'} space={3}>
        {icon}
        <VStack space={4}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {value}
          </Text>
          <Text color={'muted.400'}>{title}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

function ProfileStats() {
  return (
    <VStack w={'full'} space={3}>
      <Heading size={'md'} mb={2}>
        Profile Statistics
      </Heading>
      <StatCard
        title={'Correct answers'}
        value={'0'}
        bg={'#f0fff0'}
        icon={<Image size={35} source={MEDAL} alt={'medal'} />}
      />
    </VStack>
  );
}

export default ProfileStats;
