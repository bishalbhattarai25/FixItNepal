import { useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage';
import NavBar from './Components/Navigation/NavBar';
import { Route, Router, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <NavBar/>
    <Router>
      <Routes>
        <Route></Route>
      </Routes>
    </Router>

        <HomePage/>
    </>
  )
}

export default App
