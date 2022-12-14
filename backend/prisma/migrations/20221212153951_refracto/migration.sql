-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PermissionUser" AS ENUM ('READ', 'WRITE', 'DELETE', 'PING', 'ADMIN');

-- CreateEnum
CREATE TYPE "PermissionCourse" AS ENUM ('READ', 'WRITE', 'DELETE', 'PING', 'ADMIN');

-- CreateEnum
CREATE TYPE "PermissionSection" AS ENUM ('READ', 'WRITE', 'DELETE', 'PING');

-- CreateEnum
CREATE TYPE "PermissionChapter" AS ENUM ('READ', 'WRITE', 'DELETE', 'PING');

-- CreateEnum
CREATE TYPE "PermissionLesson" AS ENUM ('READ', 'WRITE', 'DELETE', 'PING');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "communities_id" UUID[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsertoCourse" (
    "id" UUID NOT NULL,
    "role_user" "Role" NOT NULL DEFAULT 'MEMBER',
    "permission_user" "PermissionUser"[] DEFAULT ARRAY[]::"PermissionUser"[],
    "permission_course" "PermissionCourse"[] DEFAULT ARRAY[]::"PermissionCourse"[],
    "permission_section" "PermissionSection"[] DEFAULT ARRAY[]::"PermissionSection"[],
    "permission_chapter" "PermissionChapter"[] DEFAULT ARRAY[]::"PermissionChapter"[],
    "permission_lesson" "PermissionLesson"[] DEFAULT ARRAY[]::"PermissionLesson"[],
    "course_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "UsertoCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
<<<<<<<< HEAD:backend/prisma/migrations/20221213164606_/migration.sql
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
========
    "role" "Role" NOT NULL,
>>>>>>>> f414d06807bb30a929a91d694f2e0a368ac5d19b:backend/prisma/migrations/20221212153951_refracto/migration.sql

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" UUID NOT NULL,
    "section_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" UUID NOT NULL,
    "chapter_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsertoCourse" ADD CONSTRAINT "UsertoCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
