import { CouseSettingInterface } from 'components/Course/Setting/course.setting.interface';
import {
  ContainerSpaceBetween,
  InputCourse,
  RightContainerSetting,
  SubTitle,
  Title,
} from 'components/Course/Setting/course.setting.style';
import { ContainerPlacement } from 'components/Carrousel/carrousel.style';

export function CourseSetting({
  title,
  subTitleCourse,
  subTitleInfo,
  subTitlePrice,
}: CouseSettingInterface) {
  return (
    <RightContainerSetting width="540px">
      <Title>{title}</Title>
      <ContainerPlacement>
        <SubTitle>{subTitleCourse}</SubTitle>
        <InputCourse width={'80%'} />
      </ContainerPlacement>
      <ContainerSpaceBetween>
        <div>
          <SubTitle>{subTitleInfo}</SubTitle>
          <InputCourse width={'200px'} />
        </div>
        <div>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse width={'200px'} />
        </div>
      </ContainerSpaceBetween>
    </RightContainerSetting>
  );
}
