// jwtHelper.js
import * as jose from 'jose'
import { AppError } from './AppError.js'

const JWT_SECRET_KTY = process.env.JWT_SECRET_KTY
const secret = new TextEncoder().encode(JWT_SECRET_KTY)
const alg = 'HS256'

export async function generateToken(data) {
    const token = await new jose.SignJWT(data)
        .setProtectedHeader({ alg })
        .setExpirationTime('24h') // Token 过期的时间 token存储在cookie当中
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
