import CourseCard from 'pages/Home/Body/CourseCard/CourseCard';
import HomeSearchBar from 'pages/Home/Body/SearchBar/HomeSearchBar';
import styled from 'styled-components';

// eslint-disable-next-line
interface HomeBodyProps {}

function HomeBody({}: HomeBodyProps) {
  const data = [0, 1, 2, 3, 4, 5, 6];

  return (
    <Container>
      <HomeSearchBar />
      <Grid>
        {data.map((elem) => (
          <CourseCard key={elem} />
        ))}
      </Grid>
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

export default HomeBody;
