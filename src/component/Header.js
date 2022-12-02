import React from 'react';
import Logo from "../assets/images/svg/sportsee_logo.svg";
import HnavBar from './HnavBar';

function Header() {
  return (
      <header>
          <div className="logo">
              <img src={Logo} alt="sportsee logo" />
              <h1 className='logo-title'>SportSee</h1>
          </div>
          <HnavBar />
      </header>
  )
}

export default Header;