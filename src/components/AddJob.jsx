import { useState } from "react";
import { sortByValue } from "../utility/sort";

export function AddJob({ setIsInput, setJobs, lastSortParameter, isAscending, setOriginalOrder}) {
  const handleCloseAddJob = () => {
    setIsInput(false);
  }

  const jobTypes = [{
    value: "full-time",
    label: "Full-Time"
  },
  {
    value: "internship",
    label: "Internship"
  }
  ];

  const locTypes = [{
    value: "On-site",
    label: "On-site",
  }, {
    value: "Remote",
    label: "Remote",
  }, {
    value: "Hybrid",
    label: "Hybrid",
  }]

  const [selectedJobType, setSelectedJobType] = useState('full-time');

  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
  }

  const [selectedLocType, setSelectedLocType] = useState('On-site');
  const handleLocTypeChange = (e) => {
    setSelectedLocType(e.target.value);
  }

  const levelRs = [{
    value: "Applied",
    label: "Applied"
  }, {
    value: "OA Round",
    label: "OA Round"
  }, {
    value: "Briefing Round",
    label: "Briefing Round"
  }, {
    value: "HR screening",
    label: "HR screening"
  }, {
    value: "Offer",
    label: "Offer"
  }]

  const [selectedLevelR, setSelectedLevelR] = useState('Applied');
  const handleLevelRChange = (e) => {
    setSelectedLevelR(e.target.value);
  }

  const [jobTitle, setJobTitle] = useState('');
  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  }

  const [companyName, setCompanyName] = useState('');
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  }

  const [location, setLocation] = useState('');
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const [appliedOn, setAppliedOn] = useState('');
  const handleAppliedOnChange = (e) => {
    setAppliedOn(e.target.value);
  }

  const [salary, setSalary] = useState('');
  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  }

  // POST 
  const addJob = async (e) => {
    e.preventDefault();
    try {
      const jobObj = {
        jobTitle: jobTitle,
        companyName: companyName,
        jobType: selectedJobType,
        location: location,
        locType: selectedLocType,
        appliedOn: appliedOn,
        status: true,
        levelReached: selectedLevelR,
        salary: salary
      }

      const response = await fetch('http://localhost:8000/jobs', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobObj)
      });

      if (response.ok) {
        const data = await response.json();
        
        setOriginalOrder(data);

        if (lastSortParameter !== '') {
          setJobs(sortByValue(isAscending, data, lastSortParameter));
        } else {
          setJobs(data);
        }

      } else {
        throw new Error("Error Adding a job.");
      }

    } catch (error) {
      console.error("Error Adding job:", error);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-2xl fixed self-center top-2/11 bg-slate-800 w-[50vw] p-5 z-2">
      <h3 className="text-white font-bold text-2xl self-cente mb-2">Fill the details of Application</h3>
      <form onSubmit={addJob} className="grid grid-cols-2 gap-4">
        <div className="grid gap-3 [&>p]:text-white">
          <p>Job Postion:</p>
          <input placeholder="Role"
            className="bg-white  p-3 rounded-2xl shadow outline-0"
            value={jobTitle}
            onChange={handleJobTitleChange} />

          <p>Company Name:</p>
          <input placeholder="Company Name"
            className="bg-white p-3 rounded-2xl shadow outline-0"
            value={companyName}
            onChange={handleCompanyNameChange} />

          <p>Location of work/company:</p>
          <input placeholder="Location"
            className="bg-white p-3 rounded-2xl shadow outline-0"
            value={location}
            onChange={handleLocationChange} />

          <p>Salary offered:</p>
          <input type="number" placeholder="Salary"
            className="bg-white p-3 rounded-2xl shadow outline-0"
            value={salary}
            onChange={handleSalaryChange} />
        </div>

        {/* LEFT DIV */}
        <div className="grid gap-3 [&>p]:text-white ">
          <p>Job type:</p>
          <label className="p-1">
            <select
              className="p-2 w-full outline-0 shadow bg-white shadow-emerald-200 rounded"
              value={selectedJobType} onChange={handleJobTypeChange} >
              {jobTypes.map((jobType) => (
                <option key={jobType.value} value={jobType.value} >
                  {jobType.label}
                </option>
              ))}
            </select>
          </label>


          <p>Location type:</p>
          <label className="p-1">
            <select className="p-3 w-full outline-0 shadow bg-white shadow-emerald-200 rounded"
              value={selectedLocType} onChange={handleLocTypeChange} >
              {locTypes.map((locType) => (
                <option
                  className=""
                  key={locType.value} value={locType.value} >
                  {locType.label}
                </option>
              ))}
            </select>
          </label>

          <p>Applied on:</p>
          <input type="date" className="bg-white w-full rounded outline-0 p-2"
            value={appliedOn}
            onChange={handleAppliedOnChange} />

          <p>Current Application Stage:</p>
          <label className="p-1">
            <select className="p-3 w-full outline-0 bg-white shadow shadow-emerald-200 rounded"
              value={selectedLevelR} onChange={handleLevelRChange} >
              {levelRs.map((levelR) => (
                <option key={levelR.value} value={levelR.value} >
                  {levelR.label}
                </option>
              ))}
            </select>
          </label>
        </div>


        <div className="flex gap-2 mt-4">
          <button
            className="bg-blue-800 text-white w-25 p-2 self-center rounded hover:bg-white hover:text-blue-950 border border-blue-950 transition-all duration-100"
            type="submit"
            onClick={addJob}
          >Add Job</button>

          <button
            className="bg-white w-25 self-center hover:bg-gray-400 p-2 rounded"
            onClick={handleCloseAddJob}
          >Close</button>
        </div>
      </form>

    </div>
  );
}