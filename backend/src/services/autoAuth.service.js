// autoAuth.service.js
import client from "../prisma/prismaClient.js"
import { AppError } from "../utils/AppError.js"

/**
 * Auto authenticate user by ID
 * @param {bigint} userId
 * @returns {Promise<{name: string, email: string}>}
 */
export async function userAutoAuth(userId) {
    const user = await client.users.findUnique({
        where: {
            id: userId
        },
        select: {
            name: true,
            email: true
        }
    })

    if (!user) {
        throw new AppError('User not found', 404, 'NotFoundError')
    }

    return {
        name: user.name,
        email: user.email
    }
}
