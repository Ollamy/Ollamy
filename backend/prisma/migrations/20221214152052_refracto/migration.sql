/*
  Warnings:

  - A unique constraint covering the columns `[course_id,user_id]` on the table `UsertoCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsertoCourse_course_id_user_id_key" ON "UsertoCourse"("course_id", "user_id");
