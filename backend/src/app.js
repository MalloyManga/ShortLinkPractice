import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoute from './routes/users.route.js'
import linksRoute from './routes/links.route.js'
import autoAuthRoute from './routes/autoAuth.route.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { autoAuthMiddleware } from './middleware/autoAuthMiddleware.js'
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware.js'
import { requestLogger } from './middleware/requestLogger.js'
import { rateLimit } from 'express-rate-limit'

const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Increased for better UX
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

// CORS configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001'
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(limiter)
app.use(express.json())
app.use(cookieParser())

// Request logging (only in development)
if (process.env.NODE_ENV === 'development') {
    app.use(requestLogger)
}

// Routes
app.use('/users', usersRoute)
app.use('/auto-auth', autoAuthMiddleware, autoAuthRoute)

// Protected routes
app.use(authMiddleware)
app.use('/', linksRoute)

// Error handling
app.use(errorHandleMiddleware)

export default app
