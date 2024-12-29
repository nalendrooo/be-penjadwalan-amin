-- CreateEnum
CREATE TYPE "TypeUjian" AS ENUM ('UAS', 'UTS');

-- CreateTable
CREATE TABLE "ujian" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "type" "TypeUjian" NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "kelasId" INTEGER NOT NULL,

    CONSTRAINT "ujian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ujian" ADD CONSTRAINT "ujian_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
