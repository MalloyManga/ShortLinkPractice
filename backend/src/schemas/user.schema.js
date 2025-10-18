// user.schema.js
import z from "zod"

export const UserSchema = z.object({
    name: z.string(),
    email: z.email({ error: 'Email address is invalid!' }),
    password: z.string().min(8, { error: 'Password is invalid!' })
})

export const LoginUserSchema = z.object({
    emailOrName: z.string(),
    password: z.string({ error: 'Incorrect password!' })
})