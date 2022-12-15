import Image from 'next/image';
import styled from 'styled-components';
import starIcon from './../../../public/assets/star.svg';

interface DifficultyProps {
  difficulty: number
  difficultyMax: number
};

const DifficultyStar = ({difficulty, difficultyMax}: DifficultyProps): JSX.Element => {
  return (
    <Container>
      {
        Array.from({ length: difficultyMax }, (_, i) =>
         <Image
          key={i}
          src={starIcon}
          alt={""}
          style={{height: "100%", opacity: i >= difficulty ? "30%" : undefined}}
        />)
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  padding: 8px;

  width: fit-content;
  background: rgba(236, 230, 252, 0.7);
  border-radius: 8px;
`;

export default DifficultyStar;