import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';

interface SectionSearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

function SectionSearchBar({
  searchValue,
  setSearchValue,
}: SectionSearchBarProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue],
  );

  return (
    <Container>
      <TextField.Root
        value={searchValue}
        onChange={handleChange}
        placeholder={'Find a section…'}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height={'16'} width={'16'} />
        </TextField.Slot>
      </TextField.Root>
    </Container>
  );
}

const Container = styled.div``;

export default SectionSearchBar;
