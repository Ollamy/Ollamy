import React from 'react';
import quizFactory from 'pages/QuizEditor/Factory/factory';
import { questionActions } from 'services/api/routes/question';
import styled from 'styled-components';

import { Badge, Heading, Tooltip } from '@radix-ui/themes';

interface QuestionEditorProps {
  questionId: string;
}

function QuestionEditor({ questionId }: QuestionEditorProps) {
  const { data: questionData } = questionActions.useQuestion({
    id: questionId,
  });

  if (!questionData) return null;

  return (
    <Wrapper>
      <Container>
        <QuestionInfoContainer>
          <CustomHeading color={'iris'} weight={'medium'} size={'4'}>
            Question
          </CustomHeading>
          <Tooltip content={questionId}>
            <Badge color={'iris'}>{questionData.typeAnswer}</Badge>
          </Tooltip>
        </QuestionInfoContainer>
        {React.createElement(quizFactory[questionData.typeAnswer].Component, {
          questionId,
        })}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 480px;
  height: 100%;
  padding: 60px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  background: #ffffff;
  border-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
`;

const QuestionInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomHeading = styled(Heading)`
  margin: 0;
`;

export default QuestionEditor;
