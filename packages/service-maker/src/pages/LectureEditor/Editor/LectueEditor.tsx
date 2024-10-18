import { useCallback, useEffect, useRef, useState } from 'react';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import { lectureActions } from 'services/api/routes/lecture';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

import {
  MDXEditor,
  headingsPlugin,
  toolbarPlugin,
  linkPlugin,
  imagePlugin,
  listsPlugin,
  quotePlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
  tablePlugin,
  markdownShortcutPlugin,
  diffSourcePlugin,
  KitchenSinkToolbar,
  codeMirrorPlugin,
  frontmatterPlugin,
  MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import {
  Badge,
  Button,
  Flex,
  Heading,
  ScrollArea,
  Separator,
  Skeleton,
} from '@radix-ui/themes';
import toast from 'react-hot-toast';

interface LectureEditorProps {
  lessonId: string;
}

function LectureEditor({ lessonId }: LectureEditorProps) {
  const { data } = lessonActions.useGetLessonLectures({ id: lessonId });
  const { mutateAsync: createNewLecture } = lectureActions.useCreateLecture();
  const { mutateAsync: updateLecture } = lectureActions.useUpdateLecture();
  const { mutateAsync: removeLecture } = lectureActions.useRemoveLecture();

  const [value, setValue] = useState('');

  const mdxEditorRef = useRef<MDXEditorMethods>(null);

  const handleChangeLocalLectureValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  useEffect(() => {
    if (data && data.length) {
      setValue(data[0].data);
      mdxEditorRef.current?.setMarkdown(data[0].data);
    }
  }, [data]);

  const handleCreateLecture = useCallback(async () => {
    try {
      await createNewLecture({
        createLectureModel: {
          lessonId,
          data: '',
        },
      });
      toast.success('Lesson successfully created');
    } catch (error) {      
      toast.error('An error occured');
    }
  }, [createNewLecture, lessonId]);

  const handleUpdateLectureValue = useCallback(async () => {
    try {
      if (data && data.length) {
        const lectureId = data[0].id;
  
        await updateLecture({
          id: lectureId,
          updateLectureModel: {
            data: mdxEditorRef.current?.getMarkdown(),
          },
        });
      }
      toast.success('Lecture successfully updated');
    } catch (error) {
      toast.error('An error occured');
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
        <Flex direction={'column'} gap={'4'}>
          <Heading align={'center'}>Lecture editor</Heading>
          <Separator size={'4'} />
          <Badge style={{ width: '40px' }}>Data</Badge>
          <ScrollArea style={{ height: 460, width: '100%' }}>
            <MDXEditor
              ref={mdxEditorRef}
              markdown={'# Hello world'}
              plugins={[
                headingsPlugin(),
                linkPlugin(),
                imagePlugin({}),
                listsPlugin(),
                quotePlugin(),
                headingsPlugin(),
                linkDialogPlugin(),
                frontmatterPlugin(),
                thematicBreakPlugin(),
                tablePlugin(),
                markdownShortcutPlugin(),
                diffSourcePlugin(),
                codeMirrorPlugin(),
                directivesPlugin({
                  directiveDescriptors: [AdmonitionDirectiveDescriptor],
                }),
                toolbarPlugin({
                  toolbarContents: () => <KitchenSinkToolbar />,
                }),
              ]}
            />
          </ScrollArea>
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
        </Flex>
      ) : data && !data.length ? (
        <Button onClick={handleCreateLecture}>Create lecture</Button>
      ) : (
        <Skeleton width="100%" height="100%" />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
  margin: 24px;

  width: 100%;
  height: 700px;

  background-color: white;

  padding: 16px;
  box-sizing: border-box;

  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
`;

export default LectureEditor;
