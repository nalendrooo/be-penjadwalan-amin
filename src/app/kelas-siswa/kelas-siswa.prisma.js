import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const addSiswaToKelas = async ({
    kelasId,
    siswaIds
}) => {
    return await db.classStudent.createMany({
        data: siswaIds.map(siswaId => ({
            classId: kelasId,
            userId: siswaId
        }))
    })
}

export const removeSiswaFromKelas = async ({
    kelasId,
    siswaIds
}) => {
    return await db.classStudent.deleteMany({
        where: {
            classId: kelasId,
            userId: { in: siswaIds }
        }
    })
}

export const getSiswaInKelas = async ({
    kelasId
}) => {
    return await db.classStudent.findMany({
        where: {
            classId: kelasId
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true,
                    nama: true,
                    telephone: true,
                    nis: true
                }
            }
        }
    })
}