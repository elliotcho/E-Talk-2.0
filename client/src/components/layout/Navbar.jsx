import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar(){
    const signOut = (e) =>{
        e.preventDefault();
        window.localStorage.clear();
        window.location.href='/';
    }

    return(
        <div className='text-white'>
            <nav className='navbar'>
                <Link exact to='/' className='navbar-brand'>E-Talk</Link>
            
                <ul className='mt-3'>
                    <li>
                        <Link exact to ='/' className='link'>
                            <i className='fa fa-home'></i>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to='/' className='link'>
                            <i className='fas fa-user-friends'></i>
                        </Link>
                    </li>
                    
                    
                    <li>
                        <Link to='/' className='link'>
                            <i className='fas fa-comment'></i>
                        </Link>
                    </li>

                    <li>
                        <Link to='/' className='link'>
                            <i className='fas fa-bell'></i>
                        </Link>
                    </li>

                    <li>
                        <Link to ='/' className='btn btn-circle btn-md link'>
                            JD
                        </Link>
                    </li>

                    <li>
                        <Link to='/' className='link'>
                            <i className='fas fa-user-cog'></i>
                        </Link>
                    </li>

                    <li>
                        <a onClick ={signOut} href='/' className='link'>
                            <i className='fas fa-sign-out-alt'></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;