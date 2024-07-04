import {
  ConflictException,
  Injectable, Logger,
} from '@nestjs/common';
import {
  GenerateContentRequest,
  GenerativeModelPreview,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI
} from '@google-cloud/vertexai'
import { FileAi, Question } from './ai.dto';
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
    AiService.vertexAi = new VertexAI({ project: 'ultimate-opus-422723-q5', location: 'us-central1' });
    AiService.model = 'gemini-experimental';
    AiService.generativeModel = AiService.vertexAi.preview.getGenerativeModel({
      model: AiService.model,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1,
        topP: 0.95,
        responseMimeType: 'application/json'
      } as any,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE
        }
      ]
    });
  }


  async generateText(file: FileAi): Promise<Question[]> {
    const req: GenerateContentRequest = {
      contents: [
        {
          role: 'user', parts: [
            {
              text: 'Here is a PDF file I need you to generate multiple choice questions from. Please create 10 questions with four answer choices each. If there is an issue with the file or it is not suitable for question generation, please let me know.'
            },
            {
              inlineData: file
            }
          ]
        }
      ],
      systemInstruction: {
        role: 'model',
        parts: [{ text: 'You are an AI assistant designed to create multiple-choice questions from PDF files. You will receive a PDF file as input. Your task is to extract important information from the PDF and formulate relevant questions with answer choices. Make sure the questions are clear, concise, and cover the key points of the document. Provide four answer choices for each question, only one of which is correct. If the PDF is unreadable or does not contain enough information to generate questions, report an error to the user. Return your answer as a JSON string in the following format:  ```json { "question": "...", "answers": [ { "answer": "...", "correct": true }, { "answer": "...", "correct": false }, { "answer": "...", "correct": false }, { "answer": "...", "correct": false } ] }, ...} ```' }],
      }
    };

    const response = await AiService.generativeModel.generateContent(req);
    const data = response.response.candidates[0].content.parts[0].text;
    return JSON.parse(data) as Question[];
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
        type_answer: AnswerType.MULTIPLE_CHOICE,
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
}