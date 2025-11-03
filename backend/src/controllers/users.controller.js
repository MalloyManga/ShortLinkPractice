// users.controller.js
import { Prisma } from '@prisma/client'
import * as usersServices from '../services/users.service.js'
import { AppError } from '../utils/AppError.js'
import bigintHandler from '../utils/bigintHandler.js'
import { generateToken } from '../utils/jwtHelper.js'
import { UserSchema, LoginUserSchema } from '../schemas/user.schema.js'


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
        const { userId, userEmail, userName, verifyResult } = await usersServices.userLogin(emailOrName, password)

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
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })

        console.log(`[User Login] ${userName} (${userEmail})`)

        return res.status(200).json({
            message: 'Successfully logged in!',
            userName,
            userEmail
        })
    } catch (error) {
        next(error)
    }
}
