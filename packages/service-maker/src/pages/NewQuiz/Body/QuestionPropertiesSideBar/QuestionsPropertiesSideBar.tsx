import styled from 'styled-components';
import { ReactElement } from 'react';
import DifficultyPicker from 'pages/NewQuiz/Body/QuestionPropertiesSideBar/DifficultyPicker/DifficultyPicker';
import { Difficulty } from 'pages/NewQuiz/Factory/factory.types';

// eslint-disable-next-line
interface QuestionsPropertiesSideBarProps {}

const QuestionsPropertiesSideBar =
  ({}: QuestionsPropertiesSideBarProps): ReactElement => {
    const questionData = {
      id: 'f5780185-2d4c-497e-9c78-fa3cea5270aa',
      lessonId: 'string',
      title: 'Hello',
      description: 'Hello world....',
      typeAnswer: 'TEXT',
      typeQuestion: 'TEXT',
      trustAnswerId: 'string',
      pictureId: 'string',
      difficulty: Difficulty.ADVANCED,
      order: 'a0',
      points: 1,
    };

    const handleDifficultyClick = (difficulty: Difficulty) => {
      console.log(`Updating to difficulty ${difficulty}`);
    };

    return (
      <Container>
        <DifficultyPicker
          difficulty={questionData.difficulty as Difficulty}
          onClick={handleDifficultyClick}
        />
      </Container>
    );
  };

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 260px;
  padding: 16px;

  background: #ffffff;
  border: 1px solid #e7e7e7;
`;

export default QuestionsPropertiesSideBar;
