/*
  Warnings:

  - You are about to drop the column `picture` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UsertoLesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "picture",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UsertoCourse" ADD COLUMN     "last_lesson_id" UUID,
ADD COLUMN     "last_section_id" UUID;

-- AlterTable
ALTER TABLE "UsertoLesson" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_last_lesson_id_fkey" FOREIGN KEY ("last_lesson_id") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_last_section_id_fkey" FOREIGN KEY ("last_section_id") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
