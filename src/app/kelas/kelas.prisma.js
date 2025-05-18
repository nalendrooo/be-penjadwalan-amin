import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


export const createKelas = async ({
    data
}) => {
    return await db.class.create({ data })
};

export const getAllKelas = async () => {
    return await db.class.findMany({
        include: {
            scheduleClasses: {
                select: {
                    day: {
                        select: {
                            title: true
                        }
                    },
                    endTime: true,
                    startTime: true
                }
            },
            classStudent: {
                select: {
                    user: {
                        select: {
                            nama: true,
                            nis: true
                        }
                    }
                }
            },
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
                    userRole: {
                        select: {
                            role: {
                                select: {
                                    nama: true
                                }
                            }
                        }
                    },
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
    })
}

export const addGuruToKelas = async ({
    kelasId,
    guruId
}) => {
    return await db.class.update({
        where: { id: kelasId },
        data: {
            user: {
                connect: { id: guruId }
            }
        }
    })
}

export const getKelasById = async ({
    id
}) => {
    return await db.class.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
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
            },
            scheduleClasses: {
                select: {
                    day: {
                        select: {
                            title: true
                        }
                    },
                    endTime: true,
                    startTime: true
                }
            }
        }
    })
}

export const deleteKelas = async ({ id }) => {
    return await db.class.delete({
        where: { id }
    })
}

export const updateKelas = async ({ id, data }) => {
    return await db.class.update({
        where: { id },
        data
    })
}

export const archiveKelas = async ({ id }) => {
    return await db.class.update({
        where: { id },
        data: { isActive: false }
    })
}

export const restoreKelas = async ({ id }) => {
    return await db.class.update({
        where: { id },
        data: { isActive: true }
    })
}

export const getStudentsInKelas = async ({ id }) => {
    return await db.class.findMany({
        where: { id },
        select: {
            classStudents: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
                    userRole: {
                        select: {
                            role: {
                                select: {
                                    nama: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}


export const getKelasBySiswaId = async ({ id }) => {
    return await db.class.findMany({
        where: {
            classStudent: {
                some: {
                    userId: id
                }
            },
            isActive: true
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
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
            },
            _count: {
                select: {
                    classStudent: true
                }
            },
            scheduleClasses: {
                select: {
                    day: {
                        select: {
                            title: true
                        }
                    },
                    endTime: true,
                    startTime: true
                }
            }

        }
    })
}
export const getKelasBySiswaIdToday = async ({ id }) => {
    return await db.class.findMany({
        where: {
            classStudent: {
                some: {
                    userId: id
                }
            },
            scheduleClasses: {
                some: {
                    dayId: new Date().getDay()
                }
            },
            isActive: true
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
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
            },
            _count: {
                select: {
                    classStudent: true
                }
            },
            scheduleClasses: {
                select: {
                    day: {
                        select: {
                            title: true
                        }
                    },
                    endTime: true,
                    startTime: true
                }
            }

        }
    })
}

export const getKelasByGuruId = async ({ id }) => {
    return await db.class.findMany({
        where: {
            user: {
                is: {
                    id
                }
            },
            isActive: true
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    telephone: true,
                }
            },
            scheduleClasses: {
                select: {
                    day: {
                        select: {
                            title: true,
                            id: true
                        }
                    },
                    endTime: true,
                    startTime: true
                }
            },
            _count: {
                select: {
                    classStudent: true
                }
            }
        }
    })
}

export const countKelas = async () => {
    return await db.class.count()
}