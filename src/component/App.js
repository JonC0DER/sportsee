import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import VnavBar from './VnavBar';
import RouterComponent from './RouterComponent';

/**
 * that function return all the application to the index.js
 * @returns {component} 
 */
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="vnav-and-content">
        <VnavBar />
        <RouterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App