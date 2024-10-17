import { Box, HStack, Pressable } from 'native-base';

interface DotStepperProps {
  stepsNumber: number;
  currentStep: number;
  goToStep: (step: number) => void;
}

function DotStepper({ currentStep = 1, stepsNumber, goToStep }: DotStepperProps) {
  return (
    <HStack space={'xs'}>
      {Array.from({ length: stepsNumber }, (_, index) => (
        <Pressable onPress={() => goToStep(index + 1)} key={index}>
          <Box bg={currentStep === index + 1 ? '#758EE9' : '#D6E0E5'} rounded={'full'} boxSize={2} />
        </Pressable>
      ))}
    </HStack>
  );
}

export default DotStepper;
