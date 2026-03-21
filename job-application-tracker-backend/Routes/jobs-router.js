import express from 'express';
import {retrieveJob, postJob, putJob, removeJob} from '../controllers/jobController.js';

const router = express.Router();

router.get('/jobs', retrieveJob);

router.post('/jobs', postJob);

router.put('/jobs/:id', putJob);

router.delete('/jobs/:id', removeJob);

export default router;