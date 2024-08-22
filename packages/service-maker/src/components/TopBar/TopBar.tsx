import { useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

function TopBar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { lessonId } = useParams();

  const urlParams = useMemo(
    () => ({
      courseId: params.get('courseId') ?? undefined,
    }),
    [params]
  );

  const handleClick = useCallback(() => {
    if (lessonId) navigate(`/course/${urlParams.courseId}`);
    else navigate('/home');
  }, []);

  return (
    <Container>
      <ProfilContainer>N</ProfilContainer>
      <Button variant={'outline'} onClick={handleClick}>
        <ArrowLeftIcon />
        Back to {lessonId ? 'course' : 'home'}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  width: 100%;
  min-height: 60px;
  background: white;
  border: 1px solid #e7e7e7;

  padding: 0 20px;
  box-sizing: border-box;
`;

const ProfilContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  border-radius: 2px;
  background: #d5cbff;

  padding: 5px;
  box-sizing: border-box;

  font-size: 14px;
`;

export default TopBar;
