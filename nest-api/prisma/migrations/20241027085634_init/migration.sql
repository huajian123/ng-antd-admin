/*
  Warnings:

  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role_id" INTEGER NOT NULL;
