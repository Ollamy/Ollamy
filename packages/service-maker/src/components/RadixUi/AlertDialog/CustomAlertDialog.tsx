import type { MouseEventHandler } from 'react';
import styled from 'styled-components';

import 'styles/alertDialog.css';

import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface CustomAlertDialogProps {
  description: string;
  TriggerButton: React.ReactNode;
  onAction: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
}

function CustomAlertDialog({
  onCancel,
  onAction,
  description,
  TriggerButton,
}: CustomAlertDialogProps) {
  return (
    <Container>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>{TriggerButton}</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={'AlertDialogOverlay'} />
          <AlertDialog.Content className={'AlertDialogContent'}>
            <AlertDialog.Title className={'AlertDialogTitle'}>
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className={'AlertDialogDescription'}>
              {description}
            </AlertDialog.Description>
            <CustomDiv>
              <AlertDialog.Cancel asChild>
                <CustomButton
                  onClick={onCancel}
                  className={'AlertDialogButton mauve'}
                >
                  Cancel
                </CustomButton>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <CustomButton
                  className={'AlertDialogButton red'}
                  onClick={onAction}
                >
                  Yes, delete account
                </CustomButton>
              </AlertDialog.Action>
            </CustomDiv>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Container>
  );
}

const Container = styled.div``;

const CustomButton = styled.button``;

const CustomDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 25px;
`;

export default CustomAlertDialog;
