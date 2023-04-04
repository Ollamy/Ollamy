/*
  Warnings:

  - Added the required column `type_answer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnswerType" AS ENUM ('TEXT', 'QUIZ', 'OTHER');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'VIDEO', 'IMAGE', 'AUDIO', 'OTHER');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "trust_answer_id" UUID,
ADD COLUMN     "type_answer" "AnswerType" NOT NULL,
ADD COLUMN     "type_question" "QuestionType" NOT NULL,
ALTER COLUMN "data" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "point" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
