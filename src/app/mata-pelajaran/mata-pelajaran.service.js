import * as mataPelajaranRepository from "./mata-pelajaran.prisma.js";

export const createMataPelajaran = async (req, res) => {
    const { body } = req

    const data = await mataPelajaranRepository.createMataPelajaran({
        title: body.title
    })

    return res.status(200).json({
        status: 'success',
        message: 'Mata pelajaran berhasil dibuat',
        data
    })
};

export const updateMataPelajaran = async (req, res) => {
    const { body, params } = req

    const data = await mataPelajaranRepository.updateMataPelajaran({
        id: Number(params.id),
        title: body.title
    })

    return res.status(200).json({
        status: 'success',
        message: 'Mata pelajaran berhasil diupdate',
        data
    })
};
export const getMataPelajaran = async (req, res) => {
    const { query } = req

    const data = await mataPelajaranRepository.getMataPelajaran({
        isActive: query.is_active
    })

    return res.status(200).json({
        status: 'success',
        message: 'Mata pelajaran berhasil diambil',
        data
    })
};