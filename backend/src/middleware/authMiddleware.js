// authMiddleware.js
import { AppError } from "../utils/AppError.js"
import { verifyToken } from "../utils/jwtHelper.js"

/**
 * @typedef {import ('express').Request} Request
 * @typedef {import ('express').Response} Response
 * @typedef {import ('express').NextFunction} NextFunction
 */

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const authMiddleware = async (req, _res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        throw new AppError('Login needed!', 401, 'Unauthorized')
    }
    const token = authorization.split(' ')[1]
    const verifyResult = await verifyToken(token)
    req.user = verifyResult.payload.id
    next()
}