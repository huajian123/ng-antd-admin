/*
  Warnings:

  - You are about to drop the column `roleDesc` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `departmentName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.
  - Added the required column `role_name` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role" DROP COLUMN "roleDesc",
DROP COLUMN "roleName",
ADD COLUMN     "role_desc" TEXT,
ADD COLUMN     "role_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "departmentId",
DROP COLUMN "departmentName",
DROP COLUMN "roleName",
DROP COLUMN "userName",
ADD COLUMN     "department_id" INTEGER NOT NULL,
ADD COLUMN     "department_name" TEXT NOT NULL,
ADD COLUMN     "role_name" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;
