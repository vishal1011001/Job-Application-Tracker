export function RenderJobs({ jobs, setIsJobOpen, setDisplayId }) {
  const jobOpened = (id) => {
    setIsJobOpen(true);
    setDisplayId(id);
  }

  return (
    <div className="border">

      <div className="grid grid-cols-9 border bg-emerald-900 text-white">
        <p className="border-r p-2 bg-emerald-600 ">Role</p>
        <p className="border-r p-2 bg-emerald-600">Company</p>
        <p className="border-r p-2 bg-emerald-600">Type</p>
        <p className="border-r p-2 bg-emerald-600">Location</p>
        <p className="border-r p-2 bg-emerald-600">Loc Type</p>
        <p className="border-r p-2 bg-emerald-600">Applied On</p>
        <p className="border-r p-2 bg-emerald-600">Status</p>
        <p className="border-r p-2 bg-emerald-600">Level</p>
        <p className="p-2 bg-emerald-600">Salary</p>
      </div>
      {jobs.map((job) => (
        <div key={job._id}
          onClick={() => jobOpened(job._id)}
          className="grid grid-cols-9 border-b"
        >
          <p className="border-r p-2">{job.jobTitle}</p>
          <p className="border-r p-2">{job.companyName}</p>
          <p className="border-r p-2">{job.jobType}</p>
          <p className="border-r p-2">{job.location}</p>
          <p className="border-r p-2">{job.locType}</p>
          <p className="border-r p-2">{job.appliedOn}</p>
          <p className="border-r p-2">{job.status}</p>
          <p className="border-r p-2">{job.levelReached}</p>
          <p>{job.salary}</p>

        </div>
      ))}
    </div>
  );
}