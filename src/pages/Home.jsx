import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";
import { OpenJob } from "../components/OpenJob";
import { Search } from "../components/Search";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [displayId, setDisplayId] = useState(0);

  //search
  const [searchText, setSearchText] = useState('');


  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8000/jobs');

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobs(data);
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
  const handleJobAdd = () => {
    setIsInput(true);
  }

  return (
    <div className="flex justify-center">
      <header className="flex justify-center h-14 p-2 bg-gray-900 fixed z-2 text-white text-3xl text-center w-screen">
        <Search searchText={searchText} setSearchText={setSearchText} />
      </header>

      <div
        className="h-screen bg-blue-950 text-white w-15 fixed left-0 top-14"
      >SIDEBAR</div>

      <div className="mt-14 ml-5 p-1.5">
        <RenderJobs jobs={jobs} setIsJobOpen={setIsJobOpen} setDisplayId={setDisplayId} searchText={searchText} />
      </div>

      <button
        className="absolute bottom-1 right-1 bg-cyan-950 text-white
          rounded-full text-2xl h-10 w-10
        "

        onClick={handleJobAdd}
      >+</button>

      {isInput && (
        <div className="flex items-center justify-center w-screen h-screen absolute z-10">
          <div
            className="bg-white shadow shadow-cyan-950 h-[75vh] w-[30vw] justify-items-center "
          >
            <AddJob setIsInput={setIsInput} setJobs={setJobs} />
          </div>
        </div>
      )}

      {isJobOpen && (
        <div className="z-3 absolute top-2/8 bg-white border-b-blue-950 border-2 rounded-2xl w-5xl h-100 self-center align-middle">
          <OpenJob displayId={displayId} jobs={jobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} />
        </div>
      )}
    </div>
  );
}

export default Home;