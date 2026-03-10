import express from 'express'
import { protectRoute } from '../Middleware/auth.middleware.js'
import { getUserForSidebar, getMessages, sendMessage } from '../Controllers/messages.controller.js'

const router = express.Router()

router.get('/users', protectRoute, getUserForSidebar)

router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)

export default router;