-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "order" SET DEFAULT 'a0';

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "order" TEXT NOT NULL DEFAULT 'a0';

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "order" SET DEFAULT 'a0';

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "order" TEXT NOT NULL DEFAULT 'a0';
