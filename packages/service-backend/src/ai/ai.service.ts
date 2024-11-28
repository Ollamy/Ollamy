import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  GenerateContentRequest,
  GenerateContentResult,
  GenerativeModelPreview,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai';
import {
  AllowedMimeType,
  FileAi,
  Question,
  ParsedAnswer,
  ParsedCourse,
  ParsedLesson,
  ParsedQuizQuestion,
  ParsedSection,
} from './ai.dto';
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

  parseCourse(markdown: string): ParsedCourse {
    const course: ParsedCourse = { title: '', description: '', sections: [] };

    const sectionRegex =
      /## SECTION \d+:\s*(.+)\n+([\s\S]*?)(?=(?:## SECTION \d+:|$))/g;
    const lessonRegex =
      /### LESSON \d+ OF SECTION \d+:\s*(.+)\n+\*\*DESCRIPTION:\*\*\s*(.+)\n+\*\*LECTURE:\*\*\s*([\s\S]*?)\*\*QUIZ \d+ FOR LESSON \d+:\*\*([\s\S]*?)(?=(?:### LESSON \d+ OF SECTION \d+:|$))/g;

    const questionRegex =
      /QUESTION|Question \d+\n+([A-Z_]+)\n+([\s\S]+?)(?=\n-\[|\nQUESTION|\nQuestion|\n*$)/g;
    const answerRegex = /-\s*\[([ x])\]\s*(.+)/g;
    const freeAnswerRegex = /-\s*(.+)/g;
    const orderChoiceRegex = /-\s*\[([ x])\]\s*(.+)/g;

    // Add null checks and default values
    const titleMatch = markdown.match(/^# (.+)\n/);
    course.title = titleMatch ? titleMatch[1] : 'Untitled Course';

    const descriptionMatch = markdown.match(/^#[^\n]+\n+(.+)\n+(?=##)/s);
    course.description = descriptionMatch
      ? descriptionMatch[1].trim().replace(/\n.*/s, '')
      : 'No description provided';

    let sectionMatch;
    while ((sectionMatch = sectionRegex.exec(markdown)) !== null) {
      const section: ParsedSection = {
        title: sectionMatch[1],
        description: sectionMatch[2].trim().replace(/\n.*/s, ''),
        lessons: [],
      };

      let lessonMatch;
      while ((lessonMatch = lessonRegex.exec(sectionMatch[0])) !== null) {
        const lesson: ParsedLesson = {
          title: lessonMatch[1],
          description: lessonMatch[2],
          lecture: lessonMatch[3].trim(),
          quiz: [],
        };

        let questionMatch;
        while ((questionMatch = questionRegex.exec(lessonMatch[4])) !== null) {
          const question: ParsedQuizQuestion = {
            type: questionMatch[1],
            question: questionMatch[2].trim().replace(/\n.*/s, ''),
            answers: [],
          };

          let answerMatch;
          switch (question.type) {
            case 'FREE_ANSWER':
              while (
                (answerMatch = freeAnswerRegex.exec(questionMatch[2])) !== null
              ) {
                question.answers.push({
                  answer: answerMatch[1].trim(),
                  correct: true,
                });
              }
              break;
            case 'ORDER_CHOICE':
              while (
                (answerMatch = orderChoiceRegex.exec(questionMatch[2])) !== null
              ) {
                question.answers.push({
                  answer: answerMatch[2].trim(),
                  correct: answerMatch[1] === 'x',
                });
              }
              break;
            default: // Covers MULTIPLE_CHOICE and SQUARE_CHOICE
              while (
                (answerMatch = answerRegex.exec(questionMatch[2])) !== null
              ) {
                question.answers.push({
                  answer: answerMatch[2].trim(),
                  correct: answerMatch[1] === 'x',
                });
              }
              break;
          }

          lesson.quiz.push(question);
        }

        section.lessons.push(lesson);
      }

      course.sections.push(section);
    }

    return course;
  }

  async generateCourse(
    file: FileAi,
    numberOfQuestionsPerQuiz = 4,
  ): Promise<any> {
    Logger.debug(`Generating course from file ${file.mimeType}`);
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

      Logger.log('fullResponse', fullResponse);
      return JSON.stringify(this.parseCourse(fullResponse), null, 2);
    } catch (e) {
      Logger.error(e);
      throw new ConflictException('Failed to generate course');
    }
  }

  async parseMarkdown(markdown: string): Promise<string> {
    return JSON.stringify(this.parseCourse(markdown));
  }

  async markdownTest() {
    Logger.log(TMARKDOWN);
    return await this.parseMarkdown(TMARKDOWN);
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

const TMARKDOWN = `
# Initiation au jeu d'échecs (CREB)

Ce cours d'échecs, créé par le Cercle Royal des Echecs de Bruxelles (CREB), vous guidera à travers les bases du jeu, de la théorie des ouvertures aux stratégies avancées.  Ce manuel complet est conçu pour les joueurs de tous niveaux, des débutants aux joueurs expérimentés.


## SECTION 1: Généralités

Cette section introduit les concepts fondamentaux du jeu d'échecs, notamment l'échiquier, les pièces, leur valeur et leurs mouvements de base.

### LESSON 1 of SECTION 1: L'échiquier et les pièces

**DESCRIPTION:**  Présentation de l'échiquier, identification des pièces, et description de leur placement initial.

**LECTURE:**

Par ce terme, nous désignons un plateau carré divisé en soixante-quatre cases égales, alternativement blanches et noires, et placé de façon que chaque joueur ait une case angulaire noire à sa gauche.

Les pièces comprennent les figures et les pions. Chaque camp dispose de huit pions et de huit figures. Les pions sont tous pareils. Les figures de chaque camp sont : le roi, la dame (aussi appelée reine), deux fous, deux cavaliers (que l'on nomme aussi chevaux) et deux tours.

Précisons : il ne peut y avoir qu'une seule pièce par case.


**QUIZ 1 FOR LESSON 1:**

Question 1
SQUARE_CHOICE
Combien de cases composent un échiquier ?
- [ ] 36
- [ ] 100
- [x] 64
- [ ] 144

Question 2
MULTIPLE_CHOICE
Quelle pièce est la plus puissante ?
- [ ] Le fou
- [ ] La tour
- [ ] Le cavalier
- [x] La dame


Question 3
MULTIPLE_CHOICE
Combien de pions possède chaque joueur au début de la partie ?
- [ ] 6
- [ ] 10
- [ ] 12
- [x] 8

Question 4
FREE_ANSWER
Quelles sont les deux pièces lourdes ?
- Tours/Dame


### LESSON 2 OF SECTION 1: La valeur et le mouvement des pièces

**DESCRIPTION:**  Détermination de la valeur relative des pièces et description de leurs mouvements.

**LECTURE:**

Voici une estimation de la valeur des pièces : la dame = 10 pions, la tour = 5 pions, le fou = 3,25 pions, le cavalier = 3 pions.

La dame est une pièce à longue portée, capable de se mouvoir en ligne droite, verticalement, horizontalement, et en diagonale, sur un nombre quelconque de cases inoccupées. Le roi peut se déplacer d'une case dans toutes les directions (horizontalement, verticalement, ou en diagonale), mais il ne peut aller sur une case où il serait menacé par une pièce ennemie. La tour peut se déplacer horizontalement ou verticalement.  Le fou se déplace en diagonale. Le cavalier se déplace en "L". Le pion ne peut avancer que d'une case, sauf son premier mouvement où il peut avancer de deux.


**QUIZ 1 FOR LESSON 2:**

Question 1
MULTIPLE_CHOICE
Quelle pièce peut se déplacer en "L" ?
- [ ] Le fou
- [ ] La tour
- [x] Le cavalier
- [ ] La reine

Question 2
SQUARE_CHOICE
Combien de cases peut déplacer la dame au maximum en une seule fois?
- [ ] 2
- [ ] 4
- [ ] 7
- [x]  Illimité

Question 3
MULTIPLE_CHOICE
Quelle est la valeur approximative d'un fou en pions ?
- [ ] 1
- [ ] 2
- [x] 3
- [ ] 5

Question 4
ORDER_CHOICE
Quel est le mouvement du pion?
- [x] Le / pion / avance / d'une / case!


## SECTION 2: Règles et notions de base

Cette section détaille les règles du jeu, notamment la notation algébrique, le roque, la prise en passant, le mat et le pat.

### LESSON 1 of SECTION 2: Notation Algébrique et Roque

**DESCRIPTION:**  Explication de la notation algébrique et des règles du roque.

**LECTURE:**

Pour indiquer les déplacements des pièces, les joueurs d'échecs utilisent une notation algébrique. Les lignes verticales (colonnes) sont désignées de gauche à droite par les lettres : a, b, c, d, e, f, g et h. Les lignes horizontales (rangées) sont désignées de bas en haut par les chiffres : 1, 2, 3, 4, 5, 6, 7 et 8.  Une case est désignée par la lettre de la colonne suivie du chiffre de la rangée.  Le roque est un mouvement spécial qui permet au roi et à une tour de changer de place en même temps.


**QUIZ 1 FOR LESSON 1:**

Question 1
MULTIPLE_CHOICE
Comment est désignée la case en bas à gauche de l'échiquier ?
- [ ] a8
- [ ] h1
- [x] a1
- [ ] h8

Question 2
FREE_ANSWER
Que signifie "0-0" dans la notation algébrique ?
- Petit Roque

Question 3
MULTIPLE_CHOICE
Quelles conditions doivent être réunies pour effectuer le roque ?
- [ ] Le roi et la tour n'ont pas bougé
- [ ] Le roi n'est pas en échec
- [ ] Le roi ne traverse pas de case attaquée.
- [x] Toutes les conditions ci-dessus


Question 4
FREE_ANSWER
Quel est le nombre maximum de cases que le roi peut parcourir en une seule fois lors d'un roque?
- 2


### LESSON 2 OF SECTION 2: Prise en Passant, Mat et Pat

**DESCRIPTION:**  Explication de la prise en passant, du mat, et du pat.

**LECTURE:**

La prise en passant est un mouvement particulier qui permet de capturer un pion adverse dans certaines conditions. Le mat survient lorsque le roi est attaqué et ne peut se déplacer sur aucune case sans être menacé. Le pat est une situation où le joueur dont c'est le tour ne possède aucun coup légal mais que son roi n'est pas en échec.

**QUIZ 1 FOR LESSON 2:**

Question 1
MULTIPLE_CHOICE
Quand un mat est-il déclaré ?
- [ ] Lorsqu'un joueur n'a plus de coups légaux.
- [x] Lorsque le roi est en échec et qu'il n'a aucun mouvement légal pour se sortir de l'échec.
- [ ] Lorsqu'un joueur a perdu toutes ses pièces.
- [ ] Lorsqu'un joueur abandonne la partie.

Question 2
FREE_ANSWER
Définir la prise en passant.
- Capturé un pion adverse qui vient de faire un double pas sur une case adjacente.

Question 3
MULTIPLE_CHOICE
Quel est le résultat d'une partie qui se termine par un pat ?
- [ ] La victoire des Blancs
- [ ] La victoire des Noirs
- [x] Une partie nulle
- [ ] La partie est reportée.

Question 4
FREE_ANSWER
Définir le zugzwang.
- Situation où le joueur dont c'est le tour est forcé de faire un coup qui lui est défavorable, car ne pas jouer serait encore pire.



## SECTION 3: Notions tactiques et stratégiques

Cette section explore des concepts tactiques et stratégiques plus avancés, tels que le clouage, l'enfilade, la fourchette, les sacrifices, et le contrôle du centre.


**(Continue the course structure in this manner for all remaining sections, lessons, and quizzes.)**
`;

const MARKDOWN = `# Initiation au jeu d'échecs (CREB)

Ce cours est une introduction au jeu d'échecs, basé sur le cahier du Cercle Royal des Echecs de Bruxelles. Il couvrira les règles du jeu, les notions de base, les tactiques, les stratégies, et quelques notions d'informatique liées au jeu d'échecs.


## SECTION 1: Les bases du jeu d'échecs

Cette section introduit les règles de base du jeu d'échecs, y compris la mise en place des pièces, les mouvements de chaque pièce, et les concepts de base comme l'échec et le mat.


### LESSON 1 of SECTION 1: L'échiquier et les pièces

**DESCRIPTION:** Cette leçon décrit l'échiquier et les différentes pièces du jeu d'échecs, ainsi que leur valeur relative.

**LECTURE:**

L'échiquier est un plateau carré divisé en 64 cases égales, alternativement blanches et noires. Les pièces sont composées des figures (roi, dame, tours, fous, cavaliers) et les pions. Chaque camp dispose de 8 pions et de 8 figures.  La valeur relative des pièces est la suivante : la dame vaut 10 pions, la tour 5 pions, le fou 3,25 pions et le cavalier 3 pions.


**QUIZ 1 FOR LESSON 1:**

QUESTION 1
MULTIPLE_CHOICE
Combien de cases y a-t-il sur un échiquier ?
- [ ] 60
- [ ] 100
- [x] 64
- [ ] 128

QUESTION 2
MULTIPLE_CHOICE
Quelle est la pièce la plus puissante du jeu d'échecs ?
- [ ] Tour
- [ ] Fou
- [ ] Cavalier
- [x] Dame

QUESTION 3
FREE_ANSWER
Combien de pions possède chaque joueur au début de la partie ?
- 8

QUESTION 4
MULTIPLE_CHOICE
Quelle est la valeur approximative d'un fou en pions ?
- [ ] 2 pions
- [ ] 4 pions
- [x] 3,25 pions
- [ ] 5 pions



### LESSON 2 OF SECTION 1: Les mouvements des pièces

**DESCRIPTION:** Cette leçon détaille les mouvements spécifiques de chaque type de pièce sur l'échiquier.

**LECTURE:**

Chaque pièce se déplace d'une manière différente.  Le roi se déplace d'une case dans toutes les directions (horizontalement, verticalement, ou en diagonale), mais ne peut pas aller sur une case où il serait menacé. La dame se déplace en ligne droite, verticalement, horizontalement, et en diagonale, sur un nombre quelconque de cases inoccupées. La tour se déplace horizontalement ou verticalement. Le fou se déplace en diagonale, le cavalier en "L" (deux cases dans une direction, puis une case perpendiculairement), et le pion avance d'une case (ou de deux cases au premier coup).

**QUIZ 1 FOR LESSON 2:**

QUESTION 1
MULTIPLE_CHOICE
Comment se déplace le cavalier ?
- [ ] En ligne droite
- [ ] En diagonale
- [x] En "L"
- [ ] De deux cases dans n'importe quelle direction

QUESTION 2
MULTIPLE_CHOICE
Combien de cases peut parcourir au maximum un fou en un seul mouvement ?
- [ ] 1
- [ ] 2
- [ ] 7
- [x] Il n'y a pas de limite

QUESTION 3
MULTIPLE_CHOICE
Comment se déplace le pion au premier mouvement ?
- [ ] D'une case en diagonale
- [ ] D'une ou deux cases en diagonale
- [ ] D'une case horizontalement ou verticalement
- [x] D'une ou deux cases vers l'avant

QUESTION 4
ORDER_CHOICE
Décrivez le mouvement du roi.
- [x] Le / roi / se / déplace / d'une / case / dans / toutes / les / directions.


## SECTION 2: Notions de base

Cette section aborde les notions de base du jeu d'échecs, telles que l'ouverture, le milieu de partie, la finale, et les différentes façons dont une partie peut se terminer.


### LESSON 1 OF SECTION 2:  Les phases d'une partie

**DESCRIPTION:**  Cette leçon explique les trois phases principales d'une partie d'échecs : l'ouverture, le milieu de partie et la finale.

**LECTURE:**

Une partie d'échecs se divise en trois phases : l'ouverture, le milieu de partie et la finale. L'ouverture est la phase de développement des pièces. Le milieu de partie est la phase de combat et de tactique, où les joueurs cherchent à gagner un avantage matériel ou positionnel. La finale est la phase où le jeu devient plus technique, et où le roi joue souvent un rôle actif.  Une partie peut se terminer par une victoire (mat) pour les Blancs (1-0), pour les Noirs (0-1), ou par une nulle (½-½).

**QUIZ 1 FOR LESSON 1:**

QUESTION 1
MULTIPLE_CHOICE
Quelle est la phase de la partie où les joueurs développent leurs pièces ?
- [ ] Milieu de partie
- [x] Ouverture
- [ ] Finale

QUESTION 2
MULTIPLE_CHOICE
Quelle est la phase de la partie où le jeu devient très technique et où le roi joue souvent un rôle actif ?
- [ ] Ouverture
- [ ] Milieu de partie
- [x] Finale

QUESTION 3
MULTIPLE_CHOICE
Comment se note une victoire des Blancs?
- [ ] 0-1
- [ ] ½-½
- [x] 1-0

QUESTION 4
MULTIPLE_CHOICE
Comment se note une partie nulle ?
- [ ] 1-0
- [ ] 0-1
- [x] ½-½


### LESSON 2 OF SECTION 2:  Les différents résultats d'une partie

**DESCRIPTION:** Cette leçon détaille les différentes manières dont une partie d'échecs peut se terminer : victoire, défaite ou nulle.  Elle explique également les différentes raisons pour lesquelles une partie peut être déclarée nulle.

**LECTURE:**

Une partie d'échecs se termine par un mat (victoire), un pat (nulle), une répétition de position trois fois, 50 coups sans prise de pièce ni déplacement de pion, ou un accord mutuel.

**QUIZ 1 FOR LESSON 2:**

QUESTION 1
MULTIPLE_CHOICE
Que se passe-t-il lorsqu'un joueur donne un échec perpétuel ?
- [ ] La partie est gagnée pour le joueur qui donne l'échec.
- [ ] La partie est gagnée pour l'autre joueur.
- [x] La partie est nulle.


QUESTION 2
MULTIPLE_CHOICE
Que se passe-t-il si la même position se répète trois fois ?
- [ ] La partie est gagnée pour le joueur qui a la même position.
- [ ] La partie est gagnée pour l'autre joueur.
- [x] La partie est nulle.

QUESTION 3
MULTIPLE_CHOICE
Combien de coups maximum peuvent être joués sans que ni un pion ne soit déplacé, ni une pièce ne soit prise, avant que la partie ne soit déclarée nulle ?
- [ ] 25
- [ ] 75
- [x] 50

QUESTION 4
MULTIPLE_CHOICE
Une partie peut-elle se terminer par accord mutuel des deux joueurs ?
- [x] Oui
- [ ] Non



## SECTION 3:  Tactique et stratégie de base

Cette section explore les aspects tactiques et stratégiques de base du jeu d'échecs, en se concentrant sur des concepts importants tels que la coordination, le clouage, la fourchette, et l'enfilade.


### LESSON 1 OF SECTION 3: Notions tactiques de base

**DESCRIPTION:** Introduction aux notions tactiques fondamentales: coordination, clouage, fourchette et enfilade.

**LECTURE:**

La coordination est essentielle au jeu d'échecs.  Le clouage immobilise une pièce en la protégeant d'une autre pièce. La fourchette attaque simultanément deux pièces avec une seule pièce. L'enfilade est un type de combinaison tactique où une pièce est attaquée après qu'une autre pièce a donné échec.

**QUIZ 1 FOR LESSON 1:**

QUESTION 1
MULTIPLE_CHOICE
Qu'est-ce que la coordination en échecs ?
- [ ] Le fait de déplacer toutes les pièces simultanément.
- [ ] Le fait de déplacer des pièces au hasard.
- [x] L'arrangement des pièces afin de se soutenir mutuellement.

QUESTION 2
MULTIPLE_CHOICE
Qu'est-ce qu'une fourchette ?
- [ ] Une attaque qui immobilise une pièce.
- [x] Une attaque qui menace simultanément deux pièces.
- [ ] Une attaque qui nécessite l'intervention du roi.

QUESTION 3
MULTIPLE_CHOICE
Qu'est-ce qu'un clouage ?
- [ ] Une attaque qui capture une pièce.
- [ ] Une attaque qui ne menace aucune pièce.
- [x] Une attaque qui immobilise une pièce en protégeant une autre pièce.

QUESTION 4
MULTIPLE_CHOICE
Qu'est-ce que l'enfilade ?
- [ ] Une attaque qui utilise uniquement des pions.
- [x] Une combinaison tactique où une pièce est attaquée après qu'une autre pièce a donné échec.
- [ ] Une attaque sur le roi uniquement.



### LESSON 2 OF SECTION 3:  Stratégie et planification

**DESCRIPTION:** Cette leçon explore les principes stratégiques du jeu d'échecs, y compris le contrôle du centre, le développement des pièces, et la construction d'un plan de jeu.

**LECTURE:**

La stratégie implique de planifier à long terme, de contrôler le centre, de développer les pièces de manière harmonieuse et efficace et d'établir un plan qui vous mènera à la victoire.  L'importance de contrôler le centre ne doit pas être sous-estimée, car il offre de nombreuses cases de mobilité aux pièces.

**QUIZ 1 FOR LESSON 2:**

QUESTION 1
FREE_ANSWER
Quelle est l'importance de contrôler le centre en échecs ?
- Contrôler le centre permet d'avoir plus de mobilité pour les pièces.

QUESTION 2
MULTIPLE_CHOICE
Quel est l'un des objectifs principaux de la phase d'ouverture d'une partie d'échecs ?
- [ ] Donner un mat rapidement.
- [ ] Capturer le maximum de pièces.
- [ ] Jouer le plus de coups possible.
- [x] Développer ses pièces de façon harmonieuse et efficace.


QUESTION 3
FREE_ANSWER
En quoi consiste une stratégie gagnante en échecs ?
- Une stratégie gagnante en échecs consiste à planifier une série de coups qui mènent à un avantage décisif et à la victoire.

QUESTION 4
MULTIPLE_CHOICE
Quel est le rôle du roi en fin de partie ?
- [ ] Il n'a aucun rôle.
- [ ] Il doit rester protégé.
- [ ] Il doit être constamment en échec.
- [x] Il joue un rôle actif et peut être utilisé pour attaquer.



## SECTION 4:  Informatique et jeu d'échecs

Cette section explore comment l'informatique peut être utilisée pour améliorer le jeu d'échecs, avec une introduction aux bases de données d'échecs, aux programmes d'échecs et aux logiciels d'analyse.


### LESSON 1 OF SECTION 4: Bases de données et programmes d'échecs

**DESCRIPTION:** Cette leçon présente les bases de données d'échecs (ChessBase, ChessAssistant, etc.) et les programmes d'échecs (Houdini, Rybka, etc.), ainsi que leur utilisation.

**LECTURE:**

Les bases de données d'échecs, telles que ChessBase et ChessAssistant, contiennent des millions de parties jouées, permettant aux joueurs d'étudier l'ouverture, le milieu de partie et la fin de partie.  Les programmes d'échecs, tels que Houdini et Rybka, peuvent être utilisés pour analyser des parties, identifier des erreurs, et proposer des améliorations.

**QUIZ 1 FOR LESSON 1:**

QUESTION 1
MULTIPLE_CHOICE
Quelle est l'une des principales bases de données d'échecs ?
- [ ] Arena
- [ ] Stockfish
- [x] ChessBase
- [ ] Pairtwo

QUESTION 2
MULTIPLE_CHOICE
Quel est l'un des programmes d'échecs les plus performants ?
- [ ] Fritz
- [ ] Junior
- [x] Houdini
- [ ] Crafty

QUESTION 3
FREE_ANSWER
Nommez une autre base de données d'échecs importante.
- ChessAssistant

QUESTION 4
MULTIPLE_CHOICE
A quoi servent les programmes d'échecs ?
- [ ] A jouer aléatoirement des parties.
- [ ] A générer de nouvelles ouvertures.
- [x] A analyser les parties et à proposer des améliorations.


### LESSON 2 OF SECTION 4: Logiciels d'analyse et interfaces graphiques

**DESCRIPTION:** Cette leçon explique l'utilisation des logiciels d'analyse d'échecs et des interfaces graphiques comme Arena.

**LECTURE:**

Les logiciels d'analyse d'échecs permettent aux joueurs d'étudier des parties, d'identifier les erreurs, et de proposer des stratégies améliorées.  Des interfaces graphiques, telles qu'Arena, facilitent l'analyse et rendent l'expérience plus conviviale.

**QUIZ 1 FOR LESSON 2:**

QUESTION 1
FREE_ANSWER
Nommez un logiciel d'analyse d'échecs populaire.
- Fritz

QUESTION 2
MULTIPLE_CHOICE
Quelle est la fonction principale d'un logiciel d'analyse d'échecs ?
- [ ] Jouer des parties contre d'autres joueurs.
- [ ] Créer de nouvelles ouvertures.
- [x] Analyser des parties d'échecs.
- [ ] Organiser des tournois d'échecs.

QUESTION 3
FREE_ANSWER
Nommez une interface graphique populaire pour les programmes d'échecs.
- Arena

QUESTION 4
MULTIPLE_CHOICE
Quel est l'avantage principal de l'utilisation d'une interface graphique pour l'analyse d'échecs ?
- [ ] Il n'y a pas d'avantage.
- [ ] Elle rend l'analyse plus difficile.
- [x] Elle rend l'analyse plus conviviale et intuitive.

`;
