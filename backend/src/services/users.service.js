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

/**
 * Update user profile
 * @param {bigint} userId 
 * @param {string} currentPassword - 当前密码（用于验证身份）
 * @param {Object} updates - 更新的字段
 * @param {string} [updates.name] - 新用户名
 * @param {string} [updates.email] - 新邮箱
 * @param {string} [updates.newPassword] - 新密码
 */
export async function updateUserProfile(userId, currentPassword, updates) {
    console.log('[updateUserProfile] Starting update for userId:', userId)
    console.log('[updateUserProfile] Updates requested:', {
        hasName: !!updates.name,
        hasEmail: !!updates.email,
        hasNewPassword: !!updates.newPassword
    })

    // 1. 查找用户并验证当前密码
    const user = await client.users.findUnique({
        where: { id: userId }
    })

    if (!user) {
        throw new AppError('User not found', 404, 'NotFoundError')
    }

    console.log('[updateUserProfile] User found:', user.name)

    // 2. 验证当前密码
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    console.log('[updateUserProfile] Password validation result:', isPasswordValid)

    if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401, 'UnauthorizedError')
    }

    // 3. 检查是否至少有一项更新
    if (!updates.name && !updates.email && !updates.newPassword) {
        throw new AppError('At least one field must be updated', 400, 'ValidationError')
    }

    // 4. 准备更新数据
    const updateData = {}

    if (updates.name) {
        // 检查用户名是否已被占用
        const existingUser = await client.users.findFirst({
            where: {
                name: updates.name,
                NOT: { id: userId }
            }
        })
        if (existingUser) {
            throw new AppError('Username is already taken', 409, 'ConflictError')
        }
        updateData.name = updates.name
        console.log('[updateUserProfile] Will update name to:', updates.name)
    }

    if (updates.email) {
        // 检查邮箱是否已被占用
        const existingUser = await client.users.findFirst({
            where: {
                email: updates.email,
                NOT: { id: userId }
            }
        })
        if (existingUser) {
            throw new AppError('Email is already taken', 409, 'ConflictError')
        }
        updateData.email = updates.email
        console.log('[updateUserProfile] Will update email to:', updates.email)
    }

    if (updates.newPassword) {
        // 验证新密码强度
        if (updates.newPassword.length < 6) {
            throw new AppError('New password must be at least 6 characters long', 400, 'ValidationError')
        }
        updateData.password = await bcrypt.hash(updates.newPassword, saltRounds)
        console.log('[updateUserProfile] Will update password (hashed)')
    }

    console.log('[updateUserProfile] Executing update with data:', Object.keys(updateData))

    // 5. 执行更新
    const updatedUser = await client.users.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    console.log(`[User Updated] ${updatedUser.name} (${updatedUser.email})`)

    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email
    }
}
