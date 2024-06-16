import { Heading, Image, Text, VStack } from 'native-base';
import type { ImageSourcePropType } from 'react-native';

interface SectionHeaderProps {
  icon?: ImageSourcePropType;
  title: string;
  description: string;
  colorStyle?: {
    bg?: string;
    borderColor?: string;
    titleColor?: string;
    descriptionColor?: string;
  };
}

function SectionHeader({ icon, title, description, colorStyle }: SectionHeaderProps) {
  return (
    <VStack
      p={12}
      mt={12}
      w={'full'}
      position={'relative'}
      bg={colorStyle?.bg ?? '#ECE6FC'}
      borderColor={colorStyle?.borderColor ?? '#876BF6'}
      borderWidth={1}
      borderRadius={'12px'}
      alignItems={'center'}
      space={'12px'}
    >
      {icon && <Image source={icon} alt={'icon'} width={'100px'} height={'100px'} marginTop={-24} />}
      <Heading textAlign={'center'} size={'xl'} color={colorStyle?.titleColor ?? '#876BF6'}>
        {title}
      </Heading>
      <Text fontSize={'md'} textAlign={'center'} color={colorStyle?.descriptionColor}>
        {description}
      </Text>
    </VStack>
  );
}

export default SectionHeader;
