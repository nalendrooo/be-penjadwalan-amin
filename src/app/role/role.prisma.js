import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export const createRole = async () => {
    const roles = ['admin', 'guru', 'siswa'];

    const data = roles.map(roleName => ({
        nama: roleName,
        isActive: true
    }));

    return await db.role.createMany({
        data: data,
        skipDuplicates: true
    });
};

export const getRole = async () => {
    return await db.role.findMany({
        where: {
            isActive: true
        }
    })
}