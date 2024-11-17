import * as kelasRepository from '../kelas/kelas.prisma.js'
import * as usersRepository from '../users/users.prisma.js'

export const createClass = async (req, res) => {
     const { body } = req

     const data = await kelasRepository.createKelas({
          data: body
     })

     return res.status(200).json({
          status: 'success',
          message: 'Kelas berhasil dibuat',
          data
     })
};

export const getAllKelas = async (req, res) => {
     const data = await kelasRepository.getAllKelas()

     return res.status(200).json({
          status: 'success',
          message: 'Kelas berhasil diambil',
          data
     })
}

export const addGuruToKelas = async (req, res) => {
     const { body, params } = req

     const data = await kelasRepository.addGuruToKelas({
          kelasId: Number(params.id),
          guruId: Number(body.guruId)
     })

     return res.status(200).json({
          status: 'success',
          message: 'Guru berhasil ditambahkan ke kelas',
          data
     })
}

export const getAllGuru = async (req, res) => {
     const data = await usersRepository.getUserByRole(2)

     return res.status(200).json({
          status: 'success',
          message: 'Data guru berhasil diambil',
          data
     })
}

export const getAllSiswa = async (req, res) => {
     const data = await usersRepository.getUserByRole(3)

     return res.status(200).json({
          status: 'success',
          message: 'Data siswa berhasil diambil',
          data
     })
}