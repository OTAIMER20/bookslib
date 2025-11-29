import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(router)

// global error handler
app.use(errorHandler)

export default app
