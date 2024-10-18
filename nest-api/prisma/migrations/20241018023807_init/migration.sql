-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "roleDesc" TEXT,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);
