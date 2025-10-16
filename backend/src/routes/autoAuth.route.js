// autoAuth.route.js
import { Router } from "express"
import {
    userAutoAuth
} from '../controllers/autoAuth.controller.js'

const router = Router()

router.route('/')
    .get(userAutoAuth)

export default router