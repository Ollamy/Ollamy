export interface GetUserResponse {
	firstname: string;
	lastname: string;
	email: string;
}

export interface GetUserCoursesResponse {
	courses: UserCourse[];
}

export interface UserCourse {
	id: string;
	title: string;
	description: string;
	picture: string;
	owner: boolean;
}