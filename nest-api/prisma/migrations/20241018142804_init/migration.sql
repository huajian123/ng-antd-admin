-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "father_id" INTEGER NOT NULL,
    "department_name" TEXT NOT NULL,
    "other_num" INTEGER NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);
