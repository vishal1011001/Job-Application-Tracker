import { useState } from "react";

export function AddJob({ setIsInput, setJobs }) {
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

  const addJob = async () => {
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
        console.log(data);
        setJobs(data);
      } else {
        throw new Error("Error Adding a job.");
      }

    } catch (error) {
      console.error("Error Adding job:", error);
    }
  }

  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl">
      <input placeholder="Role"
        className="bg-gray-100 p-3 rounded-2xl shadow w-80 outline-0"
        value={jobTitle}
        onChange={handleJobTitleChange} />

      <input placeholder="Company Name"
        className="bg-gray-100 p-3 rounded-2xl shadow outline-0"
        value={companyName}
        onChange={handleCompanyNameChange} />

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


      <input placeholder="Location"
        className="bg-gray-100 p-3 rounded-2xl shadow outline-0"
        value={location}
        onChange={handleLocationChange} />

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

      <input type="date" className="bg-white w-full rounded outline-0 p-2"
        value={appliedOn}
        onChange={handleAppliedOnChange} />

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

      <input type="number" placeholder="Salary"
        className="bg-gray-100 p-3 rounded-2xl shadow outline-0"
        value={salary}
        onChange={handleSalaryChange} />

      <div className="flex justify-center gap-2 mt-4">
        <button
          className="bg-blue-950 text-white w-25 p-2 self-center rounded hover:bg-gray-100 hover:text-blue-950 border border-blue-950 transition-all duration-100"
          onClick={addJob}
        >Add Job</button>

        <button
          className="bg-gray-300 w-25 self-center hover:bg-gray-400 p-2 rounded"
          onClick={handleCloseAddJob}
        >Close</button>
      </div>
    </div>
  );
}