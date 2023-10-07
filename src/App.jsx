import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MyState from './Context/data/myState'
import Home from './Pages/home/Home'
import Signup from './Pages/signup/Signup';
import Login from './Pages/login/Login';
import AddNote from './Pages/addnote/AddNote';
import UpdateNote from './Pages/updatenote/UpdateNote'
import Profile from './Pages/profile/Profile'
import NoPage from './Pages/nopage/NoPage';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addnote" element={
              <ProtectedRoute>
                <AddNote />

              </ProtectedRoute>

            } />
            <Route path="/notes/edit/:id" element={
              <ProtectedRoute>
                <UpdateNote />

              </ProtectedRoute>

            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />

              </ProtectedRoute>

            } />
            <Route path="/*" element={<NoPage />} />

          </Routes>
        </Router>

      </MyState>


    </>
  )
}

export default App


export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}