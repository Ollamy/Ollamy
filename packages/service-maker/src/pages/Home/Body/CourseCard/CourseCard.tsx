import type { UserCourses } from 'services/api/out';
import styled from 'styled-components';
import generateUniqueColorVariables from 'utils/generateUniqueColorVariables';

import { ArrowRightIcon, MixIcon } from '@radix-ui/react-icons';
import { Heading, IconButton, Text, Tooltip } from '@radix-ui/themes';

interface CourseCardProps {
  courseId: UserCourses['id'];
  title: UserCourses['title'];
  description: UserCourses['description'];
  picture: UserCourses['pictureId'];
}

function CourseCard({
  courseId,
  title,
  description,
  picture,
}: CourseCardProps) {
  return (
    <Container color={generateUniqueColorVariables(courseId)}>
      <Header>
        {picture ? (
          <Picture src={picture} />
        ) : (
          <Placeholder>
            <MixIcon width={90} height={90} />
          </Placeholder>
        )}
        <Tooltip content={'See your course'}>
          <CustomButton variant={'ghost'} color={'gray'} highContrast>
            <ArrowRightIcon width={40} height={40} />
          </CustomButton>
        </Tooltip>
      </Header>
      <Body>
        <Title size={'4'} truncate>
          {title}
        </Title>
        <Description size={'2'} weight={'light'}>
          {description}
        </Description>
      </Body>
    </Container>
  );
}

interface ContainerProps {
  color: string[];
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  width: 350px;
  height: 300px;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 2px;
  border: 1px solid #d4d4d4;
  background: linear-gradient(132deg, #e0f1ff 10.95%, #f9f9ff 93.46%);

  background: ${({ color }) =>
    `linear-gradient(132deg, var(${color[0]}) 10.95%, var(${color[1]}) 93.46%)`};

  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Picture = styled.img`
  max-height: 100px;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
`;

const CustomButton = styled(IconButton)`
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding-top: 12px;
  box-sizing: border-box;
`;

const Title = styled(Heading)``;

const Description = styled(Text)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
`;

export default CourseCard;
