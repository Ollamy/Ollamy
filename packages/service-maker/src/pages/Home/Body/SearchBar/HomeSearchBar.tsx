import { Button, TextField } from '@radix-ui/themes';
import styled from 'styled-components';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

// eslint-disable-next-line
interface HomeSearchBarProps {}

function HomeSearchBar({}: HomeSearchBarProps) {
  return (
    <Container>
      <CustomField placeholder={'Search in your course…'}>
        <TextField.Slot>
          <MagnifyingGlassIcon height={'16'} width={'16'} />
        </TextField.Slot>
      </CustomField>
      <CustomButton variant={'outline'}>Search</CustomButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  height: 80px;
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

const CustomButton = styled(Button)`
  color: #000;
  box-shadow: inset 0 0 0 1px var(--gray-a7);

  font-weight: 600;

  cursor: pointer;
`;

export default HomeSearchBar;
