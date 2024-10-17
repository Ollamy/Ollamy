-- DropForeignKey
ALTER TABLE "UserDiscussions" DROP CONSTRAINT "UserDiscussions_discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "UserDiscussions" DROP CONSTRAINT "UserDiscussions_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserDiscussions" ADD CONSTRAINT "UserDiscussions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiscussions" ADD CONSTRAINT "UserDiscussions_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
