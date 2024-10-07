import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import CustomDialogTitleDescription from 'components/RadixUi/Dialog/CustomDialogTitleDescription';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import * as Collapsible from '@radix-ui/react-collapsible';
import {
  CopyIcon,
  Cross2Icon,
  EyeOpenIcon,
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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [shareCode, setShareCode] = useState<string | undefined>('');

  const { data } = courseActions.useCourse({ id: courseId });
  const { mutateAsync: updateCourse } = courseActions.useUpdateCourse();
  const { mutateAsync: removeCourse } = courseActions.useRemoveCourse();
  const { mutateAsync: generateShareCode } =
    courseActions.useGenerateShareCode();

  const handleEditCourse = useCallback(
    async (title: string, description: string) => {
      await updateCourse({
        id: courseId,
        updateCourseModel: { title, description },
      });
    },
    [updateCourse, courseId],
  );

  const handleRemoveCourse = useCallback(async () => {
    await removeCourse({ idCourseModel: { id: courseId } }).then(() => {
      navigate('/home');
    });
  }, [courseId, navigate, removeCourse]);

  const handleGenerateCode = useCallback(async () => {
    const result = await generateShareCode({
      id: courseId,
      duration: 'TWELVE_HOURS',
    });

    setShareCode(result.code);
  }, [courseId, generateShareCode]);

  const handleCopyShareLink = useCallback(async () => {
    const temp = `ollamy-app://course/${courseId}/join`;
    try {
      await navigator.clipboard.writeText(temp);
      console.log('Sharing URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, [courseId]);

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
                    {data?.numberOfUsers || 0}
                  </Badge>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align={'center'}>
                <DataList.Label minWidth={'88px'}>Link to join</DataList.Label>
                <DataList.Value>
                  <IconButton
                    size={'1'}
                    variant={'ghost'}
                    color={'orange'}
                    onClick={handleCopyShareLink}
                  >
                    <CopyIcon />
                  </IconButton>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align={'center'}>
                <DataList.Label minWidth={'88px'}>Code to join</DataList.Label>
                <DataList.Value>
                  <IconButton
                    size={'1'}
                    color={'ruby'}
                    variant={'ghost'}
                    disabled={!!shareCode}
                    onClick={handleGenerateCode}
                  >
                    {shareCode ? (
                      <Badge style={{ fontFamily: 'monospace' }}>
                        {shareCode}
                      </Badge>
                    ) : (
                      <EyeOpenIcon />
                    )}
                  </IconButton>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
            <ButtonContainer>
              <CustomDialogTitleDescription
                dialogTitle={'Edit course'}
                dialogDescription={
                  'Edit the title and description of your current course.'
                }
                defaultTitle={data?.title}
                defaultDescription={data?.description}
                actionButtonValue={'Update'}
                TriggerButton={
                  <Button
                    color={'gray'}
                    variant={'outline'}
                    style={{ width: '100%' }}
                  >
                    Edit
                  </Button>
                }
                createFunction={handleEditCourse}
              />
              <CustomAlertDialog
                description={
                  'This action cannot be undone. This action will permanently delete the entire course from our servers, along with all related sections, quizzes and lectures.'
                }
                TriggerButton={
                  <Button
                    color={'red'}
                    variant={'soft'}
                    style={{ width: '100%' }}
                  >
                    Remove
                  </Button>
                }
                actionButtonValue={'Yes, delete course'}
                onAction={handleRemoveCourse}
              />
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
