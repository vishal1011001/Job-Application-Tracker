import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Page2 from './pages/Page2';

function App() {
  const [currPage, setCurrPage] = useState('Applications');
  console.log(currPage);
  return (
    <Router>
      <Routes>
        {(currPage === "Page2") && (
          <Route path="/page2" element={<Page2 />}/>
        )}

        <Route path="/" element={<Home setCurrPage={setCurrPage}/>} />
      </Routes>
    </Router>
  )
}

export default App
