// users.route.js
import { Router } from "express"
import {
    createUser,
    userVerifyWhenLogin,
    userLogout,
    getUserProfile,
    updateUserProfile
} from "../controllers/users.controller.js"
import { autoAuthMiddleware } from "../middleware/autoAuthMiddleware.js"

const router = Router()

router.route('/signup')
    .post(createUser)

router.route('/signin')
    .post(userVerifyWhenLogin)

router.route('/signout')
    .post(userLogout)

// 需要认证的路由
router.route('/profile')
    .get(autoAuthMiddleware, getUserProfile)
    .put(autoAuthMiddleware, updateUserProfile)

export default router