/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'VERIFICATION_PENDING', 'DISABLED', 'HIBERNATED', 'DELETED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "handle" VARCHAR(50),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'VERIFICATION_PENDING',
ADD COLUMN     "statusUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");
