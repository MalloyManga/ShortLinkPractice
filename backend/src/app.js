import express from 'express'
import cors from 'cors'
import usersRoute from './routes/users.route.js'
import { authMiddleware } from './middleware/authMiddleware.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', usersRoute)
app.use(authMiddleware)

export default app