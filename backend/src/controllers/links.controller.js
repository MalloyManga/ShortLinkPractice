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
    const shortLink = await LinksServices.createShortUrl(origin_link, code)
    return res.status(200).json(shortLink)
}