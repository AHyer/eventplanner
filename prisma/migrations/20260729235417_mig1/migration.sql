-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'VENDOR');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Design', 'Sourcing', 'Prep', 'Install', 'Done');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('Needed', 'Ordered', 'Delivered', 'Installed');

-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "uname" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Project" (
    "pid" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pname" VARCHAR(255) NOT NULL,
    "status" "ProjectStatus"[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "costEstimate" DECIMAL(65,30) NOT NULL,
    "status" "ItemStatus"[],

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
