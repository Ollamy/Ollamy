import React from 'react';
import quizFactory from 'pages/NewQuiz/Factory/factory';
import type { QuestionType } from 'pages/NewQuiz/Factory/factory.types';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

interface QuestionEditorProps {
  lessonId: string;
  questionId: string;
}

function QuestionEditor({ lessonId, questionId }: QuestionEditorProps) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });

  if (!questionData) return null;

  return (
    <Center>
      <Container>
        <h3>Question {questionId}</h3>
        {React.createElement(
          quizFactory[questionData.typeQuestion as QuestionType].Component,
          { lessonId, questionId },
        )}
      </Container>
    </Center>
  );
}

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 480px;
  height: 100%;
  padding: 16px;

  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 2px;
`;

export default QuestionEditor;
