import { Router } from "express"
import * as backdoorService from "./backdoor.service.js"

const route = Router()

route.post('/seed', backdoorService.sendSeed)

export default route    
