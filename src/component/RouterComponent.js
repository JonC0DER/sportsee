import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import ChooseUser from '../pages/ChooseUser';

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<ChooseUser />} />
      <Route path="/user/:id" element={<Home />} />
    </Routes>
  )
}

export default RouterComponent