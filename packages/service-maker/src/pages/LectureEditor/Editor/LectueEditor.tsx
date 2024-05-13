import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import { lectureActions } from 'services/api/routes/lecture';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

import {
  Badge,
  Button,
  Heading,
  Separator,
  Text,
  TextArea,
} from '@radix-ui/themes';

interface LectureEditorProps {
  lessonId: string;
}

function LectureEditor({ lessonId }: LectureEditorProps) {
  const { data } = lessonActions.useGetLessonLectures({ id: lessonId });
  const { mutateAsync: createNewLecture } = lectureActions.useCreateLecture();
  const { mutateAsync: updateLecture } = lectureActions.useUpdateLecture();
  const { mutateAsync: removeLecture } = lectureActions.useRemoveLecture();

  const [value, setValue] = useState('');

  const handleChangeLocalLectureValue = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  useEffect(() => {
    if (data && data.length) {
      setValue(data[0].data);
    }
  }, [data]);

  const handleCreateLecture = useCallback(async () => {
    await createNewLecture({
      createLectureModel: {
        lessonId,
        data: '',
      },
    });
  }, [createNewLecture, lessonId]);

  const handleUpdateLectureValue = useCallback(async () => {
    if (data && data.length) {
      const lectureId = data[0].id;

      await updateLecture({
        id: lectureId,
        updateLectureModel: {
          data: value,
        },
      });
    }
  }, [data, updateLecture, value]);

  const handleRemoveLecture = useCallback(async () => {
    if (data && data.length) {
      const lectureId = data[0].id;

      await removeLecture({
        idLectureModel: {
          id: lectureId,
        },
      });
    }
  }, [data, removeLecture]);

  return (
    <Container>
      {data && data.length ? (
        <>
          <Heading align={'center'}>Lecture editor</Heading>
          <Separator size={'4'} />
          <Badge style={{ width: '40px' }}>Data</Badge>
          <TextArea
            size={'2'}
            value={value}
            resize={'vertical'}
            style={{ maxHeight: '300px' }}
            placeholder={'Reply to comment…'}
            onChange={handleChangeLocalLectureValue}
          />
          <Button color={'green'} onClick={handleUpdateLectureValue}>
            Update Lecture
          </Button>
          <CustomAlertDialog
            description={
              'This action cannot be undone. This will permanently delete this lecture and remove the data from our servers.'
            }
            actionButtonValue={'Yes, delete lecture'}
            TriggerButton={
              <Button
                color={'red'}
                variant={'surface'}
                style={{ width: '100%' }}
              >
                Remove Lecture
              </Button>
            }
            onAction={handleRemoveLecture}
          />
        </>
      ) : data && !data.length ? (
        <Button onClick={handleCreateLecture}>Create lecture</Button>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;

  width: 400px;
  height: 600px;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
`;

export default LectureEditor;
