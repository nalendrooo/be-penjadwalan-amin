import { Router } from "express"
// import * as guruSchema from "./guru.request.js"
import * as siswaService from "./siswa.service.js"
import * as usersService from "../users/users.service.js"
import * as usersSchema from "../users/users.request.js"
import * as kelasService from "../kelas/kelas.service.js"
import { validateRequest } from "../../middleware/validate-request.js";
import { verifyToken } from "../../middleware/verif-token.js";

const route = Router()

route.get('/kelas', verifyToken, siswaService.getKelasBySiswaId);
route.get('/kelas/:id', kelasService.getKelasById);
route.get('/kelas/:id/materi', siswaService.getMateriOnClass);
route.post('/register/:role_id', validateRequest(usersSchema.createUserSchema), usersService.createUser);

export default route