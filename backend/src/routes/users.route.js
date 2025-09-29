// users.route.js
import { Router } from "express"
import {
    createUser,
} from "../controllers/users.controller.js"

const router = Router()

router.route('/signup')
    .post(createUser)


export default router