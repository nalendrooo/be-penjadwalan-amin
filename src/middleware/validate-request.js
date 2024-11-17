import { cleanJoiErrorMessage } from "../utils/joi.js"

export const validateRequest =
    (schema) =>
        (request, response, next) => {
            const { error } = schema.validate(request.body)
            if (error) {
                // ResponseHandler.badRequest(next, cleanJoiErrorMessage(error))
                response.status(400).json({
                    status: 'error',
                    message: cleanJoiErrorMessage(error)
                })
                return
            }
            next()
        }