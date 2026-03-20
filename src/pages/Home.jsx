import { useEffect, useState } from "react";
import { RenderJobs } from "../components/RenderJobs";
import { AddJob } from "../components/AddJob";
import { OpenJob } from "../components/OpenJob";
import { Search } from "../components/Search";
import { SideBar } from "../components/SideBar";
import { UserProfile } from "../components/UserProfile";

function Home({ API_URL, setCurrPage }) {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  //user profile
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const handleUserProfile = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  }

  return (
    <div className="flex justify-center">
      <header className="flex justify-between items-center h-16 p-4 bg-gray-900 fixed z-2 text-white text-3xl text-center w-screen">
        <button
          className=""
          onClick={handleSidebarToggle}
        ><img src='/hamburger-menu.png' className="h-8 self-center invert-100"/></button>
        <Search searchText={searchText} setSearchText={setSearchText} />
        <button 
          onClick={handleUserProfile}
        ><img src="/user.png" className="h-8"/></button>
      </header>

      {isSidebarOpen && (
        <div
          className="h-screen bg-gray-900 text-white w-[16vw] fixed left-0 top-16"
        ><SideBar setCurrPage={setCurrPage}/></div>
      )}

      {isUserProfileOpen && (
        <UserProfile />
      )}

      <div className="mt-18 p-1.5">
        <RenderJobs jobs={jobs} setIsJobOpen={setIsJobOpen} setDisplayId={setDisplayId} searchText={searchText} />
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