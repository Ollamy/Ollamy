/*
  Warnings:

  - You are about to drop the column `last_lesson_status` on the `UsertoCourse` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_id` on the `UsertoCourse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_id,user_id,lessonId]` on the table `UsertoCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UsertoCourse" DROP CONSTRAINT "UsertoCourse_lesson_id_fkey";

-- DropIndex
DROP INDEX "UsertoCourse_course_id_user_id_lesson_id_key";

-- AlterTable
ALTER TABLE "UsertoCourse" DROP COLUMN "last_lesson_status",
DROP COLUMN "lesson_id",
ADD COLUMN     "lessonId" UUID;

-- CreateTable
CREATE TABLE "UsertoLesson" (
    "id" UUID NOT NULL,
    "lessonstatus" "LessonStatus" NOT NULL,
    "lessonId" UUID NOT NULL,
    "usertoCourseId" UUID,

    CONSTRAINT "UsertoLesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsertoCourse_course_id_user_id_lessonId_key" ON "UsertoCourse"("course_id", "user_id", "lessonId");

-- AddForeignKey
ALTER TABLE "UsertoLesson" ADD CONSTRAINT "UsertoLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoLesson" ADD CONSTRAINT "UsertoLesson_usertoCourseId_fkey" FOREIGN KEY ("usertoCourseId") REFERENCES "UsertoCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
