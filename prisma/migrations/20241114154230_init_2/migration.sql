/*
  Warnings:

  - You are about to drop the column `userId` on the `class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_userId_fkey";

-- AlterTable
ALTER TABLE "class" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
