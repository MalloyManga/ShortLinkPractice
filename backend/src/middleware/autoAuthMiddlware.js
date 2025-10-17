// autoAuthMiddlware.js
import { verifyToken } from '../utils/jwtHelper.js'

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
export const autoAuthMiddlware = async (req, _res, next) => {
    const token = req.cookies.auth_token
    const verifyResult = await verifyToken(token)
    req.userId = BigInt(verifyResult.payload.id)
    next()
}