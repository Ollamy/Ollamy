import SectionCreator from 'pages/NewCourse/SidePanel/Creator/SectionCreator';
import SectionList from 'pages/NewCourse/SidePanel/List/SectionList';
import SectionSearchBar from 'pages/NewCourse/SidePanel/SearchBar/SectionSearchBar';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { courseActions } from 'services/api/routes/course';

interface CourseSidePanelProps {
  courseId: string;
}

function CourseSidePanel({ courseId }: CourseSidePanelProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data } = courseActions.useGetCourseSection({ id: courseId });

  const currentData = useMemo(() => {
    if (!data) return undefined;

    if (!searchValue) {
      return data;
    }

    return data
      .filter((element) =>
        element.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [data, searchValue]);

  return (
    <Container>
      <SectionSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <SectionCreator courseId={courseId} />
      <SectionList data={currentData} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  background: #fff;
  border: 1px solid #e7e7e7;

  padding: 20px 0;
  box-sizing: border-box;

  max-height: 100%;
  min-width: 300px;

  > * {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export default CourseSidePanel;
