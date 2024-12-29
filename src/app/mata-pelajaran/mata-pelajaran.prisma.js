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
export const getMataPelajaranStatistik = async () => {


    return await db.mataPelajaran.findMany({
        orderBy: {
            id: 'asc'
        },
        include: {
            mataPelajaranGuru: {
                select: {
                    user: {
                        select: {
                            _count: {
                                select: {
                                    classes: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getMataPelajaranById = async ({
    id
}) => {
    return await db.mataPelajaran.findUnique({ where: { id } })
}

export const deleteMataPelajaran = async ({
    id
}) => {
    return await db.mataPelajaran.delete({ where: { id } })
}

export const countMataPelajaran = async () => {
    return await db.mataPelajaran.count()
}
