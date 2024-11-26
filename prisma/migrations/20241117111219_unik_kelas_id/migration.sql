/*
  Warnings:

  - A unique constraint covering the columns `[class_id]` on the table `schedule_class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "schedule_class_class_id_key" ON "schedule_class"("class_id");
