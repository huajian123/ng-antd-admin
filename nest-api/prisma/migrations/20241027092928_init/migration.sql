/*
  Warnings:

  - The primary key for the `sys_user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sys_user_role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sys_user_role" DROP CONSTRAINT "sys_user_role_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("role_id", "user_id");

-- AddForeignKey
ALTER TABLE "sys_user_role" ADD CONSTRAINT "sys_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
