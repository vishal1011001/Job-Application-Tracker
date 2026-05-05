import { getAllJobs, createJob, updateJob, deleteJob } from '../Models/Jobs.js';

const retrieveJob = async (req,res) => {
  const data = await getAllJobs(req.user.id);
  res.status(200).json(data);
}

const postJob = async (req,res) => {
  const jobObj = req.body;
  await createJob(jobObj, req.user.id);
  res.status(201).json(await getAllJobs(req.user.id));
}

const putJob = async (req,res) => {
  const id = req.params.id;
  const jobObj = req.body;
  await updateJob(id, jobObj);
  res.status(200).json(await getAllJobs(req.user.id));
}

const removeJob = async (req,res) => {
  const id = req.params.id;
  await deleteJob(id);
  console.log("Deleted", id);
  res.status(200).json(await getAllJobs(req.user.id));
}

export {retrieveJob, postJob, putJob, removeJob};