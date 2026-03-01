import express from 'express';
import { getAllJobs, createJob, updateJob, deleteJob } from '../Models/Jobs.js';
import { getAllNotes } from '../../../../temp-notes/notes-app-project/notes-app-backend/models/Note.js';

const router = express.Router();

router.get('/jobs', async (req,res) => {
  const data = await getAllJobs();
  res.status(200).json(data);
});

router.post('/jobs', async (req,res) => {
  const jobObj = req.body;
  await createJob(jobObj);
  res.status(201).json(await getAllJobs());
});

router.put('/jobs/:id', async (req,res) => {
  const id = req.params.id;
  const jobObj = req.body;
  await updateJob(id, jobObj);
  res.status(200).json(await getAllJobs());
});

router.delete('/jobs/:id', async (req,res) => {
  const id = req.params.id;
  await deleteJob(id);
  res.status(200).json(await getAllJobs());
})

export default router;