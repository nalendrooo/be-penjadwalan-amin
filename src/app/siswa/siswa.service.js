import * as kelasRepository from '../kelas/kelas.prisma.js'
import * as materiRepository from '../materi/materi.prisma.js'

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

