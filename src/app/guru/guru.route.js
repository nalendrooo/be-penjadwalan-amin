import { Router } from "express";
import { validateRequest } from "../../middleware/validate-request.js";
import { verifyToken } from "../../middleware/verif-token.js";
import * as kelasService from "../kelas/kelas.service.js";
import * as guruSchema from "./guru.request.js";
import * as guruService from "./guru.service.js";

const route = Router()
route.get('/kelas',
    verifyToken, guruService.getKelasByGuruId);
route.get('/kelas/:id',
    kelasService.getKelasById);
route.post('/kelas/:id/materi',
    validateRequest(guruSchema.createMateriSchema), guruService.createMateri);
route.put('/kelas/:id/materi/:id_materi',
    validateRequest(guruSchema.createMateriSchema), guruService.updateMateri);
route.get('/kelas/:id/materi', guruService.getMateriOnClass);
route.delete('/kelas/:id/materi/:id_materi', guruService.deleteMateri);
route.post('/kelas/:id/siswa', validateRequest(guruSchema.addSiswaToKelasSchema), guruService.addSiswaToKelas);
route.delete('/kelas/:id/siswa', validateRequest(guruSchema.addSiswaToKelasSchema), guruService.removeSiswaFromKelas);
route.get('/kelas/:id/siswa', guruService.getSiswaInKelas);
route.get('/kelas/siswa-not-join/:id', guruService.getSiswaNotJoinInKelas);
route.post('/kelas/:id/tugas', validateRequest(guruSchema.createTugasSchema), guruService.createTugas);
route.get('/kelas/:id/tugas', guruService.getTugasInKelas);
route.get('/kelas/:id/tugas/:id_tugas', guruService.getTugasById);
route.get('/kelas/:id/tugas/:id_tugas/siswa', guruService.getSiswaInTugasById);
route.post('/kelas/:id/ujian', validateRequest(guruSchema.createUjianSchema), guruService.createUjian);
route.post('/kelas/:id/tugas/:id_tugas/update-nilai', validateRequest(guruSchema.updateNilaiTugasSiswaSchema), guruService.updateTugasSiswa);
route.get('/kelas/:id/ujian', guruService.getUjianInKelas);

export default route    
