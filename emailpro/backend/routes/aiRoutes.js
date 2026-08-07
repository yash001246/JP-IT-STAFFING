import express from 'express'
import { generateEmail } from '../controllers/aiController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/generate-email', protect, generateEmail)

export default router
