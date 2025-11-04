// autoAuth.service.js
import client from "../prisma/prismaClient.js"
import { AppError } from "../utils/AppError.js"

/**
 * Auto authenticate user by ID
 * @param {bigint} userId
 * @returns {Promise<{name: string, email: string, stats: {totalLinks: number, totalClicks: number}}>}
 */
export async function userAutoAuth(userId) {
    const user = await client.users.findUnique({
        where: {
            id: userId
        },
        select: {
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
        name: user.name,
        email: user.email,
        stats: {
            totalLinks,
            totalClicks
        }
    }
}
