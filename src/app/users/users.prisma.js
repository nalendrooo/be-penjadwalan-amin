import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


export const createUser = async (data, hashedPassword) => {
    return await db.user.create({
        data: {
            password: hashedPassword,
            email: data.email,
            nama: data?.nama,
            telephone: data?.telephone,
            wali: data?.wali,
            nis: data?.nis
        },
    })
}

export const cekEmailExist = async ({
    email
}) => {
    return await db.user.findFirst(
        {
            where: { email },
            include: {
                userRole: {
                    select: {
                        roleId: true,
                        role: {
                            select: {
                                nama: true
                            }
                        }
                    }
                }
            }
        })
};

export const getUserByRole = async (role) => {
    return await db.user.findMany({
        where: {
            userRole: {
                some: {
                    roleId: role
                }
            }
        },
        select: {
            id: true,
            email: true,
            nama: true,
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
    })
}

export const cekUserByIds = async ({
    ids
}) => {
    return await db.user.count({
        where: {
            id: {
                in: ids
            }
        }
    })
}

export const getUserById = async ({
    id
}) => {
    return await db.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            nama: true,
            telephone: true,
            mataPelajaranGuru: true,
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
    })
}

export const updatePasswordByEmail = async ({
    email,
    hashedPassword
}) => {
    return await db.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword
        }
    })
}

export const cekUserNotJoinKelas = async ({
    kelasId,
    ids
}) => {
    return await db.user.findMany({
        where: {
            classStudent: {
                none: {
                    classId: kelasId,
                    userId: {
                        in: ids
                    }
                }
            },
            userRole: {
                some: {
                    roleId: 3
                }
            },

        },
        select: {
            id: true,
            email: true,
            nama: true,
            telephone: true,
        }
    })
}

export const countSiswa = async () => {
    return await db.user.count({
        where: {
            userRole: {
                some: {
                    roleId: 3
                }
            }
        }
    })
}

export const countGuru = async () => {
    return await db.user.count({
        where: {
            userRole: {
                some: {
                    roleId: 2
                }
            }
        }
    })
}
