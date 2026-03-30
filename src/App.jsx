import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function App() {
  const API_URL = 'http://localhost:8000';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? children : <Navigate to='/login' />;
  }

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || {});

  //search
  const [searchText, setSearchText] = useState('');

  return (
    <Router>
      {/* <Header handleSidebarToggle={handleSidebarToggle} searchText={searchText} setSearchText={setSearchText} /> */}

      {isSidebarOpen && (
        <div className="h-screen bg-gray-900 text-white w-[16vw] fixed left-0 top-16 border-r border-rose-500 ">
          <SideBar />
        </div>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage API_URL={API_URL} setUserInfo={setUserInfo}/>} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home API_URL={API_URL} searchText={searchText} />
          </ProtectedRoute>
        } />
        <Route path="/Settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App;
