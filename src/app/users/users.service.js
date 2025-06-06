import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import * as userRepository from './users.prisma.js';
import * as roleRepository from '../role/role.prisma.js';
import * as userRoleRepository from '../user-role/user-role.prisma.js';

dotenv.config()

export const createUser = async (req, res) => {
    const { body, params } = req

    const roles = ['admin', 'guru', 'siswa'];

    const cekEmail = await userRepository.cekEmailExist({ email: body.email })

    if (cekEmail) {
        return res.status(400).json({
            status: 'error',
            message: 'Email sudah terdaftar'
        })
    }
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(body.password, salt)

    if (!roles.includes(params.role_id)) {
        return res.status(400).json({
            status: 'error',
            message: 'Role tidak ditemukan'
        })
    }

    const role = await roleRepository.getRole()
    if (!role) {
        return new res.status(400).json({
            status: 'error',
            message: 'Role belum dibuat'
        })
    }
    const user = await userRepository.createUser(body, hashPassword)

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'User gagal dibuat'
        })
    }

    await userRoleRepository.createUserRole(user.id, roles.findIndex(role => role === params.role_id) + 1)

    return res.status(200).json({
        status: 'success',
        message: 'User berhasil dibuat',
        data: {
            id: user.id,
            email: body.email
        }
    })
}


export const loginUser = async (req, res) => {
    const { body } = req
    const user = await userRepository.cekEmailExist({ email: body.email })

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Email tidak terdaftar'
        })
    }

    const match = await bcrypt.compare(body.password, user.password)

    if (!match) {
        return res.status(400).json({
            status: 'error',
            message: 'Password salah'
        })
    }

    const token = jwt.sign(
        {
            email: user.email,
            id: user.id,
            nama: user?.nama,
            role: user?.userRole[0].role.nama,
            mapel: user?.mataPelajaranGuru?.[0]?.mataPelajaran?.title
        },
        process.env.ACCESS_TOKEN,
        // { expiresIn: '1d' }
    );

    return res.status(200).json({
        status: 'success',
        message: 'User berhasil login',
        data: { token }
    })
}
export const updatePasswordByEmail = async (req, res) => {
    const { body } = req
    const user = await userRepository.cekEmailExist({ email: body.email })

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Email tidak terdaftar'
        })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(body.password, salt)
    const data = await userRepository.updatePasswordByEmail(body.id, hashPassword)
    console.log('body', body)
    console.log('password', hashPassword)
    console.log('eror', data)
    return res.status(200).json({
        status: 'success',
        message: 'User berhasil direset',
        data
    })
}

export const getProfile = async (req, res) => {
    const { body } = req
    const data = await userRepository.getUserById({
        id: body.user.id
    })

    return res.status(200).json({
        status: 'success',
        message: 'Profile berhasil diambil',
        data
    })
}