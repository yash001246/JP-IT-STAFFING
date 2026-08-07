import express from 'express'
import { getApiKey, rotateApiKey, getTeam, inviteMember, testSMTP } from '../controllers/settingsController.js'
import { protect, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)
router.get('/api-key', getApiKey)
router.post('/api-key/rotate', rotateApiKey)
router.get('/test-smtp', testSMTP)
router.get('/team', getTeam)
router.post('/team/invite', requireRole('Owner', 'Admin'), inviteMember)

export default router
