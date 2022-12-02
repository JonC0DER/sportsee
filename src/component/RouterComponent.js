import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/user/:id" element={<Home  />}/>
    </Routes>
  )
}

export default RouterComponent