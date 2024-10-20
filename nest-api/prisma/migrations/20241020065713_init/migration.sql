-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "user_name" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "role_name" TEXT NOT NULL,
    "sex" INTEGER NOT NULL,
    "mobile" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "department_name" TEXT NOT NULL,
    "last_login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "role_desc" TEXT,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "father_id" INTEGER NOT NULL,
    "department_name" TEXT NOT NULL,
    "order_num" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "father_id" INTEGER NOT NULL,
    "menu_name" TEXT NOT NULL,
    "menu_Type" TEXT NOT NULL,
    "al_icon" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "order_num" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "new_link_flag" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);
