import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createMataPelajaranGuru = async ({
    data
}) => {
    return await db.mataPelajaranGuru.create({ data })
}