import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {getNavbarInitials} from '../../store/actions/profileActions';
import {getUnreadRequests} from '../../store/actions/friendsActions';
import {getUnseenChats} from '../../store/actions/messagesActions';
import {getUnreadNotifs} from '../../store/actions/notificationActions';
import {io} from '../../App';

class NavbarLinks extends Component{
    constructor(){
        super();
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount(){
        const {uid, dispatch} = this.props;

        dispatch(getNavbarInitials(uid));
        dispatch(getUnreadRequests(uid));
        dispatch(getUnseenChats(uid));
        dispatch(getUnreadNotifs(uid));
    }

    signOut(e){
        e.preventDefault();

        io.emit('LOGOUT', {uid: this.props.uid});
        
        window.localStorage.clear();
        window.location.href='/';
    }

    formatCount(num){
        return num < 99? num: "99+";
    }

    render(){
        const {
            initials, 
            uid, 
            unreadRequests, 
            unseenChats, 
            unreadNotifs
        } = this.props;

        const friendIcon = (unreadRequests === 0)? '': 'text-white';
        const msgIcon = (unseenChats === 0)? '' : 'text-white';
        const notifIcon = (unreadNotifs === 0)? '': 'text-white';

        return(
            <ul className ='navbar-nav ml-auto'>
                <Link to ='/' className ='link'>
                    <i className='fa fa-home mr-2'/>

                    <span className='title'>
                        Home
                    </span>
                </Link>
                     
                <Link to ='/mynetwork' className ={`link ${friendIcon}`}>
                    <i className='fas fa-user-friends mr-2'/>

                    <span className='title'>
                        Friend Requests
                    </span>

                    {unreadRequests !== 0? 
                        (<div className ='count-box request'>
                            {this.formatCount(unreadRequests)}
                        </div>):
                        null
                    }
                </Link>
                        
                <Link onClick={this.toChats} to='/chat/home' className={`link ${msgIcon}`}>
                    <i className='fas fa-comment mr-2'/>

                    <span className='title'>
                        Messages
                    </span>

                    {unseenChats !== 0? 
                        (<div className ='count-box msg'>
                            {this.formatCount(unseenChats)}
                        </div>):
                        null    
                    }
                </Link>
                    
                <Link to ='/notifications' className={`link ${notifIcon}`}>
                    <i className='fas fa-bell mr-2'/>
                    
                    <span className='title'>
                        Notifications
                    </span>

                    {unreadNotifs !== 0? 
                        (<div className ='count-box notif'>
                            {this.formatCount(unreadNotifs)}
                        </div>):
                        null
                    }
                </Link>
                        
                <Link to ={`/profile/${uid}/posts`} className = 'link ml-2'>
                    <i className = 'fa fa-address-card mr-2'/>

                    <span className='btn btn-circle btn-md mr-2'>
                        {initials? initials: '...'}
                    </span>
                            
                    <span className='title'>
                        Profile
                    </span>
                </Link>
            
                <Link to ='/settings' className ='link'>
                    <i className='fas fa-user-cog mr-2'/>

                    <span className='title'>
                        Settings
                    </span>
                </Link>

                <Link onClick ={this.signOut} to='/' className='link'>
                    <i className='fas fa-sign-out-alt mr-2'/>

                    <span className='title'>
                        Sign Out
                    </span>
                </Link>
            </ul>
        )
    }
}

export default withRouter(NavbarLinks);