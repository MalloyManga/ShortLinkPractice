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
export const autoAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token

        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

        const verifyResult = await verifyToken(token)

        if (!verifyResult || !verifyResult.payload || !verifyResult.payload.id) {
            return res.status(401).json({ message: "Invalid token" })
        }

        req.userId = BigInt(verifyResult.payload.id)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" })
    }
}