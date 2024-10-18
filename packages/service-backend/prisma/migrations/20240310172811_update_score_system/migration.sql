/*
  Warnings:

  - You are about to drop the column `points` on the `UsertoLesson` table. All the data in the column will be lost.
  - Made the column `points` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "points" SET NOT NULL,
ALTER COLUMN "points" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UsertoCourse" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UsertoLesson" DROP COLUMN "points",
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UsertoScore" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UsertoScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsertoScore_user_id_key" ON "UsertoScore"("user_id");

-- AddForeignKey
ALTER TABLE "UsertoScore" ADD CONSTRAINT "UsertoScore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
