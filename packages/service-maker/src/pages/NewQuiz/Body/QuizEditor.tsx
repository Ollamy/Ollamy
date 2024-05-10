import styled from 'styled-components';
import QuestionsSideBar from 'pages/NewQuiz/Body/QuestionsSideBar/QuestionSideBar';
import QuestionEditor from 'pages/NewQuiz/Body/QuestionEditor/QuestionEditor';
import QuestionsPropertiesSideBar from 'pages/NewQuiz/Body/QuestionPropertiesSideBar/QuestionsPropertiesSideBar';
import { useEffect, useState } from 'react';
import { lessonActions } from 'services/api/routes/lesson';

interface QuizEditorProps {
  lessonId: string;
}

export type QuizID = string;

const QuizEditor = ({ lessonId }: QuizEditorProps) => {
  const currentQuestion = useState<QuizID | undefined>(undefined);

  return (
    <Container>
      <QuestionsSideBar lessonId={lessonId} />
      <QuestionEditor />
      <QuestionsPropertiesSideBar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export default QuizEditor;
