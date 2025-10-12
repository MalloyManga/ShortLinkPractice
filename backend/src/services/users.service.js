// users.service.js
import client from "../prisma/prismaClient.js"
import bcrypt from 'bcrypt'

const saltRounds = 10

export async function userCreate(name, email, password) {
    const cryptedPassword = await bcrypt.hash(password, saltRounds)
    return await client.users.create({
        data: {
            name,
            email,
            password: cryptedPassword
        }
    })
}

/**
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
        }
    })
    const userId = user.id
    const userEmail = user.email
    const verifyResult = await bcrypt.compare(password, user.password)
    return { userId, userEmail, verifyResult }
}