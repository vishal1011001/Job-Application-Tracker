import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";
import { OpenJob } from "../components/OpenJob";
import { Header } from "../components/Header";
import { UtilityButtons } from "../components/UtilityButtons";

function Home({ API_URL, searchText }) {
  const [jobs, setJobs] = useState([]);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [displayId, setDisplayId] = useState(0);

  //sorting and order
  const [originalOrder, setOriginalOrder] = useState(jobs);


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
      <UtilityButtons originalOrder={originalOrder} jobs={jobs} setJobs={setJobs} setIsInput={setIsInput} />

      <div className="p-5">
        <RenderJobs jobs={jobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} setDisplayId={setDisplayId} searchText={searchText} />
      </div>


      {isInput && (
        <AddJob setIsInput={setIsInput} setJobs={setJobs} />
      )}

      {isJobOpen && (
        <div className="z-3 absolute top-2/8 bg-[url('/bg-y.jpg')] bg-cover bg-center border-b-blue-950 border-2 rounded-2xl w-5xl h-120 self-center align-middle">
          <OpenJob API_URL={API_URL} displayId={displayId} jobs={jobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} />
        </div>
      )}
    </div>
  );
}

export default Home;