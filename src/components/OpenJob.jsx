export function OpenJob({ displayId, jobs, setJobs }) {
  const handleDeleteButton = (e) => {
    const id = e.target.id;
    try {
      const response = fetch(`http://localhost:8000/jobs/${id}`);

      if (response.ok) {
        const data = response.json();
        setJobs(data);
      }
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  }

  const jobToDisplay = jobs.find(job => job._id === displayId);
  console.log(jobToDisplay);

  return (
    <div className="flex justify-center w-full h-full p-4">

      <h3>Job</h3>

      {/* <div className="grid grid-cols-4 border h-10 w-2/5 bg-emerald-900 text-white">
        <div className="border-r p-2   ">Role</div>
        <div className="border-r p-2  ">Company</div>
        <div className="border-r p-2  ">Type</div>
        <div className="border-r p-2  ">Location</div>
      </div>

      <div className="grid grid-cols-5 border h-10 w-2/4 bg-emerald-900 text-white">
        <div className="border-r p-2  ">Loc Type</div>
        <div className="border-r p-2  ">Applied On</div>
        <div className="border-r p-2  ">Status</div>
        <div className="border-r p-2  ">Level</div>
        <div className="p-2  ">Salary</div>
      </div> */}

      <div className="grid grid-cols-3 grid-rows-3 border w-full ">
        <div className="border-r p-2 ">
          <h2>Role</h2>
          <p>
            {jobToDisplay.jobTitle}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Company</h2>
          <p>
            {jobToDisplay.companyName}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Type</h2>
          <p>
            {jobToDisplay.jobType}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Location</h2>
          <p>
            {jobToDisplay.location}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Loc Type</h2>
          <p>
            {jobToDisplay.locType}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Applied On</h2>
          <p>
            {new Date(jobToDisplay.appliedOn).toLocaleDateString()}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Status</h2>
          <p>
            {jobToDisplay.status ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="border-r p-2 ">
          <h2>Level</h2>
          <p>
            {jobToDisplay.levelReached}
          </p>
        </div>
        <div className="p-2  ">
          <h2>Salary</h2>
          <p>
            ${jobToDisplay.salary?.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={handleDeleteButton}
        className="absolute right-0"
      ><img
          className="h-7"
          src='/delete-icon.png' />
      </button>
    </div>
  );
}