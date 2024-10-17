import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface DeleteModalProps {
  title: string;
  description: string;
  onDeleteAnswer: () => void;
}

function DeleteModal({ title, description, onDeleteAnswer }: DeleteModalProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <IconButton variant="ghost" color="crimson">
          <TrashIcon />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            {description}
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="Button red" onClick={onDeleteAnswer}>
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default DeleteModal;
