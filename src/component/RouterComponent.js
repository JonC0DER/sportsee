import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import UserAccount from '../pages/UserAccount';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<UserAccount />} />
    </Routes>
  )
}

export default RouterComponent