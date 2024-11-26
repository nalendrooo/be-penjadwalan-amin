import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createJadwalKelas = async ({
    data
}) => {
    return await db.scheduleClass.create({ data })
}

export const updateJadwalKelas = async ({
    id,
    data
}) => {
    return await db.scheduleClass.update({
        where: { id },
        data
    })
}

export const getJadwalKelasById = async ({
    classId
}) => {
    return await db.scheduleClass.findUnique({
        where: { classId }
    })
}