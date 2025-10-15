import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoute from './routes/users.route.js'
import linksRoute from './routes/links.route.js'
import { authMiddleware } from './middleware/authMiddleware.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use('/users', usersRoute)
app.use(authMiddleware)
app.use('/', linksRoute)

export default app