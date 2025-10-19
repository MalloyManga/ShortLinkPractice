import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoute from './routes/users.route.js'
import linksRoute from './routes/links.route.js'
import autoAuthRoute from './routes/autoAuth.route.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { autoAuthMiddlware } from './middleware/autoAuthMiddlware.js'
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware.js'
import { rateLimit } from 'express-rate-limit'

const app = express()
const limiter = rateLimit({
    windowMs: 15 * 1000 * 60,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests! Please wait some time!'
})

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))
app.use(limiter)

app.use(express.json())

app.use(cookieParser())

app.use('/users', usersRoute)
app.use('/auto-auth', autoAuthMiddlware, autoAuthRoute)

app.use(authMiddleware)
app.use('/', linksRoute)

app.use(errorHandleMiddleware)

export default app