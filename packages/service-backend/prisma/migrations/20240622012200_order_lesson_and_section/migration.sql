/*
  Warnings:

  - Added the required column `order` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "order" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "order" TEXT NOT NULL;
