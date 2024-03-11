import type { IButtonProps } from 'native-base';
import { Button, Text } from 'native-base';

type YesNo = 'Yes' | 'No';

interface YesNoButtonTheme {
  bg: string;
  color: string;
  borderColor: string;
  pressedBg: string;
}

interface YesNoButtonProps extends IButtonProps {
  variant: YesNo;
  label?: string;
}

const variants: Record<YesNo, YesNoButtonTheme> = {
  Yes: {
    bg: 'green.300',
    color: 'green.700',
    borderColor: 'green.500',
    pressedBg: 'green.100',
  },
  No: {
    bg: 'red.300',
    color: 'red.700',
    borderColor: 'red.500',
    pressedBg: 'red.100',
  },
};

function YesNoButton({ variant, label, ...props }: YesNoButtonProps): JSX.Element {
  return (
    <Button
      bg={variants[variant].bg}
      py="12px"
      px="32px"
      rounded="full"
      borderWidth={1}
      borderColor={variants[variant].borderColor}
      _pressed={{ bg: variants[variant].bg }}
      {...props}
    >
      <Text fontSize="xl" color={variants[variant].color}>
        {label ?? variant}
      </Text>
    </Button>
  );
}

export default YesNoButton;
