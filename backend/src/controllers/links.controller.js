// links.controller.js
import * as LinksServices from '../services/links.service.js'
import { LinkSchema } from '../schemas/link.schema.js'
import { AppError } from '../utils/AppError.js'

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
export async function createShortUrl(req, res, next) {
    try {
        const result = LinkSchema.safeParse(req.body)

        if (!result.success) {
            const errorMessage = result.error.issues[0].message
            throw new AppError(errorMessage, 400, 'BadRequestError')
        }

        const { origin_link, code } = result.data
        const userId = req.userId
        if (!origin_link) {
            return res.status(400).json({ message: "No origin link!" })
        }
        const { shortLink, message } = await LinksServices.createShortUrl(origin_link, code, userId)
        const results = {
            shortLink,
            message
        }
        return res.status(201).json(results)
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function redirectToOriginLink(req, res) {
    const { code } = req.params
    if (!code) {
        return res.status(400).json({ message: "Short link is invalid!" })
    }
    const short_link = `http://localhost:3000/myapp/go/${code}`
    const origin_link = await LinksServices.getOriginLinkWithShortLink(short_link)
    return res.redirect(302, origin_link) // redirect to the origin URL
}
