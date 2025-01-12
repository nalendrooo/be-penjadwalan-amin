import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const getTugasSiswa = async ({
    tugasId,
    userId
}) => {
    return await db.tugasSiswa.findMany({
        where: {
            tugasId,
            userId
        },
        select: {
            id: true,
            filename: true,
            siswa: {
                select: {
                    id: true,
                    email: true,
                    nama: true,
                    telephone: true,
                }
            },
            createdAt: true,
            updatedAt: true
        }
    })
}

export const updateNilaiTugasSiswa = async ({
    id,
    nilai
}) => await db.tugasSiswa.update({
    where: {
        id
    },
    data: {
        nilai
    }
})

export const updateCommentTugasSiswa = async ({
    id,
    comment
}) => await db.tugasSiswa.update({
    where: {
        id
    },
    data: {
        comment
    }
})

export const getTugasSiswaByIdTugas = async ({
    tugasId
}) => {
    return await db.tugasSiswa.findMany({
        where: {
            tugasId
        },
        orderBy: {
            createdAt: 'asc'
        },
        select: {
            id: true,
            filename: true,
            siswa: {
                select: {
                    id: true,
                    email: true,
                    nama: true,
                    telephone: true,
                }
            },
            nilai: true,
            createdAt: true,
            updatedAt: true,
            comment: true
        }
    })
}

export const submitTugas = async (data) => {
    return await db.tugasSiswa.create({
        data
    })
}

export const getTugasSiswaById = async ({
    tugasId,
    userId
}) => {
    return await db.tugasSiswa.findFirst({
        // by: ['filename'],
        where: {
            tugasId,
            userId
        }
    })
}

export const getAllTugasSiswa = async ({
    userId,
    tugasId
}) => {
    return await db.tugasSiswa.findMany({
        // by: ['filename'],
        where: {
            userId,
            tugas: {
                id: tugasId
            }
        },
        select: {
            tugasId: true,
            nilai: true,
            comment: true,
            tugas: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    deadlineAt: true,
                    class: {
                        select: {
                            user: {
                                select: {
                                    nama: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const updateTugasSiswa = async ({
    id,
    filename
}) => {
    return await db.tugasSiswa.update({
        where: {
            id
        },
        data: {
            filename,
            updatedAt: new Date()
        }
    })
}