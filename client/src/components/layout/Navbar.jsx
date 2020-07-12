import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../../store/actions/profileActions';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar(props){
    const signOut = (e) =>{
        e.preventDefault();
        window.localStorage.clear();
        window.location.href='/';
    }

    useEffect(() => {props.getUserInfo(props.uid);})

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
                            {
                                props.firstName && props.lastName? 
                                props.firstName[0].toUpperCase() + props.lastName[0].toUpperCase():
                                "..."
                            }
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

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);