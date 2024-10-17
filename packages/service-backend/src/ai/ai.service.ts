import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  GenerateContentRequest,
  GenerateContentResult,
  GenerativeModelPreview,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai';
import { AllowedMimeType, FileAi, Question } from './ai.dto';
import { AnswerType, Prisma, QuestionType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../client';
import { generateKeyBetween } from 'order/order.service';
import { CourseTrueResponse } from '../course/course.dto';

@Injectable()
export class AiService {
  static vertexAi: VertexAI;
  static model: string;
  static generativeModel: GenerativeModelPreview;

  constructor() {
    AiService.vertexAi = new VertexAI({
      project: 'ultimate-opus-422723-q5',
      location: 'us-central1',
    });
    AiService.model = 'gemini-experimental';
    AiService.generativeModel = AiService.vertexAi.preview.getGenerativeModel({
      model: AiService.model,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1,
        topP: 0.95,
        responseMimeType: 'application/json',
      } as any,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });
  }

  async generateText(
    file: FileAi,
    numberOfQuestions: number,
    questionType: AnswerType = 'MULTIPLE_CHOICE',
  ): Promise<Question[]> {
    const req: GenerateContentRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Here is a ${
                AllowedMimeType[file.mimeType]
              } file I need you to generate ${questionType} questions from. Please create **${numberOfQuestions}** questions. If there is an issue with the file, it is not suitable for question generation, or the number of questions is invalid, please return an error in the following JSON format: {"error": "Your error message here"}`,
            },
            {
              inlineData: file,
            },
          ],
        },
      ],
      systemInstruction: {
        role: 'model',
        parts: [
          {
            text: `You are an AI assistant designed to create different types of questions from PDF files. You will receive a PDF file, the desired number of questions, and the question type as input.

    **Supported Question Types:**

    - **FREE_ANSWER:** Generate one correct answer.
      *Example:*
      \`\`\`json
      {
        "type": "FREE_ANSWER",
        "question": "What is your favorite color?",
        "answers": [
          { "answer": "BLUE", "correct": true }
        ]
      }
      \`\`\`

    - **MULTIPLE_CHOICE:** Generate four answer choices with one correct answer.
      *Example:*
      \`\`\`json
      {
        "type": "MULTIPLE_CHOICE",
        "question": "What is the capital of France?",
        "answers": [
          { "answer": "PARIS", "correct": true },
          { "answer": "LONDON", "correct": false },
          { "answer": "MADRID", "correct": false },
          { "answer": "BERLIN", "correct": false }
        ]
      }
      \`\`\`

    - **SQUARE_CHOICE:** Generate four short answer choices with one correct answer.
      *Example:*
      \`\`\`json
      {
        "type": "SQUARE_CHOICE",
        "question": "What is the capital of France?",
        "answers": [
          { "answer": "PARIS", "correct": true },
          { "answer": "LONDON", "correct": false },
          { "answer": "MADRID", "correct": false },
          { "answer": "BERLIN", "correct": false }
        ]
      }
      \`\`\`

    - **ORDER_CHOICE:** Generate one sentence answer that needs to be ordered correctly. Words in the sentence should be separated by '/'.
      *Example:*
      \`\`\`json
      {
        "type": "ORDER_CHOICE",
        "question": "What is the color of the fox?",
        "answers": [
          { "answer": "The / color / of / the / fox / is / red!", "correct": true }
        ]
      }
      \`\`\`

    **Your Task**

    1. **Validate Input:**
       - Ensure the ${
         AllowedMimeType[file.mimeType]
       } file is readable and contains sufficient information for question generation.
       - Check that the requested number of questions is a positive integer. If not, return an error message: { "error": "Invalid number of questions. Please provide a positive integer." }.
       - Check that the question type is one of the supported types. If not, return an error message: { "error": "Invalid question type. Please choose from: FREE_ANSWER, MULTIPLE_CHOICE, SQUARE_CHOICE, ORDER_CHOICE" }.

    2. **Extract Information:**
       - Analyze the ${
         AllowedMimeType[file.mimeType]
       } to identify key concepts, facts, and relationships.

    3. **Formulate Questions:**
       - Craft clear, concise, and relevant questions of the specified type.

    4. **Handle Errors:**
       - If the ${
         AllowedMimeType[file.mimeType]
       } is unreadable, lacks sufficient content, or there's an issue generating the specified number of questions, return an error message: { "error": "Your specific error message here" }.

    5. **Return Output:**
       - If successful, return the questions as a JSON in the following format (the JSON should be serialized without spaces or newlines):

       \`\`\`json
        [
          {
            "type": "...", // Type of question (FREE_ANSWER, MULTIPLE_CHOICE, SQUARE_CHOICE, ORDER_CHOICE)
            "question": "...",
            "answers": [
              { "answer": "...", "correct": true },
              { "answer": "...", "correct": false },
              // ... more answers depending on the question type
            ]
          },
          ... (more questions)
        ]
       \`\`\`
         `,
          },
        ],
      },
    };

    let response: GenerateContentResult;
    try {
      response = await AiService.generativeModel.generateContent(req);
    } catch (e) {
      Logger.error(e);
      throw new ConflictException('Failed to generate questions');
    }

    const data = JSON.parse(
      response.response.candidates[0].content.parts[0].text,
    );

    if (data.error) {
      throw new ConflictException(data);
    }

    return data as Question[];
  }

  private async getLastOrderQuestion(lessonId: string) {
    const result = await prisma.question.findFirst({
      where: { lesson_id: lessonId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    return result?.order ?? null;
  }

  async createQuizz(questions: Question[], lessonId: string) {
    let lastQuestionOrder = await this.getLastOrderQuestion(lessonId);

    const questionsToCreate: Prisma.QuestionCreateManyInput[] = [];
    const answersToCreate: Prisma.AnswerCreateManyInput[] = [];

    for (const questionData of questions) {
      const questionId = uuidv4();

      lastQuestionOrder = generateKeyBetween(lastQuestionOrder, null);
      const questionOrder = lastQuestionOrder;

      const answersForThisQuestion: Prisma.AnswerCreateManyInput[] = [];
      let trustAnswerId: string | undefined;

      let currentAnswerOrder = 'a0';

      for (const answerData of questionData.answers) {
        const answerId = uuidv4();

        answersForThisQuestion.push({
          id: answerId,
          question_id: questionId,
          data: answerData.answer,
          order: currentAnswerOrder,
        });

        if (answerData.correct) {
          trustAnswerId = answerId;
        }

        currentAnswerOrder = generateKeyBetween(currentAnswerOrder, null);
      }

      questionsToCreate.push({
        id: questionId,
        lesson_id: lessonId,
        title: questionData.question,
        type_question: QuestionType.TEXT,
        type_answer: questionData.type,
        order: questionOrder,
        trust_answer_id: trustAnswerId,
      });

      answersToCreate.push(...answersForThisQuestion);
    }

    try {
      await prisma.$transaction([
        prisma.question.createMany({ data: questionsToCreate }),
        prisma.answer.createMany({ data: answersToCreate }),
      ]);
    } catch (e) {
      Logger.error('Failed to create questions !');
      throw new ConflictException('Failed to create questions');
    }

    return { success: true } as CourseTrueResponse;
  }

  async createCourse(courseData: any, userId: string) {
    const sectionsToCreate: Prisma.SectionCreateManyInput[] = [];
    const questionsToCreate: Prisma.QuestionCreateManyInput[] = [];
    const lecturesToCreate: Prisma.LectureCreateManyInput[] = [];
    const lessonsToCreate: Prisma.LessonCreateManyInput[] = [];
    const answersToCreate: Prisma.AnswerCreateManyInput[] = [];

    const courseId = uuidv4();
    let currentSectionOrder = 'a0';

    for (const sectionData of courseData.sections) {
      const sectionId = uuidv4();

      currentSectionOrder = generateKeyBetween(currentSectionOrder, null);
      const sectionOrder = currentSectionOrder;

      const lessonForThisSection: Prisma.LessonCreateManyInput[] = [];

      let currentLessonOrder = 'a0';

      for (const lessonData of sectionData.lessons) {
        const lessonId = uuidv4();
        const lectureId = uuidv4();

        lecturesToCreate.push({
          id: lectureId,
          lesson_id: lessonId,
          data: lessonData.lecture,
        });

        let currentQuestionOrder = 'a0';
        const questionsForThisSection: Prisma.QuestionCreateManyInput[] = [];

        for (const questionData of lessonData.quiz) {
          const questionId = uuidv4();

          currentQuestionOrder = generateKeyBetween(currentQuestionOrder, null);
          const questionOrder = currentQuestionOrder;

          const answersForThisQuestion: Prisma.AnswerCreateManyInput[] = [];
          let trustAnswerId: string | undefined;

          let currentAnswerOrder = 'a0';

          for (const answerData of questionData.answers) {
            const answerId = uuidv4();

            answersForThisQuestion.push({
              id: answerId,
              question_id: questionId,
              data: answerData.answer,
              order: currentAnswerOrder,
            });

            if (answerData.correct) {
              trustAnswerId = answerId;
            }

            currentAnswerOrder = generateKeyBetween(currentAnswerOrder, null);
          }

          questionsForThisSection.push({
            id: questionId,
            lesson_id: lessonId,
            title: questionData.question,
            type_question: QuestionType.TEXT,
            type_answer: questionData.type,
            order: questionOrder,
            trust_answer_id: trustAnswerId,
          });

          answersToCreate.push(...answersForThisQuestion);
          currentQuestionOrder = generateKeyBetween(currentQuestionOrder, null);
        }

        lessonForThisSection.push({
          id: lessonId,
          title: lessonData.title,
          description: lessonData.description,
          order: currentLessonOrder,
          section_id: sectionId,
        });

        questionsToCreate.push(...questionsForThisSection);
        currentLessonOrder = generateKeyBetween(currentLessonOrder, null);
      }

      sectionsToCreate.push({
        id: sectionId,
        title: sectionData.title,
        description: sectionData.description,
        order: sectionOrder,
        course_id: courseId,
      });

      lessonsToCreate.push(...lessonForThisSection);
    }

    try {
      await prisma.$transaction([
        prisma.course.create({
          data: {
            id: courseId,
            title: courseData.title,
            description: courseData.description,
            owner_id: userId,
          },
        }),
        prisma.usertoCourse.create({
          data: {
            user_id: userId,
            course_id: courseId,
            role_user: 'OWNER',
          },
        }),
        prisma.section.createMany({ data: sectionsToCreate }),
        prisma.lesson.createMany({ data: lessonsToCreate }),
        prisma.lecture.createMany({ data: lecturesToCreate }),
        prisma.question.createMany({ data: questionsToCreate }),
        prisma.answer.createMany({ data: answersToCreate }),
      ]);
    } catch (e) {
      Logger.error(e.message);
      throw new ConflictException(e.message);
    }

    return { success: true } as CourseTrueResponse;
  }

  async generateFakeAnswer(questionId: string, numberWrongAnswers = 3) {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        title: true,
        description: true,
        trust_answer_id: true,
        Lesson: {
          select: {
            Lecture: {
              select: {
                data: true,
              },
            },
          },
        },
      },
    });

    if (!question) {
      throw new ConflictException('Question not found');
    }

    const existingAnswers = await prisma.answer.findMany({
      where: { question_id: questionId },
      select: { data: true, id: true, order: true },
      orderBy: { order: 'asc' },
    });

    const correctAnswer = existingAnswers.find(
      (a) => a.id === question.trust_answer_id,
    )?.data;
    const incorrectAnswers = existingAnswers
      .filter((a) => a.id !== question.trust_answer_id)
      .map((a) => a.data);

    const context = `
    Question: ${question.title}
    ${question.description ? `Description: ${question.description}` : ''}
    Lesson Content: ${question.Lesson.Lecture.map((l) => l.data).join('\n')}
    Correct Answer if available: ${correctAnswer || 'Not available'}
    Existing Incorrect Answers if available: ${
      incorrectAnswers.join(', ') || 'Not available'
    }
  `;

    const prompt = `
    Generate ${numberWrongAnswers} plausible but incorrect answer choices for the multiple-choice question above.
    These should be distinct from the correct answer and existing incorrect answers.
    Make sure the fake answers are relevant to the context of the question and lesson.
  `;

    const req: GenerateContentRequest = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt + context }],
        },
      ],
      systemInstruction: {
        role: 'model',
        parts: [
          {
            text: `You are an AI assistant designed to generate plausible but incorrect answer choices for multiple-choice questions. 

          You will be given:
          - The question itself
          - A description of the question (if available)
          - Relevant lesson content
          - The correct answer
          - Any existing incorrect answers

          Your task is to:
          - Generate a specified number of new incorrect answer choices
          - Ensure these are distinct from the correct answer and existing incorrect options
          - Make sure the fake answers are relevant to the question and lesson context
          - Present the answers in a JSON array format:
            \`\`\`json
            [
              "incorrect answer 1",
              "incorrect answer 2",
              ...
            ]
            \`\`\` `,
          },
        ],
      },
    };

    let response;
    try {
      response = await AiService.generativeModel.generateContent(req);
    } catch (e) {
      Logger.error(e);
      throw new ConflictException('Failed to generate fake answers');
    }

    const data = JSON.parse(
      response.response.candidates[0].content.parts[0].text,
    );

    if (data.error) {
      throw new ConflictException(data);
    }

    const answersToCreate: Prisma.AnswerCreateManyInput[] = [];

    let lastAnswerOrder =
      existingAnswers[existingAnswers.length - 1]?.order || null;

    for (const answer of data) {
      lastAnswerOrder = generateKeyBetween(lastAnswerOrder, null);

      answersToCreate.push({
        id: uuidv4(),
        question_id: questionId,
        data: answer,
        order: lastAnswerOrder,
      });
    }

    try {
      await prisma.answer.createMany({ data: answersToCreate });
    } catch (e) {
      Logger.error('Failed to create fake answers !');
      throw new ConflictException('Failed to create fake answers');
    }

    return { success: true };
  }
}
