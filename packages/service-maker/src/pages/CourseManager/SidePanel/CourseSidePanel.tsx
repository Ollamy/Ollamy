import { useMemo, useState } from 'react';
import CourseManager from 'pages/CourseManager/SidePanel/CourseManager/CourseManager';
import SectionCreator from 'pages/CourseManager/SidePanel/Creator/SectionCreator';
import SectionList from 'pages/CourseManager/SidePanel/List/SectionList';
import SectionSearchBar from 'pages/CourseManager/SidePanel/SearchBar/SectionSearchBar';
import type { GetSectionsModel } from 'services/api/out';
import { courseActions } from 'services/api/routes/course';
import styled from 'styled-components';

import { Separator } from '@radix-ui/themes';

interface CourseSidePanelProps {
  courseId: string;
}

export interface CustomCourseSectionModel extends GetSectionsModel {
  realIndex?: number;
}

function CourseSidePanel({ courseId }: CourseSidePanelProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data } = courseActions.useGetCourseSections({ id: courseId });

  const currentData = useMemo<CustomCourseSectionModel[] | undefined>(() => {
    if (!data) return undefined;

    if (!searchValue) {
      return data;
    }

    return data
      .filter((element) =>
        element.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((element) => ({
        ...element,
        realIndex: data.findIndex((p) => p.id === element.id),
      }));
  }, [data, searchValue]);

  return (
    <Container>
      <CourseManager courseId={courseId} />
      <Separator size={'4'} />
      <SectionCreator courseId={courseId} />
      <SectionSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
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
  max-width: 300px;

  > * {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export default CourseSidePanel;
