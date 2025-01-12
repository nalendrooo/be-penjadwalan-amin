
import * as materiRepository from '../materi/materi.prisma.js'
import * as kelasRepository from '../kelas/kelas.prisma.js'
import * as kelasSiswaRepository from '../kelas-siswa/kelas-siswa.prisma.js'
import * as userRepository from '../users/users.prisma.js'
import * as tugasRepository from '../tugas/tugas.prisma.js'
import * as tugasSiswaRepository from '../tugas-siswa/tugas-siswa.prisma.js'
import * as ujianRepository from '../ujian/ujian.prisma.js'

export const createMateri = async (req, res) => {
    const { body, params } = req

    const data = await materiRepository.createMateri({
        data: {
            ...body,
            classId: Number(params.id)
        }
    })
    return res.status(200).json({
        status: 'success',
        message: 'Materi berhasil dibuat',
        data
    })
};

export const updateMateri = async (req, res) => {
    const { body, params } = req

    const cekMateri = await materiRepository.getMateriById({
        id: Number(params.id_materi)
    })


    if (!cekMateri) {
        return res.status(400).json({
            status: 'error',
            message: 'Materi tidak ditemukan'
        })
    }

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await materiRepository.updateMateri({
        id: Number(params.id_materi),
        data: {
            ...body,
            classId: Number(params.id)
        }
    })
    return res.status(200).json({
        status: 'success',
        message: 'Materi berhasil diupdate',
        data
    })
};

export const deleteMateri = async (req, res) => {
    const { params } = req

    const cekMateri = await materiRepository.getMateriById({
        id: Number(params.id_materi)
    })


    if (!cekMateri) {
        return res.status(400).json({
            status: 'error',
            message: 'Materi tidak ditemukan'
        })
    }

    const cekKelas = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!cekKelas) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }

    const data = await materiRepository.deleteMateri({
        id: Number(params.id_materi)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Materi berhasil dihapus',
        data
    })
};

export const getMateriOnClass = async (req, res) => {
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

    const data = await materiRepository.getMateriOnClass({
        id: Number(params.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Materi berhasil diambil',
        data
    })
}

export const addSiswaToKelas = async (req, res) => {
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

    const cekUser = await userRepository.cekUserByIds({
        ids: body.siswaIds
    })

    if (!cekUser) {
        return res.status(400).json({
            status: 'error',
            message: 'Siswa tidak ditemukan'
        })
    }


    const data = await kelasSiswaRepository.addSiswaToKelas({
        kelasId: Number(params.id),
        siswaIds: body.siswaIds
    })

    return res.status(200).json({
        status: 'success',
        message: 'Siswa berhasil ditambahkan ke kelas',
        data
    })
}

export const removeSiswaFromKelas = async (req, res) => {
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

    const cekUser = await userRepository.cekUserByIds({
        ids: body.siswaIds
    })

    if (!cekUser) {
        return res.status(400).json({
            status: 'error',
            message: 'Siswa tidak ditemukan'
        })
    }

    const data = await kelasSiswaRepository.removeSiswaFromKelas({
        kelasId: Number(params.id),
        siswaIds: body.siswaIds
    })

    return res.status(200).json({
        status: 'success',
        message: 'Siswa berhasil dihapus dari kelas',
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

export const getSiswaNotJoinInKelas = async (req, res) => {
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

    const getSiswaInKelas = await kelasSiswaRepository.getSiswaInKelas({
        id: Number(params.id)
    })

    const data = await userRepository.cekUserNotJoinKelas({
        kelasId: Number(params.id),
        ids: getSiswaInKelas.map(siswa => siswa.user.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Siswa berhasil diambil',
        data
    })


}

export const getKelasByGuruId = async (req, res) => {
    const { body } = req

    if (body.user.role !== 'guru') {
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden'
        })
    }

    const data = await kelasRepository.getKelasByGuruId({
        id: Number(body.user.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Kelas berhasil diambil',
        data
    })
}

export const createTugas = async (req, res) => {
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

    const data = await tugasRepository.createTugas({
        data: {
            ...body,
            classId: Number(params.id)
        }
    })

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil dibuat',
        data
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

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
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

    if (!data) {
        return res.status(400).json({
            status: 'error',
            message: 'Tugas tidak ditemukan'
        })
    }

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data
    })
}

export const getSiswaInTugasById = async (req, res) => {
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

    if (!data) {
        return res.status(400).json({
            status: 'error',
            message: 'Tugas tidak ditemukan'
        })
    }

    const getSiswaInTugas = await tugasSiswaRepository.getTugasSiswaByIdTugas({
        tugasId: Number(params.id_tugas)
    })

    const siswaInKelas = await kelasSiswaRepository.getSiswaInKelas({
        kelasId: Number(params.id)
    })
    const tugasUserIds = getSiswaInTugas.map((itm) => itm.siswa.id);

    // Filter siswaInKelas yang tidak ada di tugasUserIds
    const notSubmited = siswaInKelas.filter((siswa) => !tugasUserIds.includes(siswa.user.id));

    // Kembalikan hasil

    return res.status(200).json({
        status: 'success',
        message: 'Tugas berhasil diambil',
        data: {
            submited: getSiswaInTugas,
            notSubmited
        }
    })
}

export const createUjian = async (req, res) => {
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

    const data = await ujianRepository.createUjian({
        data: {
            ...body,
            dateTime: new Date(body.dateTime),
            kelasId: Number(params.id)
        }
    })

    return res.status(200).json({
        status: 'success',
        message: 'Ujian berhasil dibuat',
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

    const data = await ujianRepository.getUjianOnClass({
        kelasId: Number(params.id)
    })

    return res.status(200).json({
        status: 'success',
        message: 'Ujian berhasil diambil',
        data
    })
}

export const updateTugasSiswa = async (req, res) => {

    await tugasSiswaRepository.updateNilaiTugasSiswa({
        ...req.body
    })

    return res.status(200).json({
        status: 'success',
        message: 'Update berhasil ',
    })
}

export const updateCommentTugasSiswa = async (req, res) => {

    await tugasSiswaRepository.updateCommentTugasSiswa({
        ...req.body
    })

    return res.status(200).json({
        status: 'success',
        message: 'Update berhasil ',
    })
}