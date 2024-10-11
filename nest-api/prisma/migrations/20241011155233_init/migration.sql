/*
  Warnings:

  - Added the required column `available` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "last_login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roleName" TEXT NOT NULL;
