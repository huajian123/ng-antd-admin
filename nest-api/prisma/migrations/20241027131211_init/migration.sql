/*
  Warnings:

  - The primary key for the `sys_user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "sys_user_role" DROP CONSTRAINT "sys_user_role_user_id_fkey";

-- AlterTable
ALTER TABLE "sys_user_role" DROP CONSTRAINT "sys_user_role_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("id");
