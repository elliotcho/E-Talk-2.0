import React from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';

function Navbar(){
    return(
        <div className='partials text-white'>
            <nav className='navbar'>
                <h2 className='navbar-brand'>E-Talk</h2>

                <button className='navbar-toggler' data-toggle='collapse' data-target='#icons'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse text-center' id='icons'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/'>PERSON 1</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;