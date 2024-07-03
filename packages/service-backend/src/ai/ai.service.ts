import {
  Injectable,
} from '@nestjs/common';
import {
  GenerateContentRequest,
  GenerativeModelPreview,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI
} from '@google-cloud/vertexai'
import { CreateQuestionResponse, FileAi, QuestionResponse } from './ai.dto';
import prisma from 'client';
import { AnswerType, Prisma, QuestionType } from '@prisma/client';

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


  async generateText(file: FileAi): Promise<QuestionResponse> {
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
    return JSON.parse(data);
  }

  async createQuizz(questions: CreateQuestionResponse): Promise<Boolean> {
    questions.questionReponse.forEach(async (question) => {
      const { id } = await prisma.question.create({
        data: {
          title: question.question,
          type_question: QuestionType.TEXT,
          type_answer: AnswerType.MULTIPLE_CHOICE,
          lesson_id: questions.lessonId
        },
        select: {
          id: true
        }
      })

      const trustedAnswer = await prisma.answer.createManyAndReturn({
        data: question.answers.sort(
          (a, b) => Number(b.correct) - Number(a.correct)).map(answer => { return { data: answer.answer, question_id: id } }
        ) as unknown as Prisma.AnswerCreateManyInput[],
        select: {
          id: true
        }
      })[0];

      await prisma.question.update({
        where: {
          id: id
        },
        data: {
          trust_answer_id: trustedAnswer.id
        }
      });
    })
    return true
  }
}
