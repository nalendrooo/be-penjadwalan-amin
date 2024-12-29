/*
  Warnings:

  - You are about to drop the column `dateTime` on the `ujian` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `ujian` table. All the data in the column will be lost.
  - You are about to drop the column `kelasId` on the `ujian` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `ujian` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `ujian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `ujian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelas_id` to the `ujian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `ujian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ujian" DROP CONSTRAINT "ujian_kelasId_fkey";

-- AlterTable
ALTER TABLE "ujian" DROP COLUMN "dateTime",
DROP COLUMN "endTime",
DROP COLUMN "kelasId",
DROP COLUMN "startTime",
ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "kelas_id" INTEGER NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ujian" ADD CONSTRAINT "ujian_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
