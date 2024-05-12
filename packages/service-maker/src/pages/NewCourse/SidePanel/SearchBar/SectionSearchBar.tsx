import { TextField } from '@radix-ui/themes';
import styled from 'styled-components';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

// eslint-disable-next-line
interface SectionSearchBarProps {}

const SectionSearchBar = ({}: SectionSearchBarProps) => {
  return (
    <Container>
      <TextField.Root placeholder={'Find a section…'}>
        <TextField.Slot>
          <MagnifyingGlassIcon height={'16'} width={'16'} />
        </TextField.Slot>
      </TextField.Root>
    </Container>
  );
};

const Container = styled.div``;

export default SectionSearchBar;
