// links.service.js
import client from "../prisma/prismaClient.js"
import { AppError } from "../utils/AppError.js"
import { nanoid } from 'nanoid'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

/**
 * Validate URL format
 * @param {string} url 
 * @returns {boolean}
 */
function isValidUrl(url) {
    try {
        const urlObj = new URL(url)
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
        return false
    }
}

/**
 * Create short url from origin long url
 * @param {string} originUrl - origin URL
 * @param {string} code - personalized code
 * @param {bigint} userId
 */
export async function createShortUrl(originUrl, code, userId) {
    // Validate URL
    if (!isValidUrl(originUrl)) {
        throw new AppError('Invalid URL! Please provide a valid http:// or https:// URL', 400, 'BadRequestError')
    }

    // Check if origin URL already exists in db
    const originLinkResult = await client.links.findUnique({
        where: {
            origin_link: originUrl
        }
    })

    if (originLinkResult) {
        return {
            shortLink: originLinkResult.short_link,
            message: 'Short link already exists for this URL!'
        }
    }

    let shortLink = ''

    if (code) {
        // Validate code format
        if (/\s/.test(code)) {
            throw new AppError('Invalid code! Spaces are not allowed', 400, 'BadRequestError')
        }

        if (code.length < 3 || code.length > 50) {
            throw new AppError('Code must be between 3 and 50 characters', 400, 'BadRequestError')
        }

        // Check if code is already in use
        shortLink = `${BASE_URL}/myapp/go/${code}`
        const codeInUse = await client.links.findUnique({
            where: {
                short_link: shortLink
            }
        })

        if (codeInUse) {
            throw new AppError('This code is already in use!', 409, 'ConflictError')
        }
    } else {
        // Generate a random code
        const randomCode = nanoid(8) // 8 characters, more compact
        shortLink = `${BASE_URL}/myapp/go/${randomCode}`
    }

    // Create link in database
    const linkObj = await client.links.create({
        data: {
            origin_link: originUrl,
            short_link: shortLink,
            hostId: userId
        }
    })

    console.log(`[Link Created] ${originUrl} -> ${shortLink} (User: ${userId})`)

    return {
        shortLink: linkObj.short_link,
        message: 'Short link created successfully!'
    }
}

/**
 * Get origin link using short link and increment click counter
 * @param {string} shortLink
 */
export async function getOriginLinkWithShortLink(shortLink) {
    if (!shortLink) {
        throw new AppError('Short link is required!', 400, 'BadRequestError')
    }

    const linkObj = await client.links.findUnique({
        where: {
            short_link: shortLink
        }
    })

    if (!linkObj) {
        throw new AppError('Short link not found!', 404, 'NotFoundError')
    }

    // 异步增加点击计数，不阻塞重定向
    client.links.update({
        where: {
            short_link: shortLink
        },
        data: {
            clicks: {
                increment: 1
            }
        }
    }).catch(error => {
        console.error(`[Click Count Error] Failed to increment clicks for ${shortLink}:`, error)
    })

    console.log(`[Link Redirected] ${shortLink} -> ${linkObj.origin_link} (Clicks: ${linkObj.clicks + 1})`)

    return linkObj.origin_link
}
