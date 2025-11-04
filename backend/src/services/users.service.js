// users.service.js
import client from "../prisma/prismaClient.js"
import bcrypt from 'bcrypt'
import { AppError } from "../utils/AppError.js"

const saltRounds = 10

/**
 * Create new user
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
export async function userCreate(name, email, password) {
    // Validate password strength
    if (password.length < 6) {
        throw new AppError('Password must be at least 6 characters long', 400, 'ValidationError')
    }

    const cryptedPassword = await bcrypt.hash(password, saltRounds)

    const user = await client.users.create({
        data: {
            name,
            email,
            password: cryptedPassword
        }
    })

    console.log(`[User Created] ${name} (${email})`)

    return user
}

/**
 * User login
 * @param {string} emailOrName 
 * @param {string} password 
 */
export async function userLogin(emailOrName, password) {
    const user = await client.users.findFirst({
        where: {
            OR: [
                { email: emailOrName },
                { name: emailOrName }
            ]
        },
        include: {
            links: {
                select: {
                    id: true,
                    clicks: true
                }
            }
        }
    })

    if (!user) {
        // Return false but don't reveal if user exists
        return { verifyResult: false }
    }

    const userId = user.id
    const userName = user.name
    const userEmail = user.email
    const verifyResult = await bcrypt.compare(password, user.password)

    // 计算统计数据
    const totalLinks = user.links.length
    const totalClicks = user.links.reduce((sum, link) => sum + link.clicks, 0)

    return { 
        userId, 
        userEmail, 
        userName, 
        verifyResult,
        stats: {
            totalLinks,
            totalClicks
        }
    }
}

/**
 * Get user profile with statistics
 * @param {bigint} userId 
 */
export async function getUserProfile(userId) {
    const user = await client.users.findUnique({
        where: {
            id: userId // userId 已经是 BigInt 类型，不需要再转换
        },
        select: {
            id: true,
            name: true,
            email: true,
            links: {
                select: {
                    id: true,
                    clicks: true
                }
            }
        }
    })

    if (!user) {
        throw new AppError('User not found', 404, 'NotFoundError')
    }

    // 计算统计数据
    const totalLinks = user.links.length
    const totalClicks = user.links.reduce((sum, link) => sum + link.clicks, 0)

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        stats: {
            totalLinks,
            totalClicks
        }
    }
}
