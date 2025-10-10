// links.controller.js
import * as LinksServices from '../services/links.service.js'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function createShortUrl(req, res) {
    const { origin_link, code } = req.body
    if (!origin_link) {
        return res.status(400).json({ message: "No origin link!" })
    }
    const shortLink = await LinksServices.createShortUrl(origin_link, code)
    return res.status(201).json(shortLink)
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function redirectToOriginLink(req, res) {
    const { code } = req.params // http://localhost:3000/myapp/go/${code}
    if (!code) {
        return res.status(400).json({ message: "Short link is invalid!" })
    }
    const short_link = `http://localhost:3000/myapp/go/${code}`
    const origin_link = await LinksServices.getOriginLinkWithShortLink(short_link)
    return res.redirect(302, origin_link) // redirect to the origin URL
}
