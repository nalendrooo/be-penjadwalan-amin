import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const createUserSchema = Joi.object({
    email: Joi.string().email().required().messages(joiGeneralMessage),
    password: Joi.string().required().min(8).max(12).messages(joiGeneralMessage),
    nis: Joi.string().messages(joiGeneralMessage),
    nama: Joi.string().required().messages(joiGeneralMessage),
    telephone: Joi.string().required().messages(joiGeneralMessage),
})

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages(joiGeneralMessage),
    password: Joi.string().required().min(8).max(12).messages(joiGeneralMessage),
})