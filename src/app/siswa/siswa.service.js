import * as kelasRepository from '../kelas/kelas.prisma.js'
import * as materiRepository from '../materi/materi.prisma.js'
import * as tugasRepository from '../tugas/tugas.prisma.js'
import * as tugasSiswaRepository from '../tugas-siswa/tugas-siswa.prisma.js'
import * as ujianRepository from '../ujian/ujian.prisma.js'
import * as kelasSiswaRepository from '../kelas-siswa/kelas-siswa.prisma.js'

export const getMateriOnClass = async (req, res) => {
    const { id } = req.params
    const data = await materiRepository.getMateriActiveOnClass({
        id: Number(id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Materi berhasil diambil',
        data
    })
}

export const getKelasBySiswaId = async (req, res) => {
    const { body } = req
    const data = await kelasRepository.getKelasBySiswaId({
        id: Number(body.user.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Kelas berhasil diambil',
        data
    })
}

export const getKelasBySiswaIdToday = async (req, res) => {
    const { body } = req
    const data = await kelasRepository.getKelasBySiswaIdToday({
        id: Number(body.user.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Kelas hari ini berhasil diambil',
        data
    })
}

export const getSiswaInKelas = async (req, res) => {
    const { params } = req

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await kelasSiswaRepository.getSiswaInKelas({
        kelasId: Number(params.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Siswa berhasil diambil',
        data
    })
}

export const getTugasById = async (req, res) => {
    const { params } = req

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await tugasRepository.getTugasById({
        id: Number(params.id_tugas)
    })
    const submitted = await tugasSiswaRepository.getTugasSiswaById({
        tugasId: Number(params.id_tugas),
        userId: req.body.user.id
    })

    // if (!cekTugasSiswa) {
    //     return res.status(400).json({
    //         status: 'error',
    //         message: 'Tugas tidak ditemukan'
    //     })
    // }


    if (!data) {
        return res.status(400).json({
            status: 'error',
            message: 'Tugas tidak ditemukan'
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data: {
            ...data,
            submitted
        }
    })
}


export const getTugasInKelas = async (req, res) => {
    const { params } = req

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await tugasRepository.getTugasInClass({
        id: Number(params.id)
    })
    // const data = await tugasRepository.getTugasInClassActive({
    //     id: Number(params.id)
    // })

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data
    })
}

export const getStatisticTugas = async (req, res) => {
    const { params } = req

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const tugas = await tugasRepository.getTugasInClass({
        id: Number(params.id)
    })

    const tugasSiswa = await tugasSiswaRepository.getAllTugasSiswa({
        userId: req.body.user.id,
        tugasId: Number(params.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data: {
            labels: tugas.map(item => {
                return {
                    id: item.id,
                    title: item.title
                }
            }),
            tugasSiswa
        }
    })
}

export const submitTugas = async (req, res) => {
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

    const cekTugas = await tugasRepository.getTugasById({
        id: Number(params.id_tugas)
    })

    if (!cekTugas) {
        return res.status(400).json({
            status: 'error',
            message: 'Tugas tidak ditemukan'
        })
    }

    const cekTugasSiswa = await tugasSiswaRepository.getTugasSiswaById({
        tugasId: Number(params.id_tugas),
        userId: body.user.id
    })


    if (cekTugasSiswa) {
        return res.status(400).json({
            status: 'error',
            message: 'Tugas sudah disubmit'
        })
    }

    const data = await tugasSiswaRepository.submitTugas({
        filename: body.filename,
        original_filename: body.original_filename,
        size_file: body.size_file,
        type_file: body.type_file,
        tugasId: Number(params.id_tugas),
        userId: body.user.id
    })

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil disubmit',
        data
    })
}

export const getUjianInKelas = async (req, res) => {
    const { params } = req

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await ujianRepository.getUjianOnClassSiswa({
        kelasId: Number(params.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Ujian berhasil diambil',
        data
    })
}

export const getUjianByKelasSiswa = async (req, res) => {
    const { body, query } = req

    const data = await ujianRepository.getUjianByKelasSiswa({
        userId: body.user.id,
        query
    })

    return res.status(200).json({
        status: 'success',
        message: 'Ujian berhasil diambil',
        data
    })
}

export const getAllTugas = async (req, res) => {
    const { body } = req

    const data = await tugasRepository.getAllTugas({
        userId: body.user.id
    })

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data
    })
}