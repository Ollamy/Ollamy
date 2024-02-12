import type { GetCourseRequest, GetUserModel } from "services/api/out";

export interface CouseSettingInterface {
  title: string;
  subTitleCourse: string;
  subTitleInfo: string;
  subTitlePrice: string;
  userProfile: GetUserModel | GetCourseRequest | undefined;
}
