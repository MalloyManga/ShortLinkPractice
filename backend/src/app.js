import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoute from './routes/users.route.js'
import linksRoute from './routes/links.route.js'
import autoAuthRoute from './routes/autoAuth.route.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { autoAuthMiddlware } from './middleware/autoAuthMiddlware.js'
import { errorHandleMiddleware } from './middleware/errorHandleMiddleware.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use('/users', usersRoute)
app.use('/auto-auth', autoAuthMiddlware, autoAuthRoute)

app.use(authMiddleware)
app.use('/', linksRoute)

app.use(errorHandleMiddleware)

export default app