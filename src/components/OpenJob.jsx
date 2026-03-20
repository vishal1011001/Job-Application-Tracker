import { useEffect, useState } from "react";

export function OpenJob({ API_URL, displayId, jobs, setJobs, setIsJobOpen }) {
  const openJobClose = () => {
    setIsJobOpen(false);
  }

  const handleCloseButton = () => {
    updateJob();
    openJobClose();
  }

  const handleDeleteButton = async () => {
    openJobClose();
    const id = jobToDisplay._id;
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobs(data);
      }
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  }


  const jobToDisplay = jobs.find(job => job._id === displayId);

  const [jobTitle, setJobTitle] = useState(jobToDisplay.jobTitle);
  const [companyName, setCompanyName] = useState(jobToDisplay.companyName);
  const [jobType, setJobType] = useState(jobToDisplay.jobType);
  const [location, setLocation] = useState(jobToDisplay.location);
  const [locType, setLocType] = useState(jobToDisplay.locType);
  const [appliedOn, setAppliedOn] = useState(jobToDisplay.appliedOn);
  const [status, setStatus] = useState(jobToDisplay.status);
  const [levelReached, setLevelReached] = useState(jobToDisplay.levelReached);
  const [salary, setSalary] = useState(jobToDisplay.salary);

  const updateJob = async () => {
    try {
      
      const jobObj = {
        jobTitle: jobTitle,
        companyName: companyName,
        jobType: jobType,
        location: location,
        locType: locType,
        appliedOn: appliedOn,
        status: status,
        levelReached: levelReached,
        salary: salary
      }

      const id = jobToDisplay._id;

      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobObj)
      });

      if(response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        throw new Error('Error in updation.');
      }

    } catch (error) {
      console.error('Error updating job details:', error);
    }

  }

  return (
    <div className="flex justify-center w-full h-full p-4">

      <div className="grid grid-cols-3 grid-rows-3 w-full ">
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Role</h2>
          <input value={jobTitle} onChange={(e) => { setJobTitle(e.target.value) }} className="outline-0" />
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-63 mb-1.5">Company</h2>
          <input value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} className="outline-0" />
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700 ">
          <h2 className="border-b w-50">Type</h2>
          <select value={jobType} onChange={(e) => { setJobType(e.target.value) }} className="outline-0">
            <option value="Full-time" >Full Time</option>
            <option value="Internship" >Internship</option>
          </select>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Location</h2>
          <input value={location} onChange={(e) => { setLocation(e.target.value) }} className="outline-0" />
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Loc Type</h2>
          <select value={locType} onChange={(e) => { setLocType(e.target.value) }} className="outline-0">
            <option value="On-site" >On-site</option>
            <option value="Remote" >Remote</option>
          </select>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Applied On</h2>
          <input value={new Date(appliedOn).toLocaleDateString()} onChange={(e) => { setAppliedOn(e.target.value) }} className="outline-0" />
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Status</h2>
          <select value={status} onChange={(e) => { setStatus(e.target.value === 'true') }} className="outline-0">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Level</h2>
          <select value={levelReached} onChange={(e) => { setLevelReached(e.target.value) }} className="outline-0">
            <option value="Applied">Applied</option>
            <option value="OA Round">OA Round</option>
            <option value="Briefing Round">Briefing Round</option>
            <option value="HR Screening">HR Screening</option>
            <option value="Offer">Offer</option>
          </select>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Salary</h2>
          <input value={salary} onChange={(e) => { setSalary(e.target.value) }} className="outline-0" />
        </div>
      </div>

      <button
        onClick={handleDeleteButton}
        className="absolute right-5 bottom-5 hover:bg-gray-200 p-2 rounded-3xl"
      ><img
          className="h-7"
          src='/delete-icon.png' />
      </button>

      <button
        onClick={handleCloseButton}
        className="hover:bg-gray-200 h-10 p-2 rounded"
      >Close</button>
    </div>
  );
}