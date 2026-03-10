import express from 'express'
import authRoutes from './Routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './Routes/message.route.js'
import cors from 'cors'

dotenv.config()
const app = express()

//Database Connection
connectDB()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runnig on PORT ${PORT}`)
});
