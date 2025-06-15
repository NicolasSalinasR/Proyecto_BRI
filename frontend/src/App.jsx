import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filter from './components/Filter.jsx'
import Plate from "./components/Plate.jsx";

function App() {

  return (
    <>
        <h1>Plataforma de Recetas</h1>
        <Filter />

        <Plate>

        </Plate>

        <button>Buscar</button>

    </>
  )
}

export default App
