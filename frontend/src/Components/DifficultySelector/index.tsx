import { useState } from "react";
import styled from "styled-components";
import Title from "../Title";

const DifficultySelector = () => {
  const [difficulty, setDifficulty] = useState(0);
  return (
    <>
      <Title>Difficulté</Title>
      <DifficultyContainer>
        {[1, 2, 3, 4, 5].map((el, index) => (
          <DifficultyStar
            onClick={() => {
              setDifficulty(index);
            }}
            index={index}
            difficulty={difficulty}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9KH-FJ3oVq0gKLqCbqnC7RpdDVOc7cU0-JnJcYs&s"
            alt=""
            key={`star-${index}`}
          />
        ))}
      </DifficultyContainer>
    </>
  );
};

interface DifficultyStarProps {
  difficulty: number;
  index: number;
}

const DifficultyStar = styled.img<DifficultyStarProps>`
  width: 24px;
  height: 24px;

  cursor: pointer;
  filter: grayscale(${({ difficulty, index }) => (index > difficulty ? 1 : 0)});
`;

const DifficultyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

export default DifficultySelector;
