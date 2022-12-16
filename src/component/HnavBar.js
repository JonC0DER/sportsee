import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * the component return the Horizontal navigation menu
 * @returns 
 */
function HnavBar (){
  return (
      <nav className='h-nav'>
          <ul>
              <li><NavLink to="/">Accueil</NavLink></li>
              <li><NavLink to="/profile">Profil</NavLink></li>
              <li><NavLink to="/setting">Réglage</NavLink></li>
              <li><NavLink to="/community">Communité</NavLink></li>
          </ul>
      </nav>
  )
}

export default HnavBar;