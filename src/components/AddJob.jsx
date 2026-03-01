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
    <div className="flex flex-col gap-2 p-7">
      <input placeholder="Role"
        className="bg-white p-3 rounded-2xl shadow w-80"
        value={jobTitle}
        onChange={handleJobTitleChange} />

      <input placeholder="Company Name"
        className="bg-white p-3 rounded-2xl shadow"
        value={companyName}
        onChange={handleCompanyNameChange} />

      <label className="p-1">
        <select 
          className="p-3 w-30 outline-0"
        value={selectedJobType} onChange={handleJobTypeChange} >
          {jobTypes.map((jobType) => (
            <option key={jobType.value} value={jobType.value} >
              {jobType.label}
            </option>
          ))}
        </select>
      </label>


      <input placeholder="Location"
        className="bg-white p-3 rounded-2xl shadow"
        value={location}
        onChange={handleLocationChange} />
      
      <label className="p-1">
        <select className="p-3 w-30 outline-0" value={selectedLocType} onChange={handleLocTypeChange} >
          {locTypes.map((locType) => (
            <option key={locType.value} value={locType.value} >
              {locType.label}
            </option>
          ))}
        </select>
      </label>

      <input type="date" className="w-50 ml-4"
        value={appliedOn}
        onChange={handleAppliedOnChange} />

      <label className="p-1">
        <select className="p-3 w-40 outline-0" value={selectedLevelR} onChange={handleLevelRChange} >
          {levelRs.map((levelR) => (
            <option key={levelR.value} value={levelR.value} >
              {levelR.label}
            </option>
          ))}
        </select>
      </label>

      <input type="number" placeholder="Salary"
        className="bg-white p-3 rounded-2xl shadow"
        value={salary}
        onChange={handleSalaryChange} />

      <button
        onClick={addJob}
      >Add Job</button>

      <button
        className="bg-white w-20 self-center"
        onClick={handleCloseAddJob}
      >Close</button>
    </div>
  );
}