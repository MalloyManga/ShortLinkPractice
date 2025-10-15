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
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            const field = error.meta.target[0];
            return res.status(409).json({
                message: `The ${field} is already taken.`
            })
        }
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

    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        message: 'Successfully login!',
        userName,
        userEmail
    })
}