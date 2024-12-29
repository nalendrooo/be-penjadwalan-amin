import { Router } from "express";
import * as dayService from "./day.service.js"

 const route = Router()

route.get('/', dayService.getDays   )

export default route