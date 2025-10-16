// autoAuth.service.js
import client from "../prisma/prismaClient.js"

/**
 * 
 * @param {bigint} userId
 */
export async function userAutoAuth(userId) {
    const user = await client.users.findUnique({
        where: {
            id: userId
        }
    })
    const name = user.id
    const email = user.email
    return {
        name,
        email
    }
}