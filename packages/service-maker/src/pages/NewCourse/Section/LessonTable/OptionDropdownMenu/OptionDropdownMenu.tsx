import styled from 'styled-components';

import 'styles/dropdownMenu.css';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

function OptionDropdownMenu() {
  return (
    <DropdownMenu.Root>
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
          <DropdownMenu.Item className={'DropdownMenuItem'}>
            Open quiz editor
          </DropdownMenu.Item>
          <DropdownMenu.Item className={'DropdownMenuItem'}>
            Open lecture editor
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={'DropdownMenuSeparator'} />
          <DropdownMenu.Item className={'DropdownMenuItem'}>
            Edit Metadata
          </DropdownMenu.Item>
          <DropdownMenu.Separator className={'DropdownMenuSeparator'} />
          <CustomRemoveRow checked className={'DropdownMenuCheckboxItem'}>
            <DropdownMenu.ItemIndicator className={'DropdownMenuItemIndicator'}>
              <TrashIcon />
            </DropdownMenu.ItemIndicator>
            Remove
          </CustomRemoveRow>
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

export default OptionDropdownMenu;
