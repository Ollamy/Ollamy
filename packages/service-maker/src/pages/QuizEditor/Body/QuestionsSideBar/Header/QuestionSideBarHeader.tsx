import type { ReactElement } from 'react';
import { useCallback, useState } from 'react';
import { GenerateQuizAIModal } from 'components/modal/GenerateQuizAI/GenerateQuizAI';
import AddQuestion from 'pages/QuizEditor/Body/QuestionsSideBar/Header/AddQuestion/AddQuestion';
import { AIAction } from 'services/api/routes/AI';
import styled from 'styled-components';

import { SymbolIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

interface QuestionSideBarHeaderProps {
  lessonId: string;
}

function QuestionSideBarHeader({
  lessonId,
}: QuestionSideBarHeaderProps): ReactElement {
  const { mutateAsync: generateQuiz } = AIAction.useGenerateQuiz();
  const [numberOfQuestionTarget, setNumberOfQuestionTarget] = useState(10);
  const [fileTarget, setFileTarget] = useState<File | undefined>(undefined);
  // const [contextTarget, setContextTarget] = useState(false);

  const handleGenerateQuiz = useCallback(async () => {
    if (numberOfQuestionTarget < 0 || !fileTarget) {
      console.error('Error with params for the generation');
      return;
    }

    await generateQuiz({
      lessonId,
      file: fileTarget,
      numberOfQuestions: numberOfQuestionTarget,
    });
  }, [numberOfQuestionTarget, fileTarget, lessonId]);

  return (
    <Container>
      <Title>Quiz questions</Title>
      <GenerateQuizAIModal
        fileTarget={fileTarget}
        setFileTarget={setFileTarget}
        onAction={handleGenerateQuiz}
        numberOfQuestionTarget={numberOfQuestionTarget}
        setNumberOfQuestionTarget={setNumberOfQuestionTarget}
        triggerButton={
          <Button variant={'soft'} color={'orange'}>
            <SymbolIcon />
            Generate Quiz
          </Button>
        }
      />

      <AddQuestion lessonId={lessonId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  box-sizing: border-box;
  gap: 12px;
`;

const Title = styled.h3``;

export default QuestionSideBarHeader;
