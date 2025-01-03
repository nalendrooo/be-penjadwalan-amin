import bcrypt from 'bcrypt';
import path from 'path';
import * as daysRepository from "../day/day.prisma.js";
import * as roleRepository from "../role/role.prisma.js";
import * as userRepository from "../users/users.prisma.js";
import * as userRoleRepository from "../user-role/user-role.prisma.js";

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
    const hashPassword = await bcrypt.hash('12345678', salt)

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

    await userRoleRepository.createUserRole({
        userId: user.id,
        roleId: 1
    })

    return res.status(200).json({
        status: 'success',
        message: 'Hari dan Role berhasil dibuat'
    })
}

export const downloadFile = async (req, res) => {
    const { folder, filename } = req.params;

    // Path ke folder tempat file PDF disimpan
    const filePath = path.join(process.cwd(), 'public/assets', folder, filename);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
    // Kirim file sebagai respons download
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Error saat mengirim file:', err);
            res.status(404).send('File tidak ditemukan.');
        }
    });


}