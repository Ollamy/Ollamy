-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
