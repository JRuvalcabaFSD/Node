-- CreateEnum
CREATE TYPE "SeveroityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGHT');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "SeveroityLevel" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
