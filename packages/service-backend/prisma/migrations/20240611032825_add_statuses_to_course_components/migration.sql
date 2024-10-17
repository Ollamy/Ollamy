/*
  Warnings:

  - The `status` column on the `UsertoLesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "UsertoCourse" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "UsertoLesson" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';

-- DropEnum
DROP TYPE "LessonStatus";

-- CreateTable
CREATE TABLE "UsertoSection" (
    "id" UUID NOT NULL,
    "section_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_STARTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsertoSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsertoSection_section_id_user_id_key" ON "UsertoSection"("section_id", "user_id");

-- AddForeignKey
ALTER TABLE "UsertoSection" ADD CONSTRAINT "UsertoSection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoSection" ADD CONSTRAINT "UsertoSection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
