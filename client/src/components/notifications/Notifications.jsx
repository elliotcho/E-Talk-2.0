import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readNotifs} from '../../store/actions/notificationActions';
import {Redirect} from 'react-router-dom';
import NotifCard from './NotifCard';
import './Notifications.css';

class Notifications extends Component{
    componentDidMount(){
        this.props.readNotifs(this.props.uid);
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const notifs = this.props.notifs.map(notif =>
            <NotifCard
                key = {notif._id}
                notif = {notif}
            />
        );

        return(
            <div className ='text-white notifications'>
                 {notifs.length === 0? <h1 className ='no-notifs text-center'>Notifications Unavailable</h1>:
                <div className ='notif-container'>
                    {notifs}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid, 
        notifs: state.notifs.notifs
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        readNotifs: (uid) => {dispatch(readNotifs(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);