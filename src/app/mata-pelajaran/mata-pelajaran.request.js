import Joi from 'joi'

import { joiGeneralMessage } from '../../utils/joi.js'

export const mataPelajaranSchema = Joi.object({
    title: Joi.string().required().messages(joiGeneralMessage),
})