import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlertDialog from 'components/RadixUi/AlertDialog/CustomAlertDialog';
import { lessonActions } from 'services/api/routes/lesson';
import styled from 'styled-components';

import 'styles/dropdownMenu.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface OptionDropdownMenuProps {
  lessonId: string;
}

function OptionDropdownMenu({ lessonId }: OptionDropdownMenuProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { mutateAsync: removeLesson } = lessonActions.useRemoveLesson();

  const handleRemoveLesson = useCallback(async () => {
    await removeLesson({ idLessonModel: { id: lessonId } });
    setOpen(false);
  }, [lessonId, removeLesson]);

  const handleCancelRemoveLesson = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenRemoveModal: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
    },
    [],
  );

  const handleOpenIn = useCallback(
    (target: 'quizEditor' | 'lectureEditor') => {
      navigate(`/${target}/${lessonId}`);
    },
    [lessonId, navigate],
  );

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <ButtonActionContainer aria-label={'Customise options'}>
          <IconButton color={'gray'} variant={'outline'}>
            <DotsHorizontalIcon />
          </IconButton>
        </ButtonActionContainer>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          loop
          className={'DropdownMenuContent'}
          sideOffset={5}
        >
          <DropdownMenu.Item
            className={'DropdownMenuItem'}
            onClick={() => handleOpenIn('quizEditor')}
          >
            Open in quiz editor
          </DropdownMenu.Item>
          <DropdownMenu.Item
            disabled
            className={'DropdownMenuItem'}
            onClick={() => handleOpenIn('lectureEditor')}
          >
            Open in lecture editor
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={'DropdownMenuSeparator'} />
          <DropdownMenu.Item disabled className={'DropdownMenuItem'}>
            Edit Metadata
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={'DropdownMenuSeparator'} />
          <CustomRemoveRow
            checked
            className={'DropdownMenuCheckboxItem'}
            onClick={handleOpenRemoveModal}
          >
            <CustomAlertDialog
              description={
                'This action cannot be undone. This will permanently delete this lesson and remove your data from our servers.'
              }
              TriggerButton={
                <Nico>
                  <DropdownMenu.ItemIndicator
                    className={'DropdownMenuItemIndicator'}
                  >
                    <TrashIcon />
                  </DropdownMenu.ItemIndicator>
                  Remove
                </Nico>
              }
              actionButtonValue={'Yes, delete lesson'}
              onAction={handleRemoveLesson}
              onCancel={handleCancelRemoveLesson}
            />
          </CustomRemoveRow>
          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const ButtonActionContainer = styled.div``;

const CustomRemoveRow = styled(DropdownMenu.CheckboxItem)`
  color: var(--red-9) !important;

  &[data-highlighted] {
    color: white !important;
    background-color: var(--red-9) !important;
  }
`;

const Nico = styled.div``;

export default OptionDropdownMenu;
