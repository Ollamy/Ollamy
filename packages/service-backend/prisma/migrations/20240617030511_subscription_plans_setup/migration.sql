-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('BASIC', 'ESSENTIAL', 'MASTER');

-- CreateTable
CREATE TABLE "Subscription" (
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'BASIC',
    "slots" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("plan")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "subscription_plan" "SubscriptionPlan" NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_plan_key" ON "Subscription"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_user_id_key" ON "UserSubscription"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_user_id_subscription_plan_key" ON "UserSubscription"("user_id", "subscription_plan");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscription_plan_fkey" FOREIGN KEY ("subscription_plan") REFERENCES "Subscription"("plan") ON DELETE CASCADE ON UPDATE CASCADE;
