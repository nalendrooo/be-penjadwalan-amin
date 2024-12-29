import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createTugas = async ({
    data
}) => {
    return await db.tugas.create({ data })
}

export const getTugasById = async ({
    id
}) => {
    return await db.tugas.findUnique({ where: { id } })
}

export const getTugasInClass = async ({
    id
}) => {
    return await db.tugas.findMany({
        where: {
            classId: id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    tugasSiswa: true
                }
            },
            tugasSiswa: {
                select: {
                   nilai: true
                }
            }
        }
    })
}

export const getTugasInClassActive = async ({
    id
}) => {
    return await db.tugas.findMany({
        where: {
            classId: id,
            deadlineAt: {
                gte: new Date()
            }
        },
    })
}

export const getAllTugas = async ({
    userId
}) => {

    return await db.tugas.findMany({
        where: {
            class: {
                classStudent: {
                    some: {
                        userId
                    }
                }
            },
            deadlineAt: {
                gte: new Date()
            }
        },
        orderBy: {
            deadlineAt: 'desc'
        },
        include: {
            class: {
                select: {
                    title: true,
                    user: {
                        select: {
                            nama: true,
                        }
                    }
                }
            },
        }

    })
}