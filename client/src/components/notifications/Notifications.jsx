import React, {Component} from 'react';
import {connect} from 'react-redux';
import {readNotifs} from '../../store/actions/notificationActions';
import NotifCard from './NotifCard';
import './Notifications.css';

class Notifications extends Component{
    componentDidMount(){
        this.props.readNotifs(this.props.uid);
    }

    render(){
        return(
            <div className ='text-white notifications'>
                <NotifCard/>
                <NotifCard/>
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