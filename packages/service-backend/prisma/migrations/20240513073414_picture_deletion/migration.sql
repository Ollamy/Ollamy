-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_picture_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_picture_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_picture_id_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
