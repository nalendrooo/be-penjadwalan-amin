import { Router } from "express"
// import * as guruSchema from "./guru.request.js"
import * as siswaService from "./siswa.service.js"
import * as usersService from "../users/users.service.js"
import * as usersSchema from "../users/users.request.js"
import * as kelasService from "../kelas/kelas.service.js"
import { validateRequest } from "../../middleware/validate-request.js";
import { verifyToken } from "../../middleware/verif-token.js";
import * as siswaSchema from "./siswa.request.js";

const route = Router()

route.get('/kelas', verifyToken, siswaService.getKelasBySiswaId);
route.get('/kelas/today', verifyToken, siswaService.getKelasBySiswaIdToday);
route.get('/kelas/:id', kelasService.getKelasById);
route.get('/kelas/:id/materi', siswaService.getMateriOnClass);
route.post('/register/:role_id', validateRequest(usersSchema.createUserSchema), usersService.createUser);
route.get('/kelas/:id/tugas', siswaService.getTugasInKelas);
route.get('/kelas/:id/tugas/:id_tugas', verifyToken, siswaService.getTugasById);
route.post('/kelas/:id/tugas/:id_tugas', validateRequest(siswaSchema.submitTugasSchema), verifyToken, siswaService.submitTugas);
route.get('/kelas/:id/ujian', siswaService.getUjianInKelas);
route.get('/ujian', verifyToken, siswaService.getUjianByKelasSiswa);
route.get('/tugas/today', verifyToken, siswaService.getAllTugas);
route.get('/tugas/:id/statistik', verifyToken, siswaService.getStatisticTugas);
route.get('/kelas/:id/siswa', siswaService.getSiswaInKelas);

export default route