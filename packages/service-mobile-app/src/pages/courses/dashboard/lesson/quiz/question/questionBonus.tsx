import { HStack, Text } from 'native-base';

function QuestionBonusIndicator() {
  return (
    <HStack justifyContent={'left'}>
      <HStack borderRadius={8} padding={'6px'} backgroundColor={'#ECE6FC'} justifyContent={'center'}>
        <Text color={'#F7AC16'} bold fontSize={16}>
          Bonus
        </Text>
      </HStack>
    </HStack>
  );
}

export default QuestionBonusIndicator;
