// users.controller.js
import * as usersServices from '../services/users.service.js'
import { AppError } from '../utils/AppError.js'
import bigintHandler from '../utils/bigintHandler.js'
import { generateToken } from '../utils/jwtHelper.js'


/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction 
 */


/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function createUser(req, res, next) {
    try {
        const { name, email, password } = req.body
        const newUser = await usersServices.userCreate(name, email, password)
        res.setHeader('Content-Type', 'application/json')
        return res.status(201).send(JSON.stringify(newUser, bigintHandler))
    } catch (error) {
        // --- 优雅地处理唯一性冲突 ---
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            // P2002 是 Prisma 中唯一约束失败的错误代码
            // error.meta.target 包含了冲突的字段，例如 ['email']
            const field = error.meta.target[0];
            return res.status(409).json({
                message: `The ${field} is already taken.`
            })
        }
        // 对于其他未知错误，交给全局错误处理器
        next(error)
    }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function userVerifyWhenLogin(req, res) {
    const { emailOrName, password } = req.body
    const { userId, userEmail, userName, verifyResult } = await usersServices.userLogin(emailOrName, password)
    if (!verifyResult) {
        throw new AppError('Invalid credentials', 401, 'UnauthorizedError')
    }
    const token = await generateToken({
        id: String(userId),
    })

    // 1. 将 token 设置到 HttpOnly Cookie 中
    res.cookie('auth_token', token, {
        httpOnly: true, // 核心！JS 无法读取此 cookie
        secure: process.env.NODE_ENV === 'production', // 在生产环境中只通过 HTTPS 发送
        sameSite: 'strict', // 'strict' 或 'lax'，增强 CSRF 防护
        path: '/', // 整个网站都可用
        maxAge: 24 * 60 * 60 * 1000 // 设置过期时间，例如 24 小时
    })

    // 2. 返回的 JSON 中不再需要包含 token
    return res.status(200).json({
        message: 'Successfully login!',
        userName,
        userEmail
    })
}