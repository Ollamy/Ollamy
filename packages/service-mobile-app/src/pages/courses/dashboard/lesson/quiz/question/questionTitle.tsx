import { Text } from 'native-base';

interface QuestionTitleProps {
  title: string;
  color?: string;
}

function QuestionTitle({ title, color }: QuestionTitleProps) {
  return (
    <Text color={color ?? '#876BF6'} fontWeight={'bold'} fontSize={24} lineHeight={24}>
      {title}
    </Text>
  );
}

export default QuestionTitle;
