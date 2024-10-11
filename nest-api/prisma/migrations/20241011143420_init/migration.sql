-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "userName" TEXT NOT NULL,
    "sex" INTEGER NOT NULL,
    "mobile" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "departmentName" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
