import { useState } from 'react';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import * as Collapsible from '@radix-ui/react-collapsible';
import {
  Cross2Icon,
  InfoCircledIcon,
  RowSpacingIcon,
} from '@radix-ui/react-icons';
import {
  Badge,
  Button,
  Card,
  DataList,
  Heading,
  IconButton,
  Tooltip,
} from '@radix-ui/themes';

interface CourseManagerProps {
  courseId: string;
}

function CourseManager({ courseId }: CourseManagerProps) {
  const [open, setOpen] = useState(false);

  const { data } = courseActions.useCourse({ id: courseId });

  return (
    <Container>
      <CustomHeading>Course</CustomHeading>
      <Collapsible.Root
        className={'CollapsibleRoot'}
        open={open}
        onOpenChange={setOpen}
      >
        <CustomCard variant={'classic'} open={open}>
          <CourseHeader>
            <TitleContainer>
              {data?.title}
              <Tooltip content={data?.description}>
                <InfoCircledIcon color={'gray'} />
              </Tooltip>
            </TitleContainer>
            <Collapsible.Trigger asChild>
              <IconButton variant={'ghost'} radius={'full'}>
                {open ? <Cross2Icon /> : <RowSpacingIcon />}
              </IconButton>
            </Collapsible.Trigger>
          </CourseHeader>
          <CustomCollapsibleContent>
            <DataList.Root>
              <DataList.Item align={'center'}>
                <DataList.Label minWidth={'88px'}>Status</DataList.Label>
                <DataList.Value>
                  <Badge color={'jade'} variant={'soft'} radius={'full'}>
                    online
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align={'center'}>
                <DataList.Label minWidth={'88px'}>
                  Number of students
                </DataList.Label>
                <DataList.Value>
                  <Badge color={'blue'} variant={'soft'} radius={'full'}>
                    42
                  </Badge>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
            <ButtonContainer>
              <Button disabled color={'gray'} variant={'outline'}>
                Edit
              </Button>
              <Button color={'red'} variant={'soft'}>
                Remove
              </Button>
            </ButtonContainer>
          </CustomCollapsibleContent>
        </CustomCard>
      </Collapsible.Root>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface CustomCardProps {
  open: boolean;
}

const CustomCard = styled(Card)<CustomCardProps>`
  display: flex;
  flex-direction: column;

  gap: ${({ open }) => (open ? '20px' : 'unset')};
`;

const CustomHeading = styled(Heading)`
  color: #3d3d3d;
  font-size: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomCollapsibleContent = styled(Collapsible.Content)`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;
`;

export default CourseManager;
