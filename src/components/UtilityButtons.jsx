export function UtilityButtons({ originalOrder, setJobs, setIsInput }) {
  const handleResetOrder = () => {
    setJobs(originalOrder);
  }

  const handleFilter = () => {

  }

  const handleJobAdd = () => {
    setIsInput(true);
  }

  return (
    <div className="grid grid-cols-5 gap-2 items-center mt-20 self-center w-[90vw] shadow shadow-slate-900 rounded-xl p-2">
      <button onClick={handleJobAdd} className="bg-cyan-950 text-white font-bold font-serif h-10 hover:bg-cyan-900 p-2 rounded-xl ">Add Application</button>
      <button onClick={handleResetOrder} className=" hover:bg-gray-200 p-2 rounded-xl ">Reset Order</button>
      <button onClick={handleFilter} className="  hover:bg-gray-200 p-2 rounded-xl">Dashboard</button>
      <button onClick={handleFilter} className="  hover:bg-gray-200 p-2 rounded-xl">Active-Only</button>
      <button onClick={handleFilter} className="  hover:bg-gray-200 p-2 rounded-xl">Delete All</button>

    </div>
  );
}