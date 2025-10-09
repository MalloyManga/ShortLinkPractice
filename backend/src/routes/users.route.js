// users.route.js
import { Router } from "express"
import {
    createUser,
    userVerifyWhenLogin
} from "../controllers/users.controller.js"

const router = Router()

router.route('/signup')
    .post(createUser)
    
router.route('/signin')
    .post(userVerifyWhenLogin)

export default router