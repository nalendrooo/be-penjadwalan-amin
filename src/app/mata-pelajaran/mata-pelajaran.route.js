import { Router } from "express"
import * as mataPelajaranSchema from "../mata-pelajaran/mata-pelajaran.request.js"
import * as mataPelajaranService from "../mata-pelajaran/mata-pelajaran.service.js"
import { validateRequest } from "../../middleware/validate-request.js";

const route = Router()

route.get('/', mataPelajaranService.getMataPelajaran);
route.get('/statistik', mataPelajaranService.getMataPelajaranStatistik);
route.post('/', validateRequest(mataPelajaranSchema.mataPelajaranSchema), mataPelajaranService.createMataPelajaran);
route.delete('/:id', mataPelajaranService.deleteMataPelajaran);
route.patch('/:id', validateRequest(mataPelajaranSchema.mataPelajaranSchema), mataPelajaranService.updateMataPelajaran);

export default route    
