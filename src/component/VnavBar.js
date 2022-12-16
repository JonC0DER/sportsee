import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * the component return the vertical navigation menu
 * and the copyright
 * @returns 
 */
function VnavBar() {

    return (
        <nav className="v-nav">
            <ul>
                <li>
                    <NavLink to="/meditation">
                        <i className="fas fa-hiking"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/natation">
                        <i className="fas fa-swimmer"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cyclisme">
                        <i className="fas fa-biking"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/musculation">
                        <i className="fas fa-dumbbell"></i>
                    </NavLink>
                </li>
            </ul>
            <h5 className="copyright">
                Copyright, SportSee 2020
            </h5>
        </nav>
    )
}

export default VnavBar;