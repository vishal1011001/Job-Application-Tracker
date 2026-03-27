export function UtilityButtons({ originalOrder, jobs, setJobs, setIsInput, isActiveOnly, setIsActiveOnly, handleActiveOnlyFilter }) {
  const handleResetFilters = () => {
    setJobs(originalOrder);
  }

  const handleArchiveAll = () => {

  }

  const handleDashboardOpen = () => {

  }

  const handleActiveOnly = () => {
    setIsActiveOnly(!isActiveOnly);
    handleActiveOnlyFilter();
  }

  const handleJobAdd = () => {
    setIsInput(true);
  }

  return (
    <div className="grid grid-cols-5 gap-6 items-center mt-20 self-center w-[90vw] shadow shadow-slate-900 rounded-xl p-2">
      <button onClick={handleJobAdd} className="bg-linear-30 from-cyan-950 via-gray-700 to-slate-800
      text-white font-bold font-serif h-10 hover:bg-cyan-900 p-2 rounded-xl">
        Add Application
      </button>
      <button onClick={handleResetFilters} className="hover:bg-gray-200 p-2 rounded-xl ">Reset Filters</button>
      <button onClick={handleDashboardOpen} className="hover:bg-gray-200 p-2 rounded-xl">Dashboard</button>
      <button onClick={handleActiveOnly} className="hover:bg-gray-200 p-2 rounded-xl">Active-Only</button>
      <button onClick={handleArchiveAll} className="hover:bg-gray-200 p-2 rounded-xl">Archive All</button>
    </div>
  );
}