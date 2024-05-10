import quizFactory from 'pages/NewQuiz/Factory/factory';
import { QuestionType } from 'pages/NewQuiz/Factory/factory.types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';
import React from 'react';
import { FactoryComponentInterface } from 'pages/NewQuiz/Factory/Components/interface';

interface QuestionEditorProps {
  lessonId: string;
  questionId: string;
}

const QuestionEditor = ({ lessonId, questionId }: QuestionEditorProps) => {
  const { data } = questionActions.useQuestion({ id: questionId });

  if (!data) return null;

  return (
    <Center>
      <Container>
        <h3>Question {questionId}</h3>
        {React.createElement(
          quizFactory[data.typeQuestion as QuestionType].Component,
          { lessonId, questionId },
        )}
      </Container>
    </Center>
  );
};

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
