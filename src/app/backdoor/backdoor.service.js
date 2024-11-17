import * as daysRepository from "../day/day.prisma.js";
import * as roleRepository from "../role/role.prisma.js";

export const sendSeed = async (req, res) => {
    const days = await daysRepository.getDays()

    if (days.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Hari sudah dibuat',

        })
    }

    const role = await roleRepository.getRole()

    if (role.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Role sudah dibuat',

        })
    }

    await roleRepository.createRole()

    await daysRepository.createDays()

    return res.status(200).json({
        status: 'success',
        message: 'Hari dan Role berhasil dibuat'
    })
}