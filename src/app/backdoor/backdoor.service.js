import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
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

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(12345678, salt)

    const user = await userRepository.createUser({
        email: 'admin@admin.com',
        password: hashPassword,
        nama: 'Admin',
        telephone: '08123456789',
    }, hashPassword)

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User gagal dibuat'
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'Hari dan Role berhasil dibuat'
    })
}