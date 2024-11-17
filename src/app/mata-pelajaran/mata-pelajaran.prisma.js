import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createMataPelajaran = async ({
    title
}) => {
    return await db.mataPelajaran.create({ data: { title } })
};

export const updateMataPelajaran = async ({
    id,
    title
}) => {
    return await db.mataPelajaran.update({
        where: { id },
        data: { title }
    })
};

export const getMataPelajaran = async ({
    isActive
}) => {
    const whereClause = {
        isActive: isActive ? Boolean(Number(isActive)) : undefined
    }

    return await db.mataPelajaran.findMany({
        where: whereClause,
        orderBy: {
            id: 'asc'
        }
    })
}