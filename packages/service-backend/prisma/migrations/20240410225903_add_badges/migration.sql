-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "Badge" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadges" (
    "user_id" UUID NOT NULL,
    "badge_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadges_pkey" PRIMARY KEY ("user_id","badge_id")
);

-- AddForeignKey
ALTER TABLE "UserBadges" ADD CONSTRAINT "UserBadges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadges" ADD CONSTRAINT "UserBadges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO "Badge" (name, description , image_name, color, "order")
VALUES ('First Lesson', 'You completed your first Lesson', 'first_lesson', '#DC8F69', 0),
    ('Second Lesson', 'You completed your second Lesson', 'second_lesson', '#787DA3', 1),
    ('Third Lesson', 'You completed your third Lesson', 'third_lesson', '#E0AD03', 2),
    ('Fourth Lesson', 'You completed your fourth Lesson', 'fourth_lesson', '#8EBBFF', 3),
    ('Fifth Lesson', 'You completed your fifth Lesson', 'fifth_lesson', '#E0AD03', 4)