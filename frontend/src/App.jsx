import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Search from "./components/Pages/SearchWeb.jsx";
import Home from "./components/Pages/Home.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />

        </Routes>
  )
}

export default App
