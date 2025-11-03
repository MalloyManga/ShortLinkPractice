// autoAuth.controller.js
import * as usersServices from '../services/autoAuth.service.js'

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function userAutoAuth(req, res) {
    const userId = req.userId
    const { name, email, stats } = await usersServices.userAutoAuth(userId)
    return res.status(200).json({
        name,
        email,
        stats
    })
}