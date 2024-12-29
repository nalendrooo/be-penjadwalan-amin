/*
  Warnings:

  - You are about to drop the column `cover` on the `class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "class" DROP COLUMN "cover";

-- AlterTable
ALTER TABLE "materi" ADD COLUMN     "original_filename" TEXT,
ADD COLUMN     "size_file" INTEGER,
ADD COLUMN     "type_file" TEXT,
ALTER COLUMN "filename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tugas" ADD COLUMN     "original_filename" TEXT,
ADD COLUMN     "size_file" INTEGER,
ADD COLUMN     "type_file" TEXT;

-- AlterTable
ALTER TABLE "tugas_siswa" ADD COLUMN     "original_filename" TEXT,
ADD COLUMN     "size_file" INTEGER,
ADD COLUMN     "type_file" TEXT,
ALTER COLUMN "filename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ujian" ADD COLUMN     "original_filename" TEXT,
ADD COLUMN     "size_file" INTEGER,
ADD COLUMN     "type_file" TEXT,
ALTER COLUMN "filename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profile" TEXT;
