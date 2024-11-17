-- CreateTable
CREATE TABLE "materi" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "materi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "materi" ADD CONSTRAINT "materi_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
