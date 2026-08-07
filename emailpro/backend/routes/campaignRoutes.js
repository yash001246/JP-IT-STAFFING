import express from 'express'
import { getCampaigns, getCampaign, createCampaign, updateCampaign, deleteCampaign } from '../controllers/campaignController.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.use(protect)
router.get('/', getCampaigns)
router.get('/:id', getCampaign)
router.post('/', upload.single('attachment'), createCampaign)
router.patch('/:id', updateCampaign)
router.delete('/:id', deleteCampaign)

export default router
