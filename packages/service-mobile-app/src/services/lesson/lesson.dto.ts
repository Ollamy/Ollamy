export interface LessonResponse {
  id: string;
  sectionId: string;
  title: string;
  description: string;
}

export interface GetLessonQuestionsRequest {
	id: string;
	lessonId: string;
	title: string;
	description: string;
	typeAnswer: string;
	typeQuestion: string;
	order: number;
}

export interface GetLessonLectureRequest {
	id: string;
	lessonId: string;
	data: string;
}
