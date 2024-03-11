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
  userProfile,
}: CouseSettingInterface) {
  return (
    <RightContainerSetting $width="100%">
      <Title>{title}</Title>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleCourse}</SubTitle>
          <InputCourse
            $width="350px"
            defaultValue={userProfile?.firstname}
            disabled
          />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse
            $width="350px"
            defaultValue={userProfile?.email}
            disabled
          />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleInfo}</SubTitle>
          <InputCourse
            $width="350px"
            defaultValue={userProfile?.lastname}
            disabled
          />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse
            $width="350px"
            defaultValue={userProfile?.email}
            disabled
          />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
    </RightContainerSetting>
  );
}
