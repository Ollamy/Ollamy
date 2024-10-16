import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  type MouseEventHandler,
  SetStateAction,
  useCallback,
} from 'react';
import styled from 'styled-components';

import 'styles/alertDialog.css';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { FileTextIcon, UploadIcon } from '@radix-ui/react-icons';
import { Spinner, Text } from '@radix-ui/themes';

interface GenerateQuizAIModalProps {
  fileTarget: File | undefined;
  triggerButton: React.ReactNode;
  numberOfQuestionTarget: number;
  setFileTarget: Dispatch<SetStateAction<File | undefined>>;
  setNumberOfQuestionTarget: Dispatch<SetStateAction<number>>;
  onAction: MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const GenerateQuizAIModal = ({
  onAction,
  fileTarget,
  triggerButton,
  setFileTarget,
  numberOfQuestionTarget,
  setNumberOfQuestionTarget,
  isLoading,
  isModalOpen,
  setIsModalOpen,
}: GenerateQuizAIModalProps) => {
  const handleFileChange: FormEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if ('files' in event.target) {
        setFileTarget((event.target.files as FileList)[0]);
      }
    },
    [setFileTarget],
  );

  const handleChangeTargetNumber: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const newValue = +event.currentTarget.value;
        if (newValue > 0) {
          setNumberOfQuestionTarget(newValue);
        }
      },
      [setNumberOfQuestionTarget],
    );

  const handleChangeTargetContext = useCallback(() => { }, []);

  return (
    <Container>
      <AlertDialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialog.Trigger asChild>{triggerButton}</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={'AlertDialogOverlay'} />
          <AlertDialog.Content className="AlertDialogContent">
            {!isLoading ? (
              <>
                <AlertDialog.Title className="AlertDialogTitle">
                  Generate a Quiz
                </AlertDialog.Title>
                <NumberOfQuestionRow>
                  <AlertDialog.Description className="AlertDialogDescription">
                    How many questions do you want to generate
                  </AlertDialog.Description>
                  <NumberInput
                    min={1}
                    type="number"
                    value={numberOfQuestionTarget}
                    onChange={handleChangeTargetNumber}
                  />
                </NumberOfQuestionRow>
                <NumberOfQuestionRow>
                  <AlertDialog.Description className="AlertDialogDescription">
                    Do you want to take your course context
                  </AlertDialog.Description>
                  <NumberInput
                    type="checkbox"
                    onChange={handleChangeTargetContext}
                  />
                </NumberOfQuestionRow>
                <FileDropZone onChange={handleFileChange}>
                  <UploadIcon height={24} width={24} />
                  <Text>Drag & drop any file here</Text>
                  <Text>
                    or <Text color="violet">browse file</Text> from device
                  </Text>
                  <FileInput
                    type="file"
                    className="Input"
                    id="file"
                    accept={
                      'application/pdf, audio/mpeg, audio/mp3, audio/wav, image/png, image/jpeg, image/jpg, text/plain, video/mov, video/mpeg, video/mp4, video/mpg, video/avi, video/wmv, video/mpegps, video/flv'
                    }
                  />
                </FileDropZone>
                {fileTarget && (
                  <Text
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <FileTextIcon />
                    {fileTarget.name} | {(fileTarget.size / 1e6).toFixed(2)} Mo
                  </Text>
                )}
                <CustomDiv>
                  <AlertDialog.Cancel asChild>
                    <CustomButton className="AlertDialogButton mauve">
                      Cancel
                    </CustomButton>
                  </AlertDialog.Cancel>
                  <CustomButton
                    onClick={onAction}
                    className="AlertDialogButton green"
                  >
                    Generate
                  </CustomButton>
                </CustomDiv>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '20px' }}>
                <CustomSpinner />
                <Text style={{ textAlign: 'center' }}>We are currently generating your questions and answers.</Text>
                <Text style={{ textAlign: 'center' }}>Please wait.</Text>
              </div>
            )}
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Container>
  );
};

const Container = styled.div``;

const CustomButton = styled.button``;

const NumberOfQuestionRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NumberInput = styled.input``;

const CustomDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 25px;
`;

const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;

  transform: translate(0, -16px);
`;

const FileDropZone = styled.div`
  margin-top: 24px;

  position: relative;
  width: 100%;
  min-height: 80px;
  padding: 16px 16px 20px 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 8px;

  border: 1px dashed black;
  border-radius: 8px;
  cursor: pointer;
`;

const CustomSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
