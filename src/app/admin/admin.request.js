import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const createKelasSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
    description: Joi.string().required().messages(joiGeneralMessage),
    cover: Joi.string().required().messages(joiGeneralMessage),
})

export const addGuruToKelasSchema = Joi.object({
    guruId: Joi.number().required().messages(joiGeneralMessage),
})

export const jadwalKelasSchema = Joi.object({
    dayId: Joi.number().required().messages(joiGeneralMessage),
    startTime: Joi.string().required().messages(joiGeneralMessage),
    endTime: Joi.string().required().messages(joiGeneralMessage),
})