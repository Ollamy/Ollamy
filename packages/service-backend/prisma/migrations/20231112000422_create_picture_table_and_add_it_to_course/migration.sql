-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "picture_id" UUID;

-- CreateTable
CREATE TABLE "Picture" (
    "id" UUID NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_picture_id_fkey" FOREIGN KEY ("picture_id") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
