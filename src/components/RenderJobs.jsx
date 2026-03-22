import { useState } from "react";
import { sortByValue } from "../utility/sort";

export function RenderJobs({ jobs, setJobs, setIsJobOpen, setDisplayId, searchText }) {
  const jobOpened = (id) => {
    setIsJobOpen(true);
    setDisplayId(id);
  };

  //sorting
  const [isAscending, setIsAscending] = useState(true);
  const handleSort = (param) => {
    const newIsAscending = !isAscending;
    setIsAscending(newIsAscending);
    setJobs(sortByValue(newIsAscending, jobs, param));
  }

  let jobsToDisplay = [];
  if (searchText === '') {
    jobsToDisplay = jobs;
  } else {
    jobsToDisplay = jobs.filter(job => (job.jobTitle.toLowerCase().trim().includes(searchText.toLowerCase().trim()) ||
      (job.companyName.toLowerCase().trim().includes(searchText.toLowerCase().trim()))));
  };

  //color for levelReached
  const getLevelColor = (levelReached) => {
    const colorMap = {
      'Applied': 'bg-gray-300',
      'OA Round': 'bg-blue-300',
      'Briefing Round': 'bg-pink-300',
      'HR Screening': 'bg-yellow-300',
      'Offer': 'bg-green-300',
    };

    return colorMap[levelReached] || 'bg-white';
  }

  return (
    <div className=" rounded-2xl flex flex-col gap-4">

      <div className="grid grid-cols-9 text-center font-bold font-mono border bg-mist-700 text-white rounded-2xl rounded-b-none">
        <p className="border-r p-2 rounded-tl-2xl">Role</p>
        <p className="border-r p-2 ">Company</p>
        <p className="border-r p-2 ">Type</p>
        <button onClick={() => (handleSort('location'))} className="border-r p-2 cursor-pointer">Location ↕</button>
        <p className="border-r p-2 ">Loc Type</p>
        <p className="border-r p-2 ">Applied On</p>
        <p className="border-r p-2 ">Status</p>
        <p className="border-r p-2 ">Level</p>
        <button onClick={() => (handleSort('salary'))} className="p-2" >Salary ↕</button>
      </div>
      {jobsToDisplay.map((job) => (
        <div key={job._id}
          onClick={() => jobOpened(job._id)}
          className="grid grid-cols-9 h-[7vh] items-center text-nowrap text-center rounded-2xl shadow shadow-gray-400"
        >
          <p className="bg-slate-700 rounded-2xl shadow ml-1 text-white p-2 font-semibold">{job.jobTitle}</p>
          <p className="border-r p-2">{job.companyName}</p>
          <p className="border-r p-2">{job.jobType}</p>
          <p className="border-r p-2">{job.location}</p>
          <p className="border-r p-2">{job.locType}</p>
          <p className="p-2">{new Date(job.appliedOn).toLocaleDateString()}</p>
          <p className={`p-2 justify-self-center rounded-2xl text-white w-40 ${job.status ? 'bg-green-600' : 'bg-red-600'}`}>{(job.status) ? 'Active' : 'InActive'}</p>
          <p className={`p-2 rounded-xl ml-2 mr-2
            ${getLevelColor(job.levelReached)}
          `}>{job.levelReached}</p>
          <p>₹ {job.salary?.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}