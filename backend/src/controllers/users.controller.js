// users.controller.js
import * as usersServices from '../services/users.service.js'
import { AppError } from '../utils/AppError.js'
import bigintHandler from '../utils/bigintHandler.js'
import { generateToken } from '../utils/jwtHelper.js'


/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */


/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function createUser(req, res) {
    const { name, email, password } = req.body
    const newUser = await usersServices.userCreate(name, email, password)
    res.setHeader('Content-Type', 'application/json')
    return res.status(201).send(JSON.stringify(newUser, bigintHandler))
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function userVerifyWhenLogin(req, res) {
    const { emailOrName, password } = req.body
    const { userId, verifyResult } = await usersServices.userLogin(emailOrName, password)
    if (!verifyResult) {
        throw new AppError('Email or name is uncorrect!', 401, 'UnauthorizedError')
    }
    const token = await generateToken({
        id: String(userId),
    })
    return res.status(200).json({
        message: 'Successfully login!',
        token
    })
}