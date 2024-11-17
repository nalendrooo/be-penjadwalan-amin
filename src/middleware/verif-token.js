import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {

    // const refreshToken = req.cookies

    // console.log(refreshToken)
    // if (req.headers?.cookie == null) {
    //     return res
    //         .status(401)
    //         .json({
    //             status: 'error', error: {
    //                 code: ERROR_CODE.UNAUTHORIZED.code,
    //                 message: 'Unauthorized',
    //             }
    //         })
    // }

    // req.headers?.cookie?.split(';').forEach((cookie) => {
    //     const [key, value] = cookie.split('=')
    //     if (key === 'accessToken') {
    //         req.cookies = { accessToken: value }
    //     }
    // })

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    // console.log('authHeader', authHeader);
    // console.log('token', token);
    // console.log('token', token)
    // const token = req.cookies.accessToken
    if (token == null) {
        return res
            .status(401)
            .json({
                status: 'error',
                message: 'Unauthorized',
            })
    }

    const secret = process.env.ACCESS_TOKEN || ''


    jwt.verify(token, secret, async (err, decoded) => {
        // console.log(err)
        if (err) {
            return res
                .status(403)
                .json({
                    status: 'error',
                    message: 'Forbidden',
                })
        }

        // const cekSession = await userRepository.getAccessToken(decoded.id)
        // console.log('session;,', cekSession)
        // if (!cekSession) {
        //     return res
        //         .status(401)
        //         .json({
        //             status: 'error', error: {
        //                 code: ERROR_CODE.UNAUTHORIZED.code,
        //                 message: 'Unauthorized',
        //             }
        //         })
        // }

        req.body.user = { ...decoded, ...req.body }
        next()
    })
}