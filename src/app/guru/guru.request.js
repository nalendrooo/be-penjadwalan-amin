import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const createMateriSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
    description: Joi.string().required().messages(joiGeneralMessage),
    filename: Joi.string().required().messages(joiGeneralMessage),
})

export const addSiswaToKelasSchema = Joi.object({
    siswaIds: Joi.array().required().messages(joiGeneralMessage),
})