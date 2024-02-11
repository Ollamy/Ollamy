export interface GetQuestionResponse {
	id: string;
	lessonId: string;
	title: string;
	description: string;
	typeAnswer: 'TEXT';
	typeQuestion: 'TEXT';
	trustAnswerId: string;
	pictureId?: string;
	difficulty?: string;
	order: number;
}

export interface GetAnswerRequest {
	id: string;
	questionId: string;
	data?: string;
	picture?: string;
}

export interface ValidateAnswerRequest {
	questionId: string;
	answerId: string;
}

export interface ValidateAnswerResponse {
	success: boolean;
	answer: string;
	end: boolean;
	nextQuestionId?: string | undefined;
}
