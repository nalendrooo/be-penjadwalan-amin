import { Router } from "express"
import * as guruSchema from "./guru.request.js"
import * as guruService from "./guru.service.js"
import * as kelasService from "../kelas/kelas.service.js"
import { validateRequest } from "../../middleware/validate-request.js";
import { verifyToken } from "../../middleware/verif-token.js";

const route = Router()
route.get('/kelas', verifyToken, guruService.getKelasByGuruId);
route.get('/kelas/:id', kelasService.getKelasById);
route.post('/kelas/:id/materi', validateRequest(guruSchema.createMateriSchema), guruService.createMateri);
route.put('/kelas/:id/materi/:id_materi', validateRequest(guruSchema.createMateriSchema), guruService.updateMateri);
route.get('/kelas/:id/materi', guruService.getMateriOnClass);
route.delete('/kelas/:id/materi/:id_materi', guruService.deleteMateri);
route.post('/kelas/:id/siswa', validateRequest(guruSchema.addSiswaToKelasSchema), guruService.addSiswaToKelas);
route.delete('/kelas/:id/siswa', validateRequest(guruSchema.addSiswaToKelasSchema), guruService.removeSiswaFromKelas);
route.get('/kelas/:id/siswa', guruService.getSiswaInKelas);
route.get('/kelas/siswa-not-join/:id', guruService.getSiswaNotJoinInKelas);
export default route    
