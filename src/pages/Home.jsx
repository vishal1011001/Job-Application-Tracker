import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";

function Home() {
  const [jobs, setJobs] = useState([]);

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
    <div className="flex">
      <header className="h-14 bg-gray-900 fixed z-2 text-white text-3xl text-center w-screen">
        This is the header
      </header>

      <div
        className="h-screen bg-blue-950 text-white w-30 mt-14"
      >SIDEBAR</div>

      <div
        className="mt-14"
      ><RenderJobs jobs={jobs} /></div>

      <button
        className="absolute bottom-1 right-1 bg-cyan-950 text-white
          rounded-full text-2xl h-10 w-10
        "

        onClick={handleJobAdd}
      >+</button>

      {isInput && (
        <div className="flex items-center justify-center w-screen h-screen absolute z-10">
          <div
            className="bg-white shadow shadow-cyan-950 h-[80vh] w-xl justify-items-center"
          >
            <AddJob setIsInput={setIsInput} setJobs={setJobs}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;