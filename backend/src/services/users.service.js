// users.service.js
import client from "../prisma/prismaClient.js";
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