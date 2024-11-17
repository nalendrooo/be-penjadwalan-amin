import { Router } from "express"
import * as usersSchema from "../users/users.request.js"
import * as usersService from "../users/users.service.js"
import { validateRequest } from "../../middleware/validate-request.js";
import { verifyToken } from "../../middleware/verif-token.js";

const route = Router()

route.post('/login', validateRequest(usersSchema.loginUserSchema), usersService.loginUser);
route.get('/profile', verifyToken, usersService.getProfile);


export default route    
