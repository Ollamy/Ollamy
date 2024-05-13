import type { CouseSettingInterface } from 'components/Course/Setting/course.setting.interface';

import {
  ContainerCenteredTitle,
  ContainerSpaceBetween,
  InputCourse,
  RightContainerSetting,
  SubTitle,
  Title,
} from 'components/profile/profile.style';

export function ProfileInfo({
  title,
  subTitleCourse,
  subTitleInfo,
  subTitlePrice,
}: CouseSettingInterface) {
  return (
    <RightContainerSetting width={'100%'}>
      <Title>{title}</Title>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleCourse}</SubTitle>
          <InputCourse width={'350px'} disabled />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse width={'350px'} disabled />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
      <ContainerSpaceBetween>
        <ContainerCenteredTitle>
          <SubTitle>{subTitleInfo}</SubTitle>
          <InputCourse width={'350px'} disabled />
        </ContainerCenteredTitle>
        <ContainerCenteredTitle>
          <SubTitle>{subTitlePrice}</SubTitle>
          <InputCourse width={'350px'} disabled />
        </ContainerCenteredTitle>
      </ContainerSpaceBetween>
    </RightContainerSetting>
  );
}
