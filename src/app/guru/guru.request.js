import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const createMateriSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
    description: Joi.string().required().messages(joiGeneralMessage),
    filename: Joi.string().required().messages(joiGeneralMessage),
    original_filename: Joi.string().required().messages(joiGeneralMessage),
    size_file: Joi.number().required().messages(joiGeneralMessage),
    type_file: Joi.string().required().messages(joiGeneralMessage),
})

export const addSiswaToKelasSchema = Joi.object({
    siswaIds: Joi.array().required().messages(joiGeneralMessage),
})

export const updateNilaiTugasSiswaSchema = Joi.object({
    id: Joi.number().required().messages(joiGeneralMessage),
    nilai: Joi.number().required().messages(joiGeneralMessage),
})

export const updateCommentTugasSiswaSchema = Joi.object({
    id: Joi.number().required().messages(joiGeneralMessage),
    comment: Joi.string().required().messages(joiGeneralMessage),
})

export const createTugasSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
    description: Joi.string().required().messages(joiGeneralMessage),
    filename: Joi.string().required().messages(joiGeneralMessage),
    original_filename: Joi.string().required().messages(joiGeneralMessage),
    size_file: Joi.number().required().messages(joiGeneralMessage),
    type_file: Joi.string().required().messages(joiGeneralMessage),
    deadlineAt: Joi.date().required().messages(joiGeneralMessage),
})

export const createUjianSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
    description: Joi.string().required().messages(joiGeneralMessage),
    // filename: Joi.string().required().messages(joiGeneralMessage),
    // original_filename: Joi.string().required().messages(joiGeneralMessage),
    // size_file: Joi.number().required().messages(joiGeneralMessage),
    // type_file: Joi.string().required().messages(joiGeneralMessage),
    type: Joi.string().required().messages(joiGeneralMessage),
    dateTime: Joi.string().required().messages(joiGeneralMessage),
    startTime: Joi.string().required().messages(joiGeneralMessage),
    endTime: Joi.string().required().messages(joiGeneralMessage),
})