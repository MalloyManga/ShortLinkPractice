// links.controller.js
import * as LinksServices from '../services/links.service.js'
import { LinkSchema } from '../schemas/link.schema.js'
import { AppError } from '../utils/AppError.js'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Create short URL
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function createShortUrl(req, res, next) {
    try {
        const result = LinkSchema.safeParse(req.body)

        if (!result.success) {
            const errorMessage = result.error.issues[0].message
            throw new AppError(errorMessage, 400, 'BadRequestError')
        }

        const { origin_link, code } = result.data
        const userId = req.userId

        const { shortLink, message } = await LinksServices.createShortUrl(origin_link, code, userId)

        return res.status(201).json({
            shortLink,
            message
        })
    } catch (error) {
        next(error)
    }
}

/**
 * Redirect to origin link
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
export async function redirectToOriginLink(req, res, next) {
    try {
        const { code } = req.params

        if (!code) {
            throw new AppError('Short link code is required!', 400, 'BadRequestError')
        }

        const short_link = `${BASE_URL}/myapp/go/${code}`
        const origin_link = await LinksServices.getOriginLinkWithShortLink(short_link)

        return res.redirect(302, origin_link)
    } catch (error) {
        next(error)
    }
}

