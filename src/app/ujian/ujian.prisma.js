import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createUjian = async ({ data }) => {
    return await db.ujian.create({ data })
}

export const updateUjian = async ({ id, data }) => {
    return await db.ujian.update({
        where: { id },
        data
    })
}

export const deleteUjian = async ({ id }) => {
    return await db.ujian.delete({ where: { id } })
}

export const getUjianById = async ({ id }) => {
    return await db.ujian.findUnique({ where: { id } })
}

export const getUjianOnClass = async ({ kelasId }) => {
    return await db.ujian.findMany({
        where: { kelasId },
        include: {
            class: {
                select: {
                    title: true,
                    user: {
                        select: {
                            nama: true,
                            mataPelajaranGuru: {
                                select: {
                                    mataPelajaran: {
                                        select: {
                                            title: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getUjianOnClassSiswa = async ({ kelasId }) => {
    return await db.ujian.findMany({
        where: { kelasId,
            dateTime: {
                gte: new Date()
            }
         },
        include: {
            class: {
                select: {
                    title: true,
                    user: {
                        select: {
                            nama: true,
                            mataPelajaranGuru: {
                                select: {
                                    mataPelajaran: {
                                        select: {
                                            title: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const getUjianByKelasSiswa = async ({
    userId,
    query
}) => {
    const { type } = query
    return await db.ujian.findMany({
        where: {
            type,
            class: {
                classStudent: {
                    some: {
                        userId
                    }
                }
            },
            dateTime: {
                gte: new Date()
            }
        },
        include: {
            class: {
                select: {
                    title: true,
                    user: {
                        select: {
                            nama: true,
                            mataPelajaranGuru: {
                                select: {
                                    mataPelajaran: {
                                        select: {
                                            title: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}