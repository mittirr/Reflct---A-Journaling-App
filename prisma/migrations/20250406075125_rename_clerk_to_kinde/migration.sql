/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kindeUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kindeUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_clerkUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkUserId",
ADD COLUMN     "kindeUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_kindeUserId_key" ON "User"("kindeUserId");
