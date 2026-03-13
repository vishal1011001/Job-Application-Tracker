export function OpenJob({ displayId, jobs, setJobs, setIsJobOpen }) {
  const openJobClose = () => {
    setIsJobOpen(false);
  }

  const handleDeleteButton = async () => {
    openJobClose();
    const id = jobToDisplay._id;
    try {
      const response = await fetch(`http://localhost:8000/jobs/${id}`, {
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

  return (
    <div className="flex justify-center w-full h-full p-4">

      <div className="grid grid-cols-3 grid-rows-3 w-full ">
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Role</h2>
          <input value={jobToDisplay.jobTitle} className="outline-0"/>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-63 mb-1.5">Company</h2>
          <p>
            {jobToDisplay.companyName}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700 ">
          <h2 className="border-b w-50">Type</h2>
          <p>
            {jobToDisplay.jobType}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Location</h2>
          <p>
            {jobToDisplay.location}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Loc Type</h2>
          <p>
            {jobToDisplay.locType}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Applied On</h2>
          <p>
            {new Date(jobToDisplay.appliedOn).toLocaleDateString()}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Status</h2>
          <p>
            {jobToDisplay.status ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Level</h2>
          <p>
            {jobToDisplay.levelReached}
          </p>
        </div>
        <div className="text-xl border w-70 p-3 rounded-2xl h-3/4 shadow shadow-green-700">
          <h2 className="border-b w-50">Salary</h2>
          <p>
            ${jobToDisplay.salary?.toLocaleString()}
          </p>
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
        onClick={openJobClose}
        className="hover:bg-gray-200 h-10 p-2 rounded"
      >Close</button>
    </div>
  );
}