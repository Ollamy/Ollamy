-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "points" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UsertoCourse" ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UsertoLesson" ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UsertoScore" ALTER COLUMN "score" DROP NOT NULL;
