/*
  Warnings:

  - You are about to drop the `SysRoleMenu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SysUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SysRoleMenu";

-- DropTable
DROP TABLE "SysUserRole";

-- CreateTable
CREATE TABLE "sys_role_menu" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys_role_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sys_user_role" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sys_user_role_pkey" PRIMARY KEY ("id")
);
