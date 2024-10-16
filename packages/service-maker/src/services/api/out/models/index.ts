/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface Answer
 */
export interface Answer {
    /**
     * 
     * @type {string}
     * @memberof Answer
     */
    answer: string;
    /**
     * 
     * @type {boolean}
     * @memberof Answer
     */
    correct: boolean;
}
/**
 * 
 * @export
 * @interface AnswerIdResponse
 */
export interface AnswerIdResponse {
    /**
     * 
     * @type {string}
     * @memberof AnswerIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface AnswerModel
 */
export interface AnswerModel {
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    questionId: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    data?: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    order: string;
}
/**
 * 
 * @export
 * @interface BadgeModel
 */
export interface BadgeModel {
    /**
     * 
     * @type {string}
     * @memberof BadgeModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof BadgeModel
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof BadgeModel
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof BadgeModel
     */
    order: number;
    /**
     * 
     * @type {string}
     * @memberof BadgeModel
     */
    image_name: string;
    /**
     * 
     * @type {string}
     * @memberof BadgeModel
     */
    color: string;
}
/**
 * 
 * @export
 * @interface CourseIdResponse
 */
export interface CourseIdResponse {
    /**
     * 
     * @type {string}
     * @memberof CourseIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface CourseTrueResponse
 */
export interface CourseTrueResponse {
    /**
     * 
     * @type {boolean}
     * @memberof CourseTrueResponse
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface CourseUserStatistic
 */
export interface CourseUserStatistic {
    /**
     * 
     * @type {string}
     * @memberof CourseUserStatistic
     */
    lessonId: string;
    /**
     * 
     * @type {string}
     * @memberof CourseUserStatistic
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof CourseUserStatistic
     */
    average: number;
    /**
     * 
     * @type {number}
     * @memberof CourseUserStatistic
     */
    max: number;
    /**
     * 
     * @type {number}
     * @memberof CourseUserStatistic
     */
    min: number;
    /**
     * 
     * @type {Array<Session>}
     * @memberof CourseUserStatistic
     */
    sessions: Array<Session>;
}
/**
 * 
 * @export
 * @interface CreateAnswerModel
 */
export interface CreateAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    questionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    data?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    picture?: string;
}
/**
 * 
 * @export
 * @interface CreateCourseModel
 */
export interface CreateCourseModel {
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    picture?: string;
}
/**
 * 
 * @export
 * @interface CreateLectureModel
 */
export interface CreateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof CreateLectureModel
     */
    lessonId: string;
    /**
     * Lecture data
     * @type {string}
     * @memberof CreateLectureModel
     */
    data: string;
}
/**
 * 
 * @export
 * @interface CreateLessonModel
 */
export interface CreateLessonModel {
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    sectionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface CreateProductDto
 */
export interface CreateProductDto {
    /**
     * The name of the product
     * @type {string}
     * @memberof CreateProductDto
     */
    name: string;
    /**
     * The description of the product
     * @type {string}
     * @memberof CreateProductDto
     */
    description?: string;
    /**
     * The price of the product in cents
     * @type {number}
     * @memberof CreateProductDto
     */
    price: number;
    /**
     * The currency of the product
     * @type {string}
     * @memberof CreateProductDto
     */
    currency: CreateProductDtoCurrencyEnum;
    /**
     * The renewal of the product
     * @type {string}
     * @memberof CreateProductDto
     */
    renewal: CreateProductDtoRenewalEnum;
}


/**
 * @export
 */
export const CreateProductDtoCurrencyEnum = {
    Usd: 'usd',
    Eur: 'eur',
    Gbp: 'gbp'
} as const;
export type CreateProductDtoCurrencyEnum = typeof CreateProductDtoCurrencyEnum[keyof typeof CreateProductDtoCurrencyEnum];

/**
 * @export
 */
export const CreateProductDtoRenewalEnum = {
    Day: 'day',
    Month: 'month',
    Week: 'week',
    Year: 'year'
} as const;
export type CreateProductDtoRenewalEnum = typeof CreateProductDtoRenewalEnum[keyof typeof CreateProductDtoRenewalEnum];

/**
 * 
 * @export
 * @interface CreateQuestionModel
 */
export interface CreateQuestionModel {
    /**
     * The title of the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    title: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    typeAnswer: CreateQuestionModelTypeAnswerEnum;
    /**
     * The type of question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    typeQuestion: CreateQuestionModelTypeQuestionEnum;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof CreateQuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    difficulty?: CreateQuestionModelDifficultyEnum;
    /**
     * The points for the question
     * @type {number}
     * @memberof CreateQuestionModel
     */
    points?: number;
    /**
     * The time allowed for the response to the question
     * @type {number}
     * @memberof CreateQuestionModel
     */
    time?: number;
    /**
     * Define a bonus question that will not count in the user evaluation
     * @type {boolean}
     * @memberof CreateQuestionModel
     */
    bonus?: boolean;
    /**
     * The unique identifier of the lesson
     * @type {string}
     * @memberof CreateQuestionModel
     */
    lessonId: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    picture?: string;
    /**
     * The unique identifier of the trusted answer
     * @type {string}
     * @memberof CreateQuestionModel
     */
    trustAnswerId?: string;
}


/**
 * @export
 */
export const CreateQuestionModelTypeAnswerEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type CreateQuestionModelTypeAnswerEnum = typeof CreateQuestionModelTypeAnswerEnum[keyof typeof CreateQuestionModelTypeAnswerEnum];

/**
 * @export
 */
export const CreateQuestionModelTypeQuestionEnum = {
    Text: 'TEXT',
    Video: 'VIDEO',
    Image: 'IMAGE',
    Audio: 'AUDIO',
    Order: 'ORDER',
    Other: 'OTHER'
} as const;
export type CreateQuestionModelTypeQuestionEnum = typeof CreateQuestionModelTypeQuestionEnum[keyof typeof CreateQuestionModelTypeQuestionEnum];

/**
 * @export
 */
export const CreateQuestionModelDifficultyEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Master: 'MASTER'
} as const;
export type CreateQuestionModelDifficultyEnum = typeof CreateQuestionModelDifficultyEnum[keyof typeof CreateQuestionModelDifficultyEnum];

/**
 * 
 * @export
 * @interface CreateSectionModel
 */
export interface CreateSectionModel {
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    courseId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface CreateSessionModel
 */
export interface CreateSessionModel {
    /**
     * 
     * @type {string}
     * @memberof CreateSessionModel
     */
    currentQuestionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSessionModel
     */
    sessionId: string;
}
/**
 * 
 * @export
 * @interface CreateUserModel
 */
export interface CreateUserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof CreateUserModel
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof CreateUserModel
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof CreateUserModel
     */
    email: string;
    /**
     * Password must contain at least 8 characters, 2 numbers and 2 uppercase letters
     * @type {string}
     * @memberof CreateUserModel
     */
    password: string;
    /**
     * Platform user tries to access
     * @type {string}
     * @memberof CreateUserModel
     */
    platform: CreateUserModelPlatformEnum;
}


/**
 * @export
 */
export const CreateUserModelPlatformEnum = {
    Mobile: 'MOBILE',
    Maker: 'MAKER'
} as const;
export type CreateUserModelPlatformEnum = typeof CreateUserModelPlatformEnum[keyof typeof CreateUserModelPlatformEnum];

/**
 * 
 * @export
 * @interface EnrollmentResponse
 */
export interface EnrollmentResponse {
    /**
     * 
     * @type {string}
     * @memberof EnrollmentResponse
     */
    userId: string;
    /**
     * 
     * @type {number}
     * @memberof EnrollmentResponse
     */
    epoch: number;
}
/**
 * 
 * @export
 * @interface EnrollmentResponseTotal
 */
export interface EnrollmentResponseTotal {
    /**
     * 
     * @type {number}
     * @memberof EnrollmentResponseTotal
     */
    total: number;
    /**
     * 
     * @type {Array<EnrollmentResponse>}
     * @memberof EnrollmentResponseTotal
     */
    enrollments: Array<EnrollmentResponse>;
    /**
     * 
     * @type {Array<EnrollmentTotal>}
     * @memberof EnrollmentResponseTotal
     */
    cumulative: Array<EnrollmentTotal>;
}
/**
 * 
 * @export
 * @interface EnrollmentTotal
 */
export interface EnrollmentTotal {
    /**
     * 
     * @type {number}
     * @memberof EnrollmentTotal
     */
    epoch: number;
    /**
     * 
     * @type {number}
     * @memberof EnrollmentTotal
     */
    total: number;
}
/**
 * 
 * @export
 * @interface EventTriggered
 */
export interface EventTriggered {
    /**
     * Event type triggered
     * @type {string}
     * @memberof EventTriggered
     */
    type: string;
    /**
     * Badge name
     * @type {string}
     * @memberof EventTriggered
     */
    badge_name: string;
}
/**
 * 
 * @export
 * @interface GetCourseRequest
 */
export interface GetCourseRequest {
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    picture: string;
    /**
     * 
     * @type {number}
     * @memberof GetCourseRequest
     */
    numberOfUsers: number;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    status?: GetCourseRequestStatusEnum;
}


/**
 * @export
 */
export const GetCourseRequestStatusEnum = {
    NotStarted: 'NOT_STARTED',
    InProgress: 'IN_PROGRESS',
    Completed: 'COMPLETED'
} as const;
export type GetCourseRequestStatusEnum = typeof GetCourseRequestStatusEnum[keyof typeof GetCourseRequestStatusEnum];

/**
 * 
 * @export
 * @interface GetLastBuildUrlResponse
 */
export interface GetLastBuildUrlResponse {
    /**
     * 
     * @type {string}
     * @memberof GetLastBuildUrlResponse
     */
    url: string;
}
/**
 * 
 * @export
 * @interface GetQuestionModel
 */
export interface GetQuestionModel {
    /**
     * The title of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    title: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    description?: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    typeAnswer: GetQuestionModelTypeAnswerEnum;
    /**
     * The type of question
     * @type {string}
     * @memberof GetQuestionModel
     */
    typeQuestion: GetQuestionModelTypeQuestionEnum;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof GetQuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    difficulty?: GetQuestionModelDifficultyEnum;
    /**
     * The order of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    order: string;
    /**
     * The points for the question
     * @type {number}
     * @memberof GetQuestionModel
     */
    points?: number;
    /**
     * The time allowed for the response to the question
     * @type {number}
     * @memberof GetQuestionModel
     */
    time?: number;
    /**
     * Define a bonus question that will not count in the user evaluation
     * @type {boolean}
     * @memberof GetQuestionModel
     */
    bonus?: boolean;
    /**
     * The unique identifier of the trusted answer
     * @type {string}
     * @memberof GetQuestionModel
     */
    trust_answer_id?: string;
}


/**
 * @export
 */
export const GetQuestionModelTypeAnswerEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type GetQuestionModelTypeAnswerEnum = typeof GetQuestionModelTypeAnswerEnum[keyof typeof GetQuestionModelTypeAnswerEnum];

/**
 * @export
 */
export const GetQuestionModelTypeQuestionEnum = {
    Text: 'TEXT',
    Video: 'VIDEO',
    Image: 'IMAGE',
    Audio: 'AUDIO',
    Order: 'ORDER',
    Other: 'OTHER'
} as const;
export type GetQuestionModelTypeQuestionEnum = typeof GetQuestionModelTypeQuestionEnum[keyof typeof GetQuestionModelTypeQuestionEnum];

/**
 * @export
 */
export const GetQuestionModelDifficultyEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Master: 'MASTER'
} as const;
export type GetQuestionModelDifficultyEnum = typeof GetQuestionModelDifficultyEnum[keyof typeof GetQuestionModelDifficultyEnum];

/**
 * 
 * @export
 * @interface GetSectionModel
 */
export interface GetSectionModel {
    /**
     * 
     * @type {string}
     * @memberof GetSectionModel
     */
    courseId: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionModel
     */
    order: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionModel
     */
    status?: GetSectionModelStatusEnum;
}


/**
 * @export
 */
export const GetSectionModelStatusEnum = {
    NotStarted: 'NOT_STARTED',
    InProgress: 'IN_PROGRESS',
    Completed: 'COMPLETED'
} as const;
export type GetSectionModelStatusEnum = typeof GetSectionModelStatusEnum[keyof typeof GetSectionModelStatusEnum];

/**
 * 
 * @export
 * @interface GetSectionsModel
 */
export interface GetSectionsModel {
    /**
     * 
     * @type {string}
     * @memberof GetSectionsModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionsModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionsModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionsModel
     */
    order: string;
    /**
     * 
     * @type {string}
     * @memberof GetSectionsModel
     */
    status?: GetSectionsModelStatusEnum;
}


/**
 * @export
 */
export const GetSectionsModelStatusEnum = {
    NotStarted: 'NOT_STARTED',
    InProgress: 'IN_PROGRESS',
    Completed: 'COMPLETED'
} as const;
export type GetSectionsModelStatusEnum = typeof GetSectionsModelStatusEnum[keyof typeof GetSectionsModelStatusEnum];

/**
 * 
 * @export
 * @interface GetSessionModel
 */
export interface GetSessionModel {
    /**
     * 
     * @type {string}
     * @memberof GetSessionModel
     */
    currentQuestionId: string;
    /**
     * 
     * @type {number}
     * @memberof GetSessionModel
     */
    correctAnswers: number;
    /**
     * 
     * @type {number}
     * @memberof GetSessionModel
     */
    totalQuestions: number;
}
/**
 * 
 * @export
 * @interface GetUserModel
 */
export interface GetUserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof GetUserModel
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof GetUserModel
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof GetUserModel
     */
    email: string;
}
/**
 * 
 * @export
 * @interface GetUserScoreModel
 */
export interface GetUserScoreModel {
    /**
     * The unique identifier of the user
     * @type {string}
     * @memberof GetUserScoreModel
     */
    userId: string;
    /**
     * The score of the user
     * @type {number}
     * @memberof GetUserScoreModel
     */
    score: number;
}
/**
 * 
 * @export
 * @interface GetUsersBadges
 */
export interface GetUsersBadges {
    /**
     * 
     * @type {Array<BadgeModel>}
     * @memberof GetUsersBadges
     */
    badges: Array<BadgeModel>;
}
/**
 * 
 * @export
 * @interface GradeStatisticModel
 */
export interface GradeStatisticModel {
    /**
     * 
     * @type {number}
     * @memberof GradeStatisticModel
     */
    average?: number;
    /**
     * 
     * @type {number}
     * @memberof GradeStatisticModel
     */
    min?: number;
    /**
     * 
     * @type {number}
     * @memberof GradeStatisticModel
     */
    max?: number;
    /**
     * 
     * @type {string}
     * @memberof GradeStatisticModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof GradeStatisticModel
     */
    firstname?: string;
    /**
     * 
     * @type {string}
     * @memberof GradeStatisticModel
     */
    lastname?: string;
}
/**
 * 
 * @export
 * @interface IdAnswerModel
 */
export interface IdAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof IdAnswerModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdCourseModel
 */
export interface IdCourseModel {
    /**
     * 
     * @type {string}
     * @memberof IdCourseModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdLectureModel
 */
export interface IdLectureModel {
    /**
     * ID of the lecture
     * @type {string}
     * @memberof IdLectureModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdLessonModel
 */
export interface IdLessonModel {
    /**
     * 
     * @type {string}
     * @memberof IdLessonModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdQuestionModel
 */
export interface IdQuestionModel {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof IdQuestionModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdSectionModel
 */
export interface IdSectionModel {
    /**
     * 
     * @type {string}
     * @memberof IdSectionModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LectureIdResponse
 */
export interface LectureIdResponse {
    /**
     * ID of the created/updated lecture
     * @type {string}
     * @memberof LectureIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LectureModel
 */
export interface LectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof LectureModel
     */
    lessonId: string;
    /**
     * Lecture data
     * @type {string}
     * @memberof LectureModel
     */
    data: string;
}
/**
 * 
 * @export
 * @interface LessonIdResponse
 */
export interface LessonIdResponse {
    /**
     * 
     * @type {string}
     * @memberof LessonIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LessonLectureModel
 */
export interface LessonLectureModel {
    /**
     * The unique identifier of the lecture
     * @type {string}
     * @memberof LessonLectureModel
     */
    id: string;
    /**
     * The data of the lecture
     * @type {string}
     * @memberof LessonLectureModel
     */
    data: string;
}
/**
 * 
 * @export
 * @interface LessonModel
 */
export interface LessonModel {
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    status: LessonModelStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    order: string;
    /**
     * 
     * @type {number}
     * @memberof LessonModel
     */
    numberOfQuestions: number;
    /**
     * 
     * @type {number}
     * @memberof LessonModel
     */
    numberOfLectures: number;
}


/**
 * @export
 */
export const LessonModelStatusEnum = {
    NotStarted: 'NOT_STARTED',
    InProgress: 'IN_PROGRESS',
    Completed: 'COMPLETED'
} as const;
export type LessonModelStatusEnum = typeof LessonModelStatusEnum[keyof typeof LessonModelStatusEnum];

/**
 * 
 * @export
 * @interface LoginUserModel
 */
export interface LoginUserModel {
    /**
     * The email address of the user
     * @type {string}
     * @memberof LoginUserModel
     */
    email: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof LoginUserModel
     */
    password: string;
    /**
     * Platform user tries to login
     * @type {string}
     * @memberof LoginUserModel
     */
    platform: LoginUserModelPlatformEnum;
}


/**
 * @export
 */
export const LoginUserModelPlatformEnum = {
    Mobile: 'MOBILE',
    Maker: 'MAKER'
} as const;
export type LoginUserModelPlatformEnum = typeof LoginUserModelPlatformEnum[keyof typeof LoginUserModelPlatformEnum];

/**
 * 
 * @export
 * @interface Question
 */
export interface Question {
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    type: QuestionTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Question
     */
    question: string;
    /**
     * 
     * @type {Array<Answer>}
     * @memberof Question
     */
    answers: Array<Answer>;
}


/**
 * @export
 */
export const QuestionTypeEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type QuestionTypeEnum = typeof QuestionTypeEnum[keyof typeof QuestionTypeEnum];

/**
 * 
 * @export
 * @interface QuestionAnswerModel
 */
export interface QuestionAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    data?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    order: string;
}
/**
 * 
 * @export
 * @interface QuestionIdResponse
 */
export interface QuestionIdResponse {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof QuestionIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface QuestionModel
 */
export interface QuestionModel {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof QuestionModel
     */
    id: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof QuestionModel
     */
    title: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof QuestionModel
     */
    description?: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof QuestionModel
     */
    typeAnswer: QuestionModelTypeAnswerEnum;
    /**
     * The type of question
     * @type {string}
     * @memberof QuestionModel
     */
    typeQuestion: QuestionModelTypeQuestionEnum;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof QuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof QuestionModel
     */
    difficulty?: QuestionModelDifficultyEnum;
    /**
     * The order of the question
     * @type {string}
     * @memberof QuestionModel
     */
    order: string;
    /**
     * The points for the question
     * @type {number}
     * @memberof QuestionModel
     */
    points?: number;
    /**
     * The time allowed for the response to the question
     * @type {number}
     * @memberof QuestionModel
     */
    time?: number;
    /**
     * Define a bonus question that will not count in the user evaluation
     * @type {boolean}
     * @memberof QuestionModel
     */
    bonus?: boolean;
}


/**
 * @export
 */
export const QuestionModelTypeAnswerEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type QuestionModelTypeAnswerEnum = typeof QuestionModelTypeAnswerEnum[keyof typeof QuestionModelTypeAnswerEnum];

/**
 * @export
 */
export const QuestionModelTypeQuestionEnum = {
    Text: 'TEXT',
    Video: 'VIDEO',
    Image: 'IMAGE',
    Audio: 'AUDIO',
    Order: 'ORDER',
    Other: 'OTHER'
} as const;
export type QuestionModelTypeQuestionEnum = typeof QuestionModelTypeQuestionEnum[keyof typeof QuestionModelTypeQuestionEnum];

/**
 * @export
 */
export const QuestionModelDifficultyEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Master: 'MASTER'
} as const;
export type QuestionModelDifficultyEnum = typeof QuestionModelDifficultyEnum[keyof typeof QuestionModelDifficultyEnum];

/**
 * 
 * @export
 * @interface SectionIdResponse
 */
export interface SectionIdResponse {
    /**
     * 
     * @type {string}
     * @memberof SectionIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface Session
 */
export interface Session {
    /**
     * 
     * @type {number}
     * @memberof Session
     */
    correctAnswers: number;
    /**
     * 
     * @type {number}
     * @memberof Session
     */
    totalQuestions: number;
    /**
     * 
     * @type {number}
     * @memberof Session
     */
    timeTakenInSeconds: number;
}
/**
 * 
 * @export
 * @interface ShareCourseCode
 */
export interface ShareCourseCode {
    /**
     * Course's sharing code
     * @type {string}
     * @memberof ShareCourseCode
     */
    code: string;
    /**
     * Code's date of expiration
     * @type {string}
     * @memberof ShareCourseCode
     */
    expiresAt: string;
}
/**
 * 
 * @export
 * @interface SuccessBody
 */
export interface SuccessBody {
    /**
     * Result of the request
     * @type {boolean}
     * @memberof SuccessBody
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface UpdateAnswerModel
 */
export interface UpdateAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    questionId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    data?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    picture?: string | null;
}
/**
 * 
 * @export
 * @interface UpdateAnswerOrderModel
 */
export interface UpdateAnswerOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    after?: string | null;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    before?: string | null;
    /**
     * The origin of the answer
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    origin: string;
}
/**
 * 
 * @export
 * @interface UpdateCourseModel
 */
export interface UpdateCourseModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    ownerId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    picture?: string | null;
}
/**
 * 
 * @export
 * @interface UpdateLectureModel
 */
export interface UpdateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof UpdateLectureModel
     */
    lessonId?: string;
    /**
     * Updated lecture data
     * @type {string}
     * @memberof UpdateLectureModel
     */
    data?: string;
}
/**
 * 
 * @export
 * @interface UpdateLessonModel
 */
export interface UpdateLessonModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateLessonModel
     */
    sectionId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateLessonModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateLessonModel
     */
    description?: string;
}
/**
 * 
 * @export
 * @interface UpdateLessonOrderModel
 */
export interface UpdateLessonOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateLessonOrderModel
     */
    after?: string | null;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateLessonOrderModel
     */
    before?: string | null;
    /**
     * Object's id
     * @type {string}
     * @memberof UpdateLessonOrderModel
     */
    origin: string;
}
/**
 * 
 * @export
 * @interface UpdateQuestionModel
 */
export interface UpdateQuestionModel {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    id?: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    title?: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    description?: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    typeAnswer?: UpdateQuestionModelTypeAnswerEnum;
    /**
     * The type of question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    typeQuestion?: UpdateQuestionModelTypeQuestionEnum;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    difficulty?: UpdateQuestionModelDifficultyEnum;
    /**
     * The order of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    order?: string;
    /**
     * The points for the question
     * @type {number}
     * @memberof UpdateQuestionModel
     */
    points?: number;
    /**
     * The time allowed for the response to the question
     * @type {number}
     * @memberof UpdateQuestionModel
     */
    time?: number;
    /**
     * Define a bonus question that will not count in the user evaluation
     * @type {boolean}
     * @memberof UpdateQuestionModel
     */
    bonus?: boolean;
    /**
     * The unique identifier of the lesson
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    lessonId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    picture?: string | null;
    /**
     * The unique identifier of the trusted answer
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    trustAnswerId?: string;
}


/**
 * @export
 */
export const UpdateQuestionModelTypeAnswerEnum = {
    FreeAnswer: 'FREE_ANSWER',
    MultipleChoice: 'MULTIPLE_CHOICE',
    SquareChoice: 'SQUARE_CHOICE',
    OrderChoice: 'ORDER_CHOICE'
} as const;
export type UpdateQuestionModelTypeAnswerEnum = typeof UpdateQuestionModelTypeAnswerEnum[keyof typeof UpdateQuestionModelTypeAnswerEnum];

/**
 * @export
 */
export const UpdateQuestionModelTypeQuestionEnum = {
    Text: 'TEXT',
    Video: 'VIDEO',
    Image: 'IMAGE',
    Audio: 'AUDIO',
    Order: 'ORDER',
    Other: 'OTHER'
} as const;
export type UpdateQuestionModelTypeQuestionEnum = typeof UpdateQuestionModelTypeQuestionEnum[keyof typeof UpdateQuestionModelTypeQuestionEnum];

/**
 * @export
 */
export const UpdateQuestionModelDifficultyEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED',
    Master: 'MASTER'
} as const;
export type UpdateQuestionModelDifficultyEnum = typeof UpdateQuestionModelDifficultyEnum[keyof typeof UpdateQuestionModelDifficultyEnum];

/**
 * 
 * @export
 * @interface UpdateQuestionOrderModel
 */
export interface UpdateQuestionOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    after?: string | null;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    before?: string | null;
    /**
     * Object's id
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    origin: string;
}
/**
 * 
 * @export
 * @interface UpdateSectionModel
 */
export interface UpdateSectionModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    courseId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    description?: string;
}
/**
 * 
 * @export
 * @interface UpdateSectionOrderModel
 */
export interface UpdateSectionOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateSectionOrderModel
     */
    after?: string | null;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateSectionOrderModel
     */
    before?: string | null;
    /**
     * Object's id
     * @type {string}
     * @memberof UpdateSectionOrderModel
     */
    origin: string;
}
/**
 * 
 * @export
 * @interface UpdateUserModel
 */
export interface UpdateUserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    firstname?: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    lastname?: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    email?: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    password?: string;
}
/**
 * 
 * @export
 * @interface UserCourseHp
 */
export interface UserCourseHp {
    /**
     * 
     * @type {number}
     * @memberof UserCourseHp
     */
    hp: number;
    /**
     * 
     * @type {string}
     * @memberof UserCourseHp
     */
    timer: string;
}
/**
 * 
 * @export
 * @interface UserCourses
 */
export interface UserCourses {
    /**
     * The unique identifier of the course
     * @type {string}
     * @memberof UserCourses
     */
    id: string;
    /**
     * The title of the course
     * @type {string}
     * @memberof UserCourses
     */
    title: string;
    /**
     * The description of the course
     * @type {string}
     * @memberof UserCourses
     */
    description: string;
    /**
     * The URL of the picture representing the course
     * @type {string}
     * @memberof UserCourses
     */
    pictureId: string;
    /**
     * Indicates if the user owns this course
     * @type {boolean}
     * @memberof UserCourses
     */
    owner: boolean;
    /**
     * The number of users enrolled in the course
     * @type {number}
     * @memberof UserCourses
     */
    numberOfUsers?: number;
    /**
     * course completion status
     * @type {string}
     * @memberof UserCourses
     */
    status?: UserCoursesStatusEnum;
}


/**
 * @export
 */
export const UserCoursesStatusEnum = {
    NotStarted: 'NOT_STARTED',
    InProgress: 'IN_PROGRESS',
    Completed: 'COMPLETED'
} as const;
export type UserCoursesStatusEnum = typeof UserCoursesStatusEnum[keyof typeof UserCoursesStatusEnum];

/**
 * 
 * @export
 * @interface UserCoursesResponse
 */
export interface UserCoursesResponse {
    /**
     * List of courses associated with the user
     * @type {Array<UserCourses>}
     * @memberof UserCoursesResponse
     */
    courses: Array<UserCourses>;
}
/**
 * 
 * @export
 * @interface UserIdResponse
 */
export interface UserIdResponse {
    /**
     * The unique identifier of the user
     * @type {string}
     * @memberof UserIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface UserTrueResponse
 */
export interface UserTrueResponse {
    /**
     * Indicates if the operation was successful or not
     * @type {boolean}
     * @memberof UserTrueResponse
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface ValidateAnswerModel
 */
export interface ValidateAnswerModel {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    questionId: string;
    /**
     * The unique identifier of the answer
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    answerId?: string;
    /**
     * The data of the answer
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    data?: string;
}
/**
 * 
 * @export
 * @interface ValidateAnswerResponse
 */
export interface ValidateAnswerResponse {
    /**
     * Indicates if the answer is true or false
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    success: boolean;
    /**
     * The unique identifier of the true answer
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    answer: string;
    /**
     * Indicates if it is the last question or not
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    end: boolean;
    /**
     * The unique identifier of the next question if it is not the last one
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    nextQuestionId?: string;
    /**
     * Points scored in the last question
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    points?: number;
    /**
     * User's remaining hp
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    hp?: number;
}
/**
 * 
 * @export
 * @interface ValidateQuestionSessionModel
 */
export interface ValidateQuestionSessionModel {
    /**
     * 
     * @type {string}
     * @memberof ValidateQuestionSessionModel
     */
    questionId: string;
    /**
     * 
     * @type {AnswerModel}
     * @memberof ValidateQuestionSessionModel
     */
    answer: AnswerModel;
}
/**
 * 
 * @export
 * @interface ValidateQuestionSessionResponseModel
 */
export interface ValidateQuestionSessionResponseModel {
    /**
     * 
     * @type {boolean}
     * @memberof ValidateQuestionSessionResponseModel
     */
    success: boolean;
    /**
     * 
     * @type {string}
     * @memberof ValidateQuestionSessionResponseModel
     */
    nextQuestionId: string | null;
    /**
     * 
     * @type {string}
     * @memberof ValidateQuestionSessionResponseModel
     */
    answerId: string;
    /**
     * 
     * @type {number}
     * @memberof ValidateQuestionSessionResponseModel
     */
    hp: number;
}
