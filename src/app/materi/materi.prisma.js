import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


export const createMateri = async ({
    data
}) => {
    return await db.materi.create({ data })
}

export const getMateriOnClass = async ({
    id
}) => {
    return await db.materi.findMany({
        where: {
            classId: id
        },
    })
}

export const getMateriActiveOnClass = async ({
    id
}) => {
    return await db.materi.findMany({
        where: {
            classId: id,
            isActive: true
        },
    })
}

export const updateMateri = async ({
    id,
    data
}) => {
    return await db.materi.update({
        where: { id },
        data
    })
}

export const deleteMateri = async ({
    id
}) => {
    return await db.materi.delete({
        where: { id }
    })
}

export const getMateriById = async ({
    id
}) => {
    return await db.materi.findUnique({
        where: { id }
    })
}