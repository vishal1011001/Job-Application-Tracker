import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page2 from './pages/Page2';
import { SideBar } from './components/SideBar';

function App() {
  const API_URL = 'http://localhost:8000';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <Router>
      {isSidebarOpen && (
        <div className="h-screen bg-gray-900 text-white w-[16vw] fixed left-0 top-16 border-r border-rose-500 ">
          <SideBar />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home API_URL={API_URL} handleSidebarToggle={handleSidebarToggle} />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </Router>
  )
}

export default App
