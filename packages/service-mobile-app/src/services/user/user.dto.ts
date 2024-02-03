export interface GetUserResponse {
	firstname: string;
	lastname: string;
	email: string;
}

export interface GetUserCoursesResponse {
	courses: UserCourse[];
}

interface UserCourse {
	id: string;
	title: string;
	description: string;
	picture_id: string;
	owner: boolean;
}