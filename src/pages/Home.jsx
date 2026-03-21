import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";
import { OpenJob } from "../components/OpenJob";
import { Header } from "../components/Header";

function Home({ API_URL, handleSidebarToggle }) {
  const [jobs, setJobs] = useState([]);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [displayId, setDisplayId] = useState(0);

  //search
  const [searchText, setSearchText] = useState('');


  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);

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
      <Header handleSidebarToggle={handleSidebarToggle} searchText={searchText} setSearchText={setSearchText} />


      <div className="mt-18 p-1.5">
        <RenderJobs jobs={jobs} setJobs={setJobs} setIsJobOpen={setIsJobOpen} setDisplayId={setDisplayId} searchText={searchText} />
      </div>

      <button
        className="absolute bottom-1 right-1 bg-cyan-950 text-white rounded-full text-2xl h-10 w-10"
        onClick={handleJobAdd}
      ><img src='/add.png'/></button>

      {isInput && (
        <div className="flex items-center justify-center w-screen h-screen absolute z-10">
          <div
            className="bg-[url('/bg-x.jpg')] bg-cover bg-center shadow shadow-cyan-950 h-[75vh] w-[30vw] justify-items-center rounded-2xl"
          >
            <AddJob setIsInput={setIsInput} setJobs={setJobs} />
          </div>
        </div>
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