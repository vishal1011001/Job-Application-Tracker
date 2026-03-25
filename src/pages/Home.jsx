import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";
import { OpenJob } from "../components/OpenJob";
import { UtilityButtons } from "../components/UtilityButtons";
import { sortByValue } from "../utility/sort";

function Home({ API_URL, searchText }) {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);

  const [isJobOpen, setIsJobOpen] = useState(false);
  const [displayId, setDisplayId] = useState(0);

  //sorting and order
  const [originalOrder, setOriginalOrder] = useState(jobs); // for reset filters
  const [lastSortParameter, setLastSortParameter] = useState('');

  const [isAscending, setIsAscending] = useState(true);
  const handleSort = (param) => {
    const newIsAscending = !isAscending;
    setIsAscending(newIsAscending);
    setLastSortParameter(param);
    setJobs(sortByValue(newIsAscending, jobs, param));
  }

  //acitve only
  const [isActiveOnly, setIsActiveOnly] = useState(false);
  const handleActiveOnlyFilter = () => {
    setIsActiveOnly(!isActiveOnly);
  }

  useEffect(() => {
    if(isActiveOnly) {
      setDisplayedJobs(jobs.filter(job => job.status === true));
    } else {
      setDisplayedJobs(jobs);
    }
  }, [jobs, isActiveOnly]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobs(data);
        setOriginalOrder(data);
      } else {
        throw new Error("Error fetcing jobs.");
      }

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const [isInput, setIsInput] = useState(false);


  return (
    <div className="flex justify-center flex-col">
      <UtilityButtons originalOrder={originalOrder} jobs={jobs} setJobs={setJobs} setIsInput={setIsInput} isActiveOnly={isActiveOnly} setIsActiveOnly={setIsActiveOnly} handleActiveOnlyFilter={handleActiveOnlyFilter} />

      <div className="p-5">
        <RenderJobs displayedJobs={displayedJobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} setDisplayId={setDisplayId} searchText={searchText} handleSort={handleSort} setLastSortParameter={setLastSortParameter} />
      </div>


      {isInput && (
        <AddJob setIsInput={setIsInput} setJobs={setJobs} lastSortParameter={lastSortParameter} isAscending={isAscending} setOriginalOrder={setOriginalOrder} />
      )}

      {isJobOpen && (
        <div className="z-3 fixed top-2/10 bg-linear-100 from-slate-900 to-gray-600 border-b-blue-950 border-2 rounded-2xl w-5xl h-120 self-center align-middle">
          <OpenJob API_URL={API_URL} displayId={displayId} jobs={jobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} lastSortParameter={lastSortParameter} isAscending={isAscending} setOriginalOrder={setOriginalOrder} />
        </div>
      )}
    </div>
  );
}

export default Home;