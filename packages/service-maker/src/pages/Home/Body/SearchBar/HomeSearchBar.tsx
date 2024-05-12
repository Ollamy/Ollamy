import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';

interface HomeSearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

function HomeSearchBar({ searchValue, setSearchValue }: HomeSearchBarProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue],
  );

  return (
    <Container>
      <CustomField
        value={searchValue}
        onChange={handleChange}
        placeholder={'Search in your course…'}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height={'16'} width={'16'} />
        </TextField.Slot>
      </CustomField>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  height: 80px;
  min-height: 80px;
  width: 100%;

  padding: 20px;
  box-sizing: border-box;

  background: rgb(255, 250, 231);
  border: 1px solid #a9a9a9;
`;

const CustomField = styled(TextField.Root)`
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
`;

export default HomeSearchBar;
