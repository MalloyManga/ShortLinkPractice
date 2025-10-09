// links.route.js
import { Router } from "express"
import {
    createShortUrl
} from '../controllers/links.controller.js'

const route = Router()

route.route('/short-links')
    .post(createShortUrl)

export default route