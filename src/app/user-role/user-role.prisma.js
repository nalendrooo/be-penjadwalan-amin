import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createUserRole = async (userId, roleId) => {
    return await db.userRole.create({
        data: {
            userId,
            roleId
        }
    })
}