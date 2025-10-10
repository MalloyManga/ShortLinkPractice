// links.route.js
import { Router } from "express"
import {
    createShortUrl,
    redirectToOriginLink
} from '../controllers/links.controller.js'

const route = Router()

route.route('/myapp/short-links')
    .post(createShortUrl)
route.route('/myapp/go/:code')
    .get(redirectToOriginLink)
export default route