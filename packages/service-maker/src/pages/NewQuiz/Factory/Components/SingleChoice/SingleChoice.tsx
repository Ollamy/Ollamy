import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import useSingleChoiceQuetion from 'hooks/useSingleChoiceQuestion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
interface SingleChoiceProps {}

const SingleChoice = ({}: SingleChoiceProps) => {
  const {
    addAnswer,
    answers,
    deleteAnswer,
    description,
    editAnswer,
    setDescription,
    setTitle,
    title,
  } = useSingleChoiceQuetion();

  const questionData = {
    id: '2597ec2d-36fd-4729-a7d6-84c0ba84c9d2',
    lessonId: 'e70271bf-ac90-4457-b292-5d8ad1411357',
    title: 'Titre',
    description: 'Description',
    typeAnswer: 'string',
    typeQuestion: 'string',
    trustAnswerId: 'string',
    pictureId: 'e70271bf-ac90-4457-b292-5d8ad1411357',
    difficulty: 'string',
    order: 'string',
    points: 0,
    answers: [
      {
        id: '460f99fd-1d06-4047-9807-d720fd98a433',
        questionId: '2597ec2d-36fd-4729-a7d6-84c0ba84c9d2',
        data: 'Le musée du Louvre',
        picture: 'string',
      },
      {
        id: '28c89095-cc2c-4c0e-968d-6f185ec33f04',
        questionId: '2597ec2d-36fd-4729-a7d6-84c0ba84c9d2',
        data: 'La tour eiffel',
        picture: 'string',
      },
    ],
  };

  useEffect(() => {
    setTitle(questionData.title);
    setDescription(questionData.description);
  }, []);

  return (
    <Container>
      <TextField.Root
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField.Root
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h3>Answers</h3>
      {questionData.answers.map((elem, index) => (
        <TextField.Root
          placeholder={`Answer ${index}`}
          defaultValue={elem.data}
          key={elem.id}
          // onChange={(e) => setDescription(e.target.value)}
        />
      ))}
      <Button variant="ghost">Add choices</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export default SingleChoice;
