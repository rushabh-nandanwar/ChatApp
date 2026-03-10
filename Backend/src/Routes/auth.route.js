//Auth Routes

import express from 'express'
import { signup, logout, login, updateProfile, checkAuth } from '../Controllers/auth.controller.js'
import { protectRoute } from '../Middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/logout', logout)
router.post('/login', login)

router.put('/update-profile', protectRoute, updateProfile)

router.get('/check-auth', protectRoute, checkAuth)

export default router;