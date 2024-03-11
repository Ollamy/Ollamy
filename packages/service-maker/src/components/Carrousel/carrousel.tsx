import react from "../../assets/react.svg";

import type { CarrouselMakerInterface } from "./carrousel.interface";

import {
  BaseDiv,
  ContainerHeight,
  ContainerPlacement,
  ContainerSpaceAroundElement,
  ContainerWidth,
  CourseCard,
  SubTitle,
  Title,
} from "./carrousel.style";

export function CarrouselMaker({
  title,
  image,
  startPoint = 0,
}: CarrouselMakerInterface): React.ReactNode {
  return (
    <ContainerHeight>
      <ContainerWidth $width="1040px">
        <ContainerPlacement>
          <Title>{title}</Title>
          <ContainerSpaceAroundElement>
            <BaseDiv>{"<"}</BaseDiv>
            <CourseCard>
              <img
                src={
                  image[startPoint].imagePathArray !== undefined
                    ? image[startPoint].imagePathArray
                    : react
                }
                alt=""
                height="100px"
              />
              <SubTitle>{image[startPoint].subtitle}</SubTitle>
            </CourseCard>
            <CourseCard>
              <img
                src={
                  image[startPoint].imagePathArray !== undefined
                    ? image[startPoint + 1].imagePathArray
                    : react
                }
                alt=""
                height="100px"
              />
              <SubTitle>{image[startPoint + 1].subtitle}</SubTitle>
            </CourseCard>
            <CourseCard>
              <img
                src={
                  image[startPoint].imagePathArray !== undefined
                    ? image[startPoint + 2].imagePathArray
                    : react
                }
                alt=""
                height="100px"
              />
              <SubTitle>{image[startPoint + 2].subtitle}</SubTitle>
            </CourseCard>
            <BaseDiv>{">"}</BaseDiv>
          </ContainerSpaceAroundElement>
        </ContainerPlacement>
      </ContainerWidth>
    </ContainerHeight>
  );
}
