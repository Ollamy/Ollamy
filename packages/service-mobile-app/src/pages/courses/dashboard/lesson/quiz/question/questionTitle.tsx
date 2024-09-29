import { Text } from 'native-base';

interface QuestionTitleProps {
  title: string;
}

function QuestionTitle({ title }: QuestionTitleProps) {
  return (
    <Text color={'#876BF6'} fontWeight={'bold'} fontSize={24} lineHeight={24}>
      {title}
    </Text>
  );
}

export default QuestionTitle;
