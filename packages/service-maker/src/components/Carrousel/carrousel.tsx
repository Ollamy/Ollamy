import { CarrouselMakerInterface } from 'components/Carrousel/carrousel.interface';
import {
  BaseDiv,
  ContainerHeight,
  ContainerPlacement,
  ContainerSpaceAroundElement,
  ContainerWidth,
  CourseCard,
  SubTitle,
  Title,
} from 'components/Carrousel/carrousel.style';

export function CarrouselMaker({
  title,
  image,
  startPoint = 0,
}: CarrouselMakerInterface) {
  return (
    <ContainerHeight>
      <ContainerWidth width="1040px">
        <ContainerPlacement>
          <Title>{title}</Title>
          <ContainerSpaceAroundElement>
            <BaseDiv>{'<'}</BaseDiv>
            <CourseCard>
              <img
                src={
                  image[startPoint].imagePathArray !== undefined
                    ? image[startPoint].imagePathArray
                    : '/assets/react.svg'
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
                    : '/assets/react.svg'
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
                    : '/assets/react.svg'
                }
                alt=""
                height="100px"
              />
              <SubTitle>{image[startPoint + 2].subtitle}</SubTitle>
            </CourseCard>
            <BaseDiv>{'>'}</BaseDiv>
          </ContainerSpaceAroundElement>
        </ContainerPlacement>
      </ContainerWidth>
    </ContainerHeight>
  );
}
