import { useMemo, useState } from 'react';
import CourseCard from 'pages/Home/Body/CourseCard/CourseCard';
import HomeSearchBar from 'pages/Home/Body/SearchBar/HomeSearchBar';
import api from 'services/api';
import styled from 'styled-components';

function HomeBody() {
  const { data } = api.user.useUserCourses();
  const [searchValue, setSearchValue] = useState<string>('');

  const currentData = useMemo(() => {
    if (!data) return undefined;
    return data.courses
      .filter((element) =>
        element.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [data, searchValue]);

  return (
    <Container>
      <HomeSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {currentData ? (
        <Grid>
          {currentData.map(({ id, title, description, pictureId }) => (
            <CourseCard
              key={id}
              courseId={id}
              title={title}
              picture={pictureId}
              description={description}
            />
          ))}
        </Grid>
      ) : (
        <TextPlaceholder>{"You haven't created a course yet!"}</TextPlaceholder>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  gap: 60px;
  width: 100%;

  overflow: hidden;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  flex-grow: 1;

  gap: 30px;

  overflow: scroll;
`;

const TextPlaceholder = styled.p``;

export default HomeBody;
