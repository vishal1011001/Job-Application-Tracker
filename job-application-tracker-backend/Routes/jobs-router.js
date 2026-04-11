import express from 'express';
import {retrieveJob, postJob, putJob, removeJob} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/jobs', protect, retrieveJob);

router.post('/jobs', protect, postJob);

router.put('/jobs/:id', protect, putJob);

router.delete('/jobs/:id', protect, removeJob);

export default router;