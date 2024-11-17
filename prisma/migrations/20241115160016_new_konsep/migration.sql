/*
  Warnings:

  - You are about to drop the column `mata_pelajaran_id` on the `class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_mata_pelajaran_id_fkey";

-- AlterTable
ALTER TABLE "class" DROP COLUMN "mata_pelajaran_id";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "mata_pelajaran_guru" (
    "id" SERIAL NOT NULL,
    "mata_pelajaran_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "mata_pelajaran_guru_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "mata_pelajaran_guru" ADD CONSTRAINT "mata_pelajaran_guru_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mata_pelajaran_guru" ADD CONSTRAINT "mata_pelajaran_guru_mata_pelajaran_id_fkey" FOREIGN KEY ("mata_pelajaran_id") REFERENCES "mata_pelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
