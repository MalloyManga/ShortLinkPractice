// jwtHelper.js
import * as jose from 'jose'
import { AppError } from './AppError.js'

const JWT_SECRET_KTY = process.env.JWT_SECRET_KTY
const secret = new TextEncoder().encode(JWT_SECRET_KTY)
const alg = 'HS256'

export async function generateToken(data) {
    const token = await new jose.SignJWT(data)
        .setProtectedHeader({ alg })
        .setExpirationTime('2h') // 改为2小时，更安全合理
        .sign(secret)
    return token
}

export async function verifyToken(token) {
    try {
        const result = await jose.jwtVerify(token, secret)
        return result
    } catch (error) {
        throw new AppError('NoToken or token is invalid!', 401, 'UnauthorizedError')
    }
}
