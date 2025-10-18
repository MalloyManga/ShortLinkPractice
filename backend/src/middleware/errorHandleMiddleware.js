// errorHandleMiddleware.js
import { AppError } from '../utils/AppError.js'

/**
 * @typedef {import ('express').Request} Request
 * @typedef {import ('express').Response} Response
 * @typedef {import ('express').NextFunction} NextFunction
 */


/**
 * 
 * @param {Error} err
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const errorHandleMiddleware = (err, req, res, next) => {
    console.error(err.stack)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal Server Error' })
}