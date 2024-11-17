import * as kelasRepository from './kelas.prisma.js'

export const getKelasById = async (req, res) => {
    const { params } = req

    const data = await kelasRepository.getKelasById({
        id: Number(params.id)
    })

    if (!data) {
        return res.status(400).json({
            status: 'error',
            message: 'Kelas tidak ditemukan'
        })
    }
   
    return res.status(200).json({
        status: 'success',
        message: 'Kelas berhasil diambil',
        data
    })
}