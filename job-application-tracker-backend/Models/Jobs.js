import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  userID: { type: String, required: true },
  jobTitle: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  jobType: { type: String, required: true },
  location: { type: String, required: true },
  locType: { type: String, required: true },
  appliedOn: { type: Date },
  status: { type: Boolean, required: true },
  levelReached: { type: String, required: true },
  salary: { type: Number }
});

//model
const jobModel = mongoose.model("Job", jobSchema);

const createJob = async (jobObj) => {
  try {
    const j = {
      jobTitle: jobObj.jobTitle,
      companyName: jobObj.companyName,
      jobType: jobObj.jobType,
      location: jobObj.location,
      locType: jobObj.locType,
      appliedOn: jobObj.appliedOn,
      status: jobObj.status,
      levelReached: jobObj.levelReached,
      salary: jobObj.salary
    };
    const result = await jobModel.create(j);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// retrieving:
const getAllJobs = async (iden) => {
  try {
    const result = await jobModel.find({userId: iden});
    return result;
  } catch (error) {
    console.error(error);
  }
};

//updating
const updateJob = async (id, jobObj) => {
  try {
    const result = await jobModel.findByIdAndUpdate(id, {
      jobTitle: jobObj.jobTitle,
      companyName: jobObj.companyName,
      jobType: jobObj.jobType,
      location: jobObj.location,
      locType: jobObj.locType,
      appliedOn: jobObj.appliedOn,
      status: jobObj.status,
      levelReached: jobObj.levelReached,
      salary: jobObj.salary
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

//deleting:
const deleteJob = async (id) => {
  try {
    const result = await jobModel.findByIdAndDelete(id);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export { getAllJobs, createJob, updateJob, deleteJob };