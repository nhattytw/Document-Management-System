import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Documents from './components/Documents'
import PrivateRoute from './components/PrivateRoute'
import { getToken } from './utils/auth'
import Settings from './components/Settings'


function App() {
  const token = getToken()

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Documents /> : <Login />} />
        <Route path="/register" element={token ? <Documents /> : <Register />} />
        <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App