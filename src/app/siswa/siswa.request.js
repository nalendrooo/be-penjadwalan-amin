import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const submitTugasSchema = Joi.object({
    filename: Joi.string().required().messages(joiGeneralMessage),
    original_filename: Joi.string().required().messages(joiGeneralMessage),
    size_file: Joi.number().required().messages(joiGeneralMessage),
    type_file: Joi.string().required().messages(joiGeneralMessage),
})