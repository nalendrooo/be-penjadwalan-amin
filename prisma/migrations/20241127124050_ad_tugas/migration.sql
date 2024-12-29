-- CreateTable
CREATE TABLE "tugas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "class_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deadline_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tugas_siswa" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "tugas_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tugas_siswa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tugas" ADD CONSTRAINT "tugas_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas_siswa" ADD CONSTRAINT "tugas_siswa_tugas_id_fkey" FOREIGN KEY ("tugas_id") REFERENCES "tugas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas_siswa" ADD CONSTRAINT "tugas_siswa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
