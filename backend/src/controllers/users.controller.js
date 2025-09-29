// users.controller.js
import * as usersServices from '../services/users.service.js'
import bigintHandler from '../utils/bigintHandler.js'


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