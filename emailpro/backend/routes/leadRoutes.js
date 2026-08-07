import express from 'express'
import { getLeads, createLead, updateLead, deleteLead, uploadCSV } from '../controllers/leadController.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.use(protect)
router.get('/', getLeads)
router.post('/', createLead)
router.patch('/:id', updateLead)
router.delete('/:id', deleteLead)
router.post('/upload-csv', upload.single('file'), uploadCSV)

export default router
