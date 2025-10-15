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
    // 1. 从 req.cookies 中读取名为 'auth_token' 的 cookie
    const token = req.cookies.auth_token

    // 2. 检查 token 是否存在
    if (!token) {
        // 如果不存在，抛出错误
        throw new AppError('Login needed!', 401, 'Unauthorized')
    }

    try {
        // 3. 验证 token
        const verifyResult = await verifyToken(token)
        // 4. 将用户信息附加到 req 对象上，供后续路由使用
        req.userId = verifyResult.payload.id
        next()
    } catch (error) {
        // 如果 token 无效或过期，verifyToken 会抛出错误
        throw new AppError('Invalid or expired token.', 401, 'Unauthorized')
    }
}