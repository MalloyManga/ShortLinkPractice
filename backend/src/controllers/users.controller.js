// users.controller.js
import { Prisma } from '@prisma/client'
import * as usersServices from '../services/users.service.js'
import { AppError } from '../utils/AppError.js'
import bigintHandler from '../utils/bigintHandler.js'
import { generateToken } from '../utils/jwtHelper.js'
import { UserSchema, LoginUserSchema, UpdateUserSchema } from '../schemas/user.schema.js'


/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction 
 */


/**
 * Create new user
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function createUser(req, res, next) {
    try {
        const result = UserSchema.safeParse(req.body)

        if (!result.success) {
            const errorMessage = result.error.issues[0].message
            throw new AppError(errorMessage, 400, 'ValidationError')
        }

        const { name, email, password } = result.data
        const newUser = await usersServices.userCreate(name, email, password)

        res.setHeader('Content-Type', 'application/json')
        return res.status(201).send(JSON.stringify(newUser, bigintHandler))
    } catch (error) {
        // Handle unique constraint violation
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            const field = error.meta?.target?.[0] || 'field'
            return res.status(409).json({
                message: `The ${field} is already taken.`
            })
        }

        next(error)
    }
}

/**
 * User login verification
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function userVerifyWhenLogin(req, res, next) {
    try {
        const result = LoginUserSchema.safeParse(req.body)

        if (!result.success) {
            const errorMessage = result.error.issues[0].message
            throw new AppError(errorMessage, 400, 'ValidationError')
        }

        const { emailOrName, password } = result.data
        const { userId, userEmail, userName, verifyResult, stats } = await usersServices.userLogin(emailOrName, password)

        if (!verifyResult) {
            throw new AppError('Invalid credentials', 401, 'UnauthorizedError')
        }

        const token = await generateToken({
            id: String(userId),
        })

        // Set HTTP-only cookie
        const isProduction = process.env.NODE_ENV === 'production'
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            path: '/',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours (匹配 token 过期时间)
        })

        console.log(`[User Login] ${userName} (${userEmail})`)

        return res.status(200).json({
            message: 'Successfully logged in!',
            userName,
            userEmail,
            stats // 添加统计数据
        })
    } catch (error) {
        next(error)
    }
}

/**
 * User logout - clear HTTP-only cookie
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function userLogout(req, res, next) {
    try {
        // 清除 cookie
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/'
        })

        console.log('[User Logout] Cookie cleared')

        return res.status(200).json({
            message: 'Successfully logged out!'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * Get current user profile with statistics
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function getUserProfile(req, res, next) {
    try {
        // req.userId 由 autoAuthMiddleware 设置
        const userId = req.userId
        const profile = await usersServices.getUserProfile(userId)

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(JSON.stringify(profile, bigintHandler))
    } catch (error) {
        next(error)
    }
}

/**
 * Update user profile
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function updateUserProfile(req, res, next) {
    try {
        // 验证请求数据
        const result = UpdateUserSchema.safeParse(req.body)

        if (!result.success) {
            const errorMessage = result.error.issues[0].message
            throw new AppError(errorMessage, 400, 'ValidationError')
        }

        const userId = req.userId
        const { currentPassword, name, email, newPassword } = result.data

        // 调用 service 更新用户信息
        const updatedUser = await usersServices.updateUserProfile(userId, currentPassword, {
            name,
            email,
            newPassword
        })

        console.log(`[Profile Updated] User ID: ${userId}`)

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(JSON.stringify({
            message: 'Profile updated successfully!',
            user: updatedUser
        }, bigintHandler))
    } catch (error) {
        next(error)
    }
}
