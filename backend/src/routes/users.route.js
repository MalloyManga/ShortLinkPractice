// users.route.js
import { Router } from "express"
import {
    createUser,
    userVerifyWhenLogin,
    userLogout
} from "../controllers/users.controller.js"

const router = Router()

router.route('/signup')
    .post(createUser)
    
router.route('/signin')
    .post(userVerifyWhenLogin)

router.route('/signout')
    .post(userLogout)

export default router