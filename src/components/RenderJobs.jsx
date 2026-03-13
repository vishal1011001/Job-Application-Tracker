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
    <div className="border rounded-2xl ml-13">

      <div className="grid grid-cols-9 border bg-emerald-900 text-white rounded-2xl">
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
          className="grid grid-cols-9 not-last:border-b"
        >
          <p className="border-r p-2 ">{job.jobTitle}</p>
          <p className="border-r p-2">{job.companyName}</p>
          <p className="border-r p-2">{job.jobType}</p>
          <p className="border-r p-2">{job.location}</p>
          <p className="border-r p-2">{job.locType}</p>
          <p className="border-r p-2">{new Date(job.appliedOn).toLocaleDateString()}</p>
          <p className="border-r p-2">{(job.status) ? 'Active': 'InActive'}</p>
          <p className="border-r p-2">{job.levelReached}</p>
          <p>{job.salary?.toLocaleString()}</p>

        </div>
      ))}
    </div>
  );
}