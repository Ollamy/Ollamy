/*
  Warnings:

  - You are about to drop the column `last_lesson_id` on the `UsertoCourse` table. All the data in the column will be lost.
  - You are about to drop the column `last_section_id` on the `UsertoCourse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsertoCourse" DROP CONSTRAINT "UsertoCourse_last_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "UsertoCourse" DROP CONSTRAINT "UsertoCourse_last_section_id_fkey";

-- AlterTable
ALTER TABLE "UsertoCourse" DROP COLUMN "last_lesson_id",
DROP COLUMN "last_section_id";
