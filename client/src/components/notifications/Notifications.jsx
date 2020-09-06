import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {readNotifs} from '../../store/actions/notificationActions';
import NotifCard from './NotifCard';
import './Notifications.css';

class Notifications extends Component{
    componentDidMount(){
        //load/read all notifications
        this.props.dispatch(readNotifs(this.props.uid));
    }

    componentDidUpdate(prevProps){
        const {unreadNotifs} = this.props;

        //refresh page on new notifications
        if(prevProps.unreadNotifs !== unreadNotifs && unreadNotifs!==0){   
            window.location.reload();
        }
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const notifs = this.props.notifs.map(notif =>
            <NotifCard key={notif._id} notif={notif}/>
        );

        return(
            <div className ='text-white notifications'>
                 {notifs.length === 0? 
                    (<h1 className ='no-notifs text-center'>
                        Notifications Unavailable
                    </h1>):
                    (<div className ='notif-container'>
                        {notifs}
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid, 
        notifs: state.notifs.notifs,
        unreadNotifs: state.notifs.unreadNotifs
    }
}
const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);