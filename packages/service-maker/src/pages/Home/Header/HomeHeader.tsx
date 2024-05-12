import { useCallback } from 'react';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import { Button } from '@radix-ui/themes';

function HomeHeader() {
  const { mutateAsync: createNewCourse } = courseActions.useCreateCourse();

  const handleClick = useCallback(() => {
    createNewCourse({
      createCourseModel: {
        title: 'Nicolas',
        description:
          "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
      },
    });
  }, [createNewCourse]);

  return (
    <Container>
      <Title>All your courses, in the same place</Title>
      <CustomButton variant={'soft'} onClick={handleClick}>
        Create a new course
      </CustomButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: #1e1e1e;
  font-size: 32px;
  font-weight: 700;
`;

const CustomButton = styled(Button)`
  height: 60px;
  cursor: pointer;
`;

export default HomeHeader;
