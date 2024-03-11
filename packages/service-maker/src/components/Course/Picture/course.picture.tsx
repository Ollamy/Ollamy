import profile from "../../../assets/profile.png";

import type { CoursePictureInterface } from "./course.picture.interface";

import { ContainerPlacement } from "../../Carrousel/carrousel.style";
import {
  RightContainerSetting,
  Title,
  UploadPictureButton,
} from "./course.picture.style";

export function CoursePicture({
  title,
  width = "400px",
  height = "340px",
}: CoursePictureInterface) {
  return (
    <RightContainerSetting $width={width} $height={height}>
      <ContainerPlacement>
        <Title>{title}</Title>
        <img src={profile} alt="" height="180px" />
        <UploadPictureButton>Upload picture</UploadPictureButton>
      </ContainerPlacement>
    </RightContainerSetting>
  );
}
