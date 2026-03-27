import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import SettingsPage from './pages/SettingsPage';

function App() {
  const API_URL = 'http://localhost:8000';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  //search
  const [searchText, setSearchText] = useState('');

  return (
    <Router>
      <Header handleSidebarToggle={handleSidebarToggle} searchText={searchText} setSearchText={setSearchText} />

      {isSidebarOpen && (
        <div className="h-screen bg-gray-900 text-white w-[16vw] fixed left-0 top-16 border-r border-rose-500 ">
          <SideBar />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home API_URL={API_URL} searchText={searchText} />} />
        <Route path="/Settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}

export default App;
