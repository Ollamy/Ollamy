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
  static generativeModelText: GenerativeModelPreview;

  constructor() {
    AiService.vertexAi = new VertexAI({
      project: 'ultimate-opus-422723-q5',
      location: 'us-central1',
    });
    AiService.model = 'gemini-1.5-flash-002';
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

    AiService.generativeModelText =
      AiService.vertexAi.preview.getGenerativeModel({
        model: AiService.model,
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 1,
          topP: 0.95,
          responseMimeType: 'text/plain',
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

  async convertMarkdownCourseToJSON(markdown: string): Promise<string> {
    const req: GenerateContentRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Here is a markdown content I need you to generate a course from.  If there is an issue with the content, it is not suitable for course generation, please return an error in the following JSON format: {"error": "Your error message here"}`,
            },
            {
              text: markdown,
            },
          ],
        },
      ],
      systemInstruction: {
        role: 'user',
        parts: [
          {
            text: `
You are an AI assistant that format structured online courses from markdown content.  You will receive a content of type markdown as input of the following type:

1. **Title:** A concise and descriptive title.
2. **Description:** A brief summary of the lesson's content.
3. **Lecture:**  Markdown formatted text derived from the input file.
4. **Quiz:** A short quiz to assess understanding.

**Quiz Question Formats:**  You can use the following question types, represented directly in the text output:

* **FREE_ANSWER:** Generate one correct answer.
  *Example:*
  FREE_ANSWER
  What is your favorite color?
  - BLUE

* **MULTIPLE_CHOICE:** Generate answers choices with one correct answer.
  *Example:*
  MULTIPLE_CHOICE
  What is the capital of France?
  - [ ] LONDON
  - [x] PARIS
  - [ ] BERLIN
  - [ ] MADRID
  - [ ] ROME
  - [ ] LISBON

* **SQUARE_CHOICE:** Generate four short answer choices with one correct answer.
  *Example:*
  SQUARE_CHOICE
  What is the capital of France?
  - [ ] LONDON
  - [ ] MADRID
  - [x] PARIS
  - [ ] BERLIN

* **ORDER_CHOICE:** Generate one sentence answer that needs to be ordered correctly. Words in the sentence should be separated by '/'. Only one answer is generated for this question type.
  *Example:*
  ORDER_CHOICE
  What is the color of the fox?
  - [x] The / color / of / the / fox / is / red!


The input content will be in the following format:


# Course title

Course description

## SECTION 1: Title

SECTION 1 description

### LESSON 1 of SECTION 1: Title

**DESCRIPTION:** Lesson 1 description

**LECTURE:** Lesson 1 lecture


**QUIZ 1 FOR LESSON 1:**

Question 1
MULTIPLE_CHOICE
What was the main problem identified with existing travel apps?
- [ ] Too many maps
- [x] Overwhelming information and lack of personalization
- [ ] Insufficient number of hotels listed
- [ ] Too many ads

Question 2
MULTIPLE_CHOICE
What was the core problem statement for the travel app?
- [ ] How might we create the best travel app?
- [x] How might we empower young travelers to discover unique, personalized experiences while simplifying the planning process?
- [ ] How might we make the most profitable travel app?
- [ ] How might we get more users for our app?


### LESSON 2 OF SECTION 1: Title

**DESCRIPTION:** Lesson 2 description

**LECTURE:** Lesson 2 lecture


**QUIZ 1 FOR LESSON 2:**

Question 1
MULTIPLE_CHOICE
What innovative approach was used in the travel app design?
- [ ] A simple list of attractions
- [x] A gamified app with personalized avatars and quests
- [ ] A social media-based approach
- [ ] A map-only application

Question 2
MULTIPLE_CHOICE
What tool was used to create the low-fidelity prototype?
- [ ] Adobe Photoshop
- [ ] Sketch
- [x] Figma
- [ ] GIMP


## SECTION 2: Title

Section 2 description

### LESSON 1 OF SECTION 2: Title

**DESCRIPTION:** Lesson 1 description

**LECTURE:** Lesson 1 lecture

**QUIZ 1 FOR LESSON 1:**

Question 1
MULTIPLE_CHOICE
What was the main problem identified with existing travel apps?
- [ ] Too many maps
- [x] Overwhelming information and lack of personalization
- [ ] Insufficient number of hotels listed
- [ ] Too many ads

Question 2
MULTIPLE_CHOICE
What was the core problem statement for the travel app?
- [ ] How might we create the best travel app?
- [x] How might we empower young travelers to discover unique, personalized experiences while simplifying the planning process?
- [ ] How might we make the most profitable travel app?
- [ ] How might we get more users for our app?


**Error Handling:**

If the markdown input is unreadable, empty, contains insufficient content to format a meaningful course, or if you encounter any issues generating the course structure or quiz questions, return a JSON object with an error message:  {"error": "Descriptive error message explaining the issue"}


**Successful Output:**

If successful, return the course content in a json format with the following structure. Use Markdown for formatting lecture content.  All text in the output, including titles, descriptions, lectures, and quiz questions, must be in the **same language** as the input document.
All the keywords in my formatting must be in English and in Upper case, NEVER translate them.
**Do not stop generating the course content prematurely. Always continue until the entire course is formatted, even if it exceeds the maximum token limit.**

Your task is to process this content and create a well-organized course in the **same language as the input content**.
While formatting the json, ensure to remove any formatting values like 'LESSON <number> OF SECTION <numner>:', 'SECTION <number>:'
The course should consist of sections, lessons within each section, lectures and quizzes within each lessons with answers.
The JSON object you will have to return should be the following format:
 {
    "title": "...",
    "description": "...",
    "sections": [
      {
        "title": "...",
        "description": "...",
        "lessons": [
          {
            "title": "...",
            "description": "...",
            "lecture": "Mardown content",
            "quiz": [
              {
                "type": "...",
                "question": "...",
                "answers": [
                  {"answer": "...", "correct": true|false},
                  // ... more answers
                ]
              },
              // ... more quiz questions
            ]
          },
          // ... more lessons
        ]
      },
      // ... more sections
    ]
  }

`,
          },
        ],
      },
    };

    let fullResponse = '';
    let continueGenerating = true;

    try {
      while (continueGenerating) {
        const response: GenerateContentResult =
          await AiService.generativeModelText.generateContent(req);
        const candidate = response.response.candidates[0];

        if (candidate.content.parts[0].text.startsWith('```text')) {
          candidate.content.parts[0].text =
            candidate.content.parts[0].text.slice(7);
        }
        if (candidate.content.parts[0].text.endsWith('```')) {
          candidate.content.parts[0].text =
            candidate.content.parts[0].text.slice(0, -3);
        }
        fullResponse += candidate.content.parts[0].text;

        if (candidate.finishReason === 'MAX_TOKENS') {
          req.contents.push({
            role: 'model',
            parts: [{ text: fullResponse }],
          });
          req.contents.push({
            role: 'user',
            parts: [
              {
                text: 'continue from here directly: ' + fullResponse.slice(-10),
              },
            ],
          });
        } else {
          continueGenerating = false;
        }
      }

      return fullResponse;
    } catch (e) {
      Logger.error(e);
      throw new ConflictException('Failed to generate course');
    }
  }

  async generateCourse(
    file: FileAi,
    numberOfQuestionsPerQuiz = 4,
  ): Promise<any> {
    const req: GenerateContentRequest = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Here is a ${
                AllowedMimeType[file.mimeType]
              } file I need you to generate a course from.  If there is an issue with the file, it is not suitable for course generation, please return an error in the following JSON format: {"error": "Your error message here"}`,
            },
            {
              inlineData: file,
            },
          ],
        },
      ],
      systemInstruction: {
        role: 'user',
        parts: [
          {
            text: `
You are an AI assistant that generates structured online courses from uploaded files.  You will receive a file of type ${
              AllowedMimeType[file.mimeType]
            } as input. Your task is to process this file and create a well-organized course in the **same language as the input file**. The course should consist of sections, lessons within each section, and each lesson will have:

1. **Title:** A concise and descriptive title.
2. **Description:** A brief summary of the lesson's content.
3. **Lecture:**  Markdown formatted text derived from the input file.
4. **Quiz:** A short quiz to assess understanding.

The number of sections, lessons, and quiz questions per lesson should be dynamically determined based on the content and length of the input file. Aim for around ${numberOfQuestionsPerQuiz} questions per quiz as a guideline, but adjust as needed based on the content.

**Quiz Question Formats:**  You can use the following question types, represented directly in the text output:

* **FREE_ANSWER:** Generate one correct answer.
  *Example:*
  FREE_ANSWER
  What is your favorite color?
  - BLUE

* **MULTIPLE_CHOICE:** Generate answers choices with one correct answer.
  *Example:*
  MULTIPLE_CHOICE
  What is the capital of France?
  - [ ] LONDON
  - [x] PARIS
  - [ ] BERLIN
  - [ ] MADRID
  - [ ] ROME
  - [ ] LISBON

* **SQUARE_CHOICE:** Generate four short answer choices with one correct answer.
  *Example:*
  SQUARE_CHOICE
  What is the capital of France?
  - [ ] LONDON
  - [ ] MADRID
  - [x] PARIS
  - [ ] BERLIN

* **ORDER_CHOICE:** Generate one sentence answer that needs to be ordered correctly. Words in the sentence should be separated by '/'. Only one answer is generated for this question type.
  *Example:*
  ORDER_CHOICE
  What is the color of the fox?
  - [x] The / color / of / the / fox / is / red!


Choose the most appropriate question type for each question. Ensure questions are clear, concise, and directly relevant to the lesson content. [x] marks the correct answer.

**Error Handling:**

If the input file is unreadable, empty, contains insufficient content to create a meaningful course, or if you encounter any issues generating the course structure or quiz questions, return a JSON object with an error message:  {"error": "Descriptive error message explaining the issue"}


**Successful Output:**

If successful, return the course content in a plain text format with the following structure. Use Markdown for formatting lecture content.  All text in the output, including titles, descriptions, lectures, and quiz questions, must be in the **same language** as the input document.
All the keywords in my formatting must be in English and in Upper case, NEVER translate them.
**Do not stop generating the course content prematurely. Always continue until the entire course is complete, even if it exceeds the maximum token limit.**

# Course title

Course description

## SECTION 1: Title

SECTION 1 description

### LESSON 1 of SECTION 1: Title

**DESCRIPTION:** Lesson 1 description

**LECTURE:** Lesson 1 lecture


**QUIZ 1 FOR LESSON 1:**

Question 1
MULTIPLE_CHOICE
What was the main problem identified with existing travel apps?
- [ ] Too many maps
- [x] Overwhelming information and lack of personalization
- [ ] Insufficient number of hotels listed
- [ ] Too many ads

Question 2
MULTIPLE_CHOICE
What was the core problem statement for the travel app?
- [ ] How might we create the best travel app?
- [x] How might we empower young travelers to discover unique, personalized experiences while simplifying the planning process?
- [ ] How might we make the most profitable travel app?
- [ ] How might we get more users for our app?


### LESSON 2 OF SECTION 1: Title

**DESCRIPTION:** Lesson 2 description

**LECTURE:** Lesson 2 lecture


**QUIZ 1 FOR LESSON 2:**

Question 1
MULTIPLE_CHOICE
What innovative approach was used in the travel app design?
- [ ] A simple list of attractions
- [x] A gamified app with personalized avatars and quests
- [ ] A social media-based approach
- [ ] A map-only application

Question 2
MULTIPLE_CHOICE
What tool was used to create the low-fidelity prototype?
- [ ] Adobe Photoshop
- [ ] Sketch
- [x] Figma
- [ ] GIMP


## SECTION 2: Title

Section 2 description

### LESSON 1 OF SECTION 2: Title

**DESCRIPTION:** Lesson 1 description

**LECTURE:** Lesson 1 lecture

**QUIZ 1 FOR LESSON 1:**

Question 1
MULTIPLE_CHOICE
What was the main problem identified with existing travel apps?
- [ ] Too many maps
- [x] Overwhelming information and lack of personalization
- [ ] Insufficient number of hotels listed
- [ ] Too many ads

Question 2
MULTIPLE_CHOICE
What was the core problem statement for the travel app?
- [ ] How might we create the best travel app?
- [x] How might we empower young travelers to discover unique, personalized experiences while simplifying the planning process?
- [ ] How might we make the most profitable travel app?
- [ ] How might we get more users for our app?
`,
          },
        ],
      },
    };

    let fullResponse = '';
    let continueGenerating = true;

    try {
      while (continueGenerating) {
        const response: GenerateContentResult =
          await AiService.generativeModelText.generateContent(req);
        const candidate = response.response.candidates[0];

        if (candidate.content.parts[0].text.startsWith('```text')) {
          candidate.content.parts[0].text =
            candidate.content.parts[0].text.slice(7);
        }
        if (candidate.content.parts[0].text.endsWith('```')) {
          candidate.content.parts[0].text =
            candidate.content.parts[0].text.slice(0, -3);
        }
        fullResponse += candidate.content.parts[0].text;

        if (candidate.finishReason === 'MAX_TOKENS') {
          req.contents.push({
            role: 'model',
            parts: [{ text: fullResponse }],
          });
          req.contents.push({
            role: 'user',
            parts: [
              {
                text: 'continue from here directly: ' + fullResponse.slice(-10),
              },
            ],
          });
        } else {
          continueGenerating = false;
        }
      }

      return this.convertMarkdownCourseToJSON(fullResponse);
    } catch (e) {
      Logger.error(e);
      throw new ConflictException('Failed to generate course');
    }
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
