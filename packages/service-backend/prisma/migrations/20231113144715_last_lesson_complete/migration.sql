/*
  Warnings:

  - A unique constraint covering the columns `[course_id,user_id,lesson_id]` on the table `UsertoCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `last_lesson_status` to the `UsertoCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `UsertoCourse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- DropIndex
DROP INDEX "UsertoCourse_course_id_user_id_key";

-- AlterTable
ALTER TABLE "UsertoCourse" ADD COLUMN     "last_lesson_status" "LessonStatus" NOT NULL,
ADD COLUMN     "lesson_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UsertoCourse_course_id_user_id_lesson_id_key" ON "UsertoCourse"("course_id", "user_id", "lesson_id");

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
