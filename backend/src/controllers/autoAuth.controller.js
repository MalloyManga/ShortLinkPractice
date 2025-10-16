// autoAuth.controller.js
import * as usersServices from '../services/autoAuth.service.js'

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function userAutoAuth(req, res) {
    const userId = req.userId
    try {
        const { name, email } = await usersServices.userAutoAuth(userId)
        return res.status(200).json({
            name,
            email
        })
    } catch (error) {
        throw new AppError('Cookie not found!', 404, 'AuthorizationError')
    }
}