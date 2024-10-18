/*
  Warnings:

  - You are about to drop the column `point` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `chapter_id` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `permission_chapter` on the `UsertoCourse` table. All the data in the column will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `section_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'MASTER');

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_section_id_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_chapter_id_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "point",
DROP COLUMN "value",
ADD COLUMN     "data" TEXT,
ADD COLUMN     "picture_id" UUID;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "chapter_id",
ADD COLUMN     "section_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "data",
ADD COLUMN     "difficulty" "QuestionDifficulty",
ADD COLUMN     "picture_id" UUID,
ADD COLUMN     "points" INTEGER;

-- AlterTable
ALTER TABLE "UsertoCourse" DROP COLUMN "permission_chapter";

-- DropTable
DROP TABLE "Chapter";

-- DropEnum
DROP TYPE "PermissionChapter";

-- CreateTable
CREATE TABLE "UsertoLesson" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "points" INTEGER,
    "complete_lecture" BOOLEAN NOT NULL DEFAULT false,
    "complete_question" BOOLEAN NOT NULL DEFAULT false,
    "status" "LessonStatus" NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "UsertoLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsertoLesson_lesson_id_user_id_key" ON "UsertoLesson"("lesson_id", "user_id");

-- AddForeignKey
ALTER TABLE "UsertoLesson" ADD CONSTRAINT "UsertoLesson_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoLesson" ADD CONSTRAINT "UsertoLesson_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
