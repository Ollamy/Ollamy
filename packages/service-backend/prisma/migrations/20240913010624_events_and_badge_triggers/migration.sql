/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/

DELETE FROM "Badge" *;

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "event_name" TEXT,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "trigger" JSONB;

-- AlterTable
ALTER TABLE "UserBadges" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Event" (
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "LogEvent" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "event_name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_tag_key" ON "Badge"("tag");

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_event_name_fkey" FOREIGN KEY ("event_name") REFERENCES "Event"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEvent" ADD CONSTRAINT "LogEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEvent" ADD CONSTRAINT "LogEvent_event_name_fkey" FOREIGN KEY ("event_name") REFERENCES "Event"("name") ON DELETE CASCADE ON UPDATE CASCADE;
