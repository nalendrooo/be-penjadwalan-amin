import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export const createDays = async () => {
    const titles = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

    const data = titles.map(item => ({
        title: item,
    }));

    return await db.days.createMany({
        data,
        skipDuplicates: true
    });
};

export const getDays = async () => {
    return await db.days.findMany()
}