/*
  Warnings:

  - The values [TEXT,QUIZ,OTHER] on the enum `AnswerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnswerType_new" AS ENUM ('FREE_ANSWER', 'MULTIPLE_CHOICE', 'SQUARE_CHOICE');
ALTER TABLE "Question" ALTER COLUMN "type_answer" TYPE "AnswerType_new" USING ("type_answer"::text::"AnswerType_new");
ALTER TYPE "AnswerType" RENAME TO "AnswerType_old";
ALTER TYPE "AnswerType_new" RENAME TO "AnswerType";
DROP TYPE "AnswerType_old";
COMMIT;
