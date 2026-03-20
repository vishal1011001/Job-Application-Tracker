export function RenderJobs({ jobs, setIsJobOpen, setDisplayId, searchText }) {
  const jobOpened = (id) => {
    setIsJobOpen(true);
    setDisplayId(id);
  }

  let jobsToDisplay = [];
  if(searchText === '') {
    jobsToDisplay = jobs;
  } else {
    jobsToDisplay = jobs.filter(job => (job.jobTitle.toLowerCase().trim().includes(searchText.toLowerCase().trim()) || 
                                       (job.companyName.toLowerCase().trim().includes(searchText.toLowerCase().trim()))));
  }

  return (
    <div className=" rounded-2xl flex flex-col gap-4">

      <div className="grid grid-cols-9 text-center font-bold font-mono border bg-emerald-900 text-white rounded-2xl">
        <p className="border-r p-2 bg-emerald-600 rounded-tl-2xl">Role</p>
        <p className="border-r p-2 bg-emerald-600">Company</p>
        <p className="border-r p-2 bg-emerald-600">Type</p>
        <p className="border-r p-2 bg-emerald-600">Location</p>
        <p className="border-r p-2 bg-emerald-600">Loc Type</p>
        <p className="border-r p-2 bg-emerald-600">Applied On</p>
        <p className="border-r p-2 bg-emerald-600">Status</p>
        <p className="border-r p-2 bg-emerald-600">Level</p>
        <p className="p-2 bg-emerald-600 rounded-tr-2xl" >Salary</p>
      </div>
      {jobsToDisplay.map((job) => (
        <div key={job._id}
          onClick={() => jobOpened(job._id)}
          className="grid grid-cols-9 h-[7vh] items-center text-nowrap text-center rounded-2xl shadow shadow-gray-400"
        >
          <p className="bg-slate-700 rounded-2xl shadow ml-1 text-white p-2 ">{job.jobTitle}</p>
          <p className="border-r p-2">{job.companyName}</p>
          <p className="border-r p-2">{job.jobType}</p>
          <p className="border-r p-2">{job.location}</p>
          <p className="border-r p-2">{job.locType}</p>
          <p className="p-2">{new Date(job.appliedOn).toLocaleDateString()}</p>
          <p className={`p-2 justify-self-center rounded-2xl text-white w-40 ${job.status ? 'bg-green-600' : 'bg-red-600'}`}>{(job.status) ? 'Active': 'InActive'}</p>
          <p className="border-r p-2">{job.levelReached}</p>
          <p>₹ {job.salary?.toLocaleString()}</p>

        </div>
      ))}
    </div>
  );
}