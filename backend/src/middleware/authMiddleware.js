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
    const token = req.cookies.auth_token

    if (!token) {
        throw new AppError('Login needed!', 401, 'Unauthorized')
    }

    try {
        const verifyResult = await verifyToken(token)
        req.userId = BigInt(verifyResult.payload.id)
        next()
    } catch (error) {
        // 如果 token 无效或过期，verifyToken 会抛出错误
        throw new AppError('Invalid or expired token.', 401, 'Unauthorized')
    }
}