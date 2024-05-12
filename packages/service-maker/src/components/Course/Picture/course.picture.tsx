import { CoursePictureInterface } from 'components/Course/Picture/course.picture.interface';
import { RightContainerSetting } from 'components/profile/profile.style';
import { ContainerPlacement } from 'components/Carrousel/carrousel.style';
import {
  Title,
  UploadPictureButton,
} from 'components/Course/Picture/course.picture.style';

export function CoursePicture({
  title,
  width = '400px',
  height = '340px',
}: CoursePictureInterface) {
  return (
    <RightContainerSetting width={width}>
      <ContainerPlacement>
        <Title>{title}</Title>
        <img src={'/assets/profile.png'} alt={''} height={'180px'} />
        <UploadPictureButton>Upload picture</UploadPictureButton>
      </ContainerPlacement>
    </RightContainerSetting>
  );
}
