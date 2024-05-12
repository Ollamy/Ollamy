import { Input } from 'native-base';
import type { FactoryComponentInterface } from 'src/pages/courses/dashboard/lesson/quiz/factory/QuizFactory';

function FreeChoice({ setAnswer }: FactoryComponentInterface) {
  return <Input onChangeText={(text) => setAnswer(text)} placeholder="Your answer" flex="1" />;
}

export default FreeChoice;
