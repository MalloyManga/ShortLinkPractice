// links.service.js
import client from "../prisma/prismaClient.js"
import { AppError } from "../utils/AppError.js"
import { nanoid } from 'nanoid'

/**
 * creat short url from origin long url
 * @param {string} originUrl - origin URL
 * @param {string} code - personalized code
 */
export async function createShortUrl(originUrl, code) {
    if (!originUrl.includes('https://')) {
        throw new AppError('Inalid URL!', 400, 'BadRequestError') // bad request
    }
    // check origin URL existence in db
    const originLinkResult = await client.links.findUnique({
        where: {
            origin_link: originUrl
        }
    })

    if (originLinkResult) {
        return originLinkResult.short_link
    }

    let shortLink = ''
    if (code) {
        if (code.includes(' ')) { // check code validation
            // No space in code to avoid space in shortLink
            throw new AppError('Invalid code! NO SPACE!', 400, 'BadRequestError')
        }

        // check code exsitence
        const codeInUse = await client.links.findUnique({
            where: {
                short_link: `https://${code}` // this string shows in forntend UI with v-model
            }
        })
        if (codeInUse) {
            throw new AppError('This code is already in use!', 409, 'ConflictError')
        }

        shortLink = `https://${code}`
    }
    else { // generate a random code
        const randomCode = nanoid()
        shortLink = `https://${randomCode}`
    }

    // write LInkObj in db
    const linkObj = await client.links.create({
        data: {
            origin_link: originUrl,
            short_link: shortLink
        }
    })

    // return short link
    return linkObj.short_link
}