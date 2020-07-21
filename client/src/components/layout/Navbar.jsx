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

    const computeInitials = (firstName, lastName) =>(
        firstName!==null && lastName!==null? 
        firstName[0].toUpperCase() + lastName[0].toUpperCase():
        "..."
    )

    useEffect(() => {props.getUserInfo(props.uid);})

    return(
        <div className='text-white navbar-container'>
            <nav className='navbar navbar-expand-md'>
                <Link to='/' className ='navbar-brand'>E-Talk</Link>
            
                <button className='navbar-toggler' data-toggle='collapse' data-target='#links'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className ='collapse navbar-collapse' id='links'>
                    <form>
                        <input className='form-control' 
                            type='text' 
                            placeholder ='Search'
                        />
                    </form>

                    <ul className ='navbar-nav ml-auto'>
                        <Link to ='/' className ='link'>
                            <i className='fa fa-home mr-2'></i>
                            <span className='title'>Home</span>
                        </Link>
                     
                        <Link to ='/mynetwork' className ='link'>
                            <i className='fas fa-user-friends mr-2'></i>
                            <span className='title'>Find Friends</span>
                        </Link>
                        
                        <Link to ='/' className ='link'>
                            <i className='fas fa-comment mr-2'></i>
                            <span className='title'>Messages</span>
                        </Link>
                    
                        <Link to ='/' className ='link'>
                            <i className='fas fa-bell mr-2'></i>
                            <span className='title'>Notifications</span>
                        </Link>
                        
                        <Link to ={`/profile/${props.uid}/posts`} className = 'link'>
                            <i className = 'fa fa-address-card mr-2'></i>

                            <span className='btn btn-circle btn-md mr-2'>
                                {computeInitials(props.firstName, props.lastName)}
                            </span>
                            
                            <span className='title'>Profile</span>
                        </Link>
            
                        <Link to ='/' className ='link'>
                            <i className='fas fa-user-cog mr-2'></i>
                            <span className='title'>Settings</span>
                        </Link>

                        <a onClick ={signOut} href='/' className='link'>
                            <i className='fas fa-sign-out-alt mr-2'></i>
                            <span className='title'>Sign Out</span>
                        </a>
                    </ul>
                </div>
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