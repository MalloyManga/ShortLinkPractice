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

export const UpdateUserSchema = z.object({
    currentPassword: z.string().min(1, { error: 'Current password is required' }),
    name: z.string().optional(),
    email: z.email({ error: 'Email address is invalid!' }).optional(),
    newPassword: z.string().min(6, { error: 'New password must be at least 6 characters' }).optional()
}).refine(
    (data) => data.name || data.email || data.newPassword,
    { message: 'At least one field (name, email, or newPassword) must be provided' }
)