import styled from 'styled-components';
import React, { ReactElement, useCallback } from 'react';
import currentQuiz from 'pages/NewQuiz/Factory/factory';
import { questionActions } from 'services/api/routes/question';
import * as Dialog from '@radix-ui/react-dialog';
import { IconButton } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Form from '@radix-ui/react-form';

interface QuestionSideBarHeaderProps {
  lessonId: string;
}

const QuestionSideBarHeader = ({
  lessonId,
}: QuestionSideBarHeaderProps): ReactElement => {
  const { mutateAsync: createQuestion } = questionActions.useCreateQuestion();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      createQuestion({
        createQuestionModel: {
          lessonId,
          title,
          description,
          data: '',
          typeAnswer: 'TEXT',
          typeQuestion: 'TEXT',
          picture: '',
          difficulty: 'BEGINNER',
          between: {
            before: '',
            after: '',
          },
          points: 0,
        },
      });
    },
    [lessonId],
  );

  return (
    <Container>
      <Dialog.Root>
        <Title>Content</Title>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton>
              <PlusIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              side={'right'}
              className="DropdownMenuContent"
              sideOffset={5}
            >
              {Object.entries(currentQuiz).map(([key, elem]) => {
                return (
                  <Dialog.Trigger asChild key={key}>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      {elem.label}
                    </DropdownMenu.Item>
                  </Dialog.Trigger>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">New Question</Dialog.Title>
            <Form.Root className="FormRoot" onSubmit={handleSubmit}>
              <Form.Field className="FormField" name="title">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Title</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your title
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input
                    className="Input"
                    type="text"
                    placeholder={'The title of the question'}
                    required
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="description">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Description</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter a description
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <textarea
                    className="Textarea"
                    placeholder={'The description of the question'}
                    required
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="FormField" name="image">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Label className="FormLabel">Description</Form.Label>
                  <Form.Message className="FormMessage" match="valueMissing">
                    Please enter a description
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  <input type="file" />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <button className="Button" style={{ marginTop: 10 }}>
                  Create Question
                </button>
              </Form.Submit>
              <Form.Submit asChild>
                <button className="Button" style={{ marginTop: 10 }}>
                  Cancel
                </button>
              </Form.Submit>
            </Form.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h3``;

export default QuestionSideBarHeader;
