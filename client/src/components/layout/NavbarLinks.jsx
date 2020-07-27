import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {io} from '../../App';
import { getUnreadRequests } from '../../store/actions/friendsActions';

class NavbarLinks extends Component{
    constructor(){
        super();
        this.signOut = this.signOut.bind(this);
        this.computeInitials = this.computeInitials.bind(this);
    }

    componentDidMount(){
        const {uid, getUserInfo, getUnreadRequests} = this.props;

        getUserInfo(uid);

        getUnreadRequests(uid);
    }

    signOut(e){
        e.preventDefault();

        io.emit('LOGOUT', {uid: this.props.uid});
        
        window.localStorage.clear();
        
        window.location.href='/';
    }

    computeInitials(firstName, lastName){
        return firstName!==null && lastName!==null? 
        firstName[0].toUpperCase() + lastName[0].toUpperCase():
        "..."
    }

    formatCount(num){
        if(num<=99){
            return num;
        }

        return "99+";
    }

    render(){
        const {uid, firstName, lastName, unreadRequests} = this.props;

        return(
            <ul className ='navbar-nav ml-auto'>
                <Link to ='/' className ='link'>
                    <i className='fa fa-home mr-2'></i>
                    <span className='title'>Home</span>
                </Link>
                     
                <Link to ='/mynetwork' className ='link'>
                    <i className='fas fa-user-friends mr-2'></i>
                    <span className='title'>Friend Requests</span>

                    <div className ='count-box'>{this.formatCount(5)}</div>
                </Link>
                        
                <Link to ='/' className ='link'>
                    <i className='fas fa-comment mr-2'></i>
                    <span className='title'>Messages</span>

                    <div className ='count-box'>{this.formatCount(30)}</div>
                </Link>
                    
                <Link to ='/notifications' className ='link'>
                    <i className='fas fa-bell mr-2'></i>
                    <span className='title'>Notifications</span>

                    <div className ='count-box'>{this.formatCount(300000)}</div>
                </Link>
                        
                <Link to ={`/profile/${uid}/posts`} className = 'link'>
                    <i className = 'fa fa-address-card mr-2'></i>

                    <span className='btn btn-circle btn-md mr-2'>
                        {this.computeInitials(firstName, lastName)}
                    </span>
                            
                    <span className='title'>Profile</span>
                </Link>
            
                <Link to ='/' className ='link'>
                    <i className='fas fa-user-cog mr-2'></i>
                    <span className='title'>Settings</span>
                </Link>

                <a onClick ={this.signOut} href='/' className='link'>
                    <i className='fas fa-sign-out-alt mr-2'></i>
                    <span className='title'>Sign Out</span>
                </a>
            </ul>
        )
    }
}

export default NavbarLinks;