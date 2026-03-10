import express from 'express'
import authRoutes from './Routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

//Database Connection
connectDB()

//Middleware
app.use(express.json())
app.use(cookieParser())

//API Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runnig on PORT ${PORT}`)
});
