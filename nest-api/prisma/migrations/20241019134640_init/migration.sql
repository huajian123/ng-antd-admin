/*
  Warnings:

  - You are about to drop the column `other_num` on the `department` table. All the data in the column will be lost.
  - Added the required column `order_num` to the `department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "department" DROP COLUMN "other_num",
ADD COLUMN     "order_num" INTEGER NOT NULL;
