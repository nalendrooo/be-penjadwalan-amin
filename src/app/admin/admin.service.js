import * as kelasRepository from '../kelas/kelas.prisma.js'
import * as usersRepository from '../users/users.prisma.js'
import * as jadwalKelasRepository from '../jadwal-kelas/jadwal-kelas.prisma.js'
import * as mataPelajaranGuruRepository from '../mata-pelajaran-guru/mata-pelajaran-guru.prisma.js'
import * as mataPelajaranRepository from '../mata-pelajaran/mata-pelajaran.prisma.js'

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

export const createJadwalKelas = async (req, res) => {
     const { body, params } = req

     const cekKelas = await kelasRepository.getKelasById({
          id: Number(params.id)
     })

     if (!cekKelas) {
          return res.status(400).json({
               status: 'error',
               message: 'Kelas tidak ditemukan'
          })
     }

     const cekJadwalKelas = await jadwalKelasRepository.getJadwalKelasById({
          classId: Number(params.id)
     })

     if (cekJadwalKelas) {
          return res.status(400).json({
               status: 'error',
               message: 'Jadwal kelas sudah dibuat'
          })
     }

     const data = await jadwalKelasRepository.createJadwalKelas({
          data: {
               ...body,
               classId: Number(params.id)
          }
     })

     return res.status(200).json({
          status: 'success',
          message: 'Jadwal kelas berhasil dibuat',
          data
     })
}

export const updateJadwalKelas = async (req, res) => {
     const { body, params } = req

     const cekKelas = await kelasRepository.getKelasById({
          id: Number(params.id)
     })

     if (!cekKelas) {
          return res.status(400).json({
               status: 'error',
               message: 'Kelas tidak ditemukan'
          })
     }


     const data = await jadwalKelasRepository.updateJadwalKelas({
          id: Number(params.id),
          data: {
               ...body,
               classId: Number(params.id)
          }
     })

     return res.status(200).json({
          status: 'success',
          message: 'Jadwal kelas berhasil diupdate',
          data
     })
}

export const assignGuruToMataPelajaran = async (req, res) => {
     const { body } = req

     const user = await usersRepository.getUserById({
          id: body.userId
     })

     if (!user) {
          return res.status(400).json({
               status: 'error',
               message: 'Guru tidak ditemukan'
          })
     }

     if (user.userRole[0].role.nama !== 'guru') {
          return res.status(400).json({
               status: 'error',
               message: 'User bukan guru'
          })
     }

     if (user.mataPelajaranGuru.length > 0) {
          return res.status(400).json({
               status: 'error',
               message: 'Guru sudah memiliki mata pelajaran'
          })
     }

     const mataPelajaran = await mataPelajaranRepository.getMataPelajaranById({
          id: body.mataPelajaranId
     })

     if (!mataPelajaran) {
          return res.status(400).json({
               status: 'error',
               message: 'Mata pelajaran tidak ditemukan'
          })
     }

     const data = await mataPelajaranGuruRepository.createMataPelajaranGuru({
          data: {
               ...body,
          }
     })

     return res.status(200).json({
          status: 'success',
          message: 'Mata pelajaran guru berhasil ditambahkan',
          data
     })
}

export const getStatisticDashboard = async (req, res) => {
     const totalKelas = await kelasRepository.countKelas()
     const totalMapel = await mataPelajaranRepository.countMataPelajaran()
     const totalGuru = await usersRepository.countGuru()
     const totalSiswa = await usersRepository.countSiswa()
     const dataMapel = await mataPelajaranRepository.getMataPelajaranStatistik()

     const final = {
          totalGuru,
          totalKelas,
          totalMapel,
          totalSiswa,
          mataPelajaran: dataMapel
     }

     return res.status(200).json({
          status: 'success',
          message: 'Data berhasil diambil',
          data: final
     })
}