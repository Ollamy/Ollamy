import type { CouseSettingInterface } from "../Course/Setting/course.setting.interface";

import {
  ContainerCenteredTitle,
  ContainerSpaceBetween,
  InputCourse,
  RightContainerSetting,
  SubTitle,
  Title,
} from "./profile.style";

export function ProfileInfo({
  title,
  subTitleCourse,
  subTitleInfo,
  subTitlePrice,
}: CouseSettingInterface) {
  return (
    <RightContainerSetting $width="100%">
      <Title>{title}</Title>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleCourse}</SubTitle>
          <InputCourse $width="350px" />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse $width="350px" />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleInfo}</SubTitle>
          <InputCourse $width="350px" />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse $width="350px" />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
    </RightContainerSetting>
  );
}
