/*
  Warnings:

  - You are about to drop the column `state` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "state",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
