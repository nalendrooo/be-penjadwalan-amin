import * as daysRepository from "./day.prisma.js";

export const getDays = async (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Hari berhasil diambil',
        data: await daysRepository.getDays()
    })
};