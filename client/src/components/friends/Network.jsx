import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeRequest, readRequests} from '../../store/actions/friendsActions';
import FriendRequest from './FriendRequest';
import './Network.css';

class Network extends Component{
    constructor(){
        super();
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    componentDidMount(){
        this.props.readRequests(this.props.uid);
    }
    
    deleteRequest(id){
        const {
            removeRequest
        } = this.props;

        removeRequest(id);
    }

    componentDidUpdate(prevProps){
        const {unreadRequests} = this.props;

        if(prevProps.unreadRequests !== unreadRequests && unreadRequests!==0){   
            window.location.reload();
        }
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const requests = this.props.requests.map(request =>
            <FriendRequest 
                key={request._id} 
                request={request} 
                deleteRequest={this.deleteRequest}
            />
        );

        return(
            <div className = 'network'>
                {requests.length === 0? <h1 className ='no-requests text-center'>Friend Requests Unavailable</h1>:
                <div className ='fr-container'>
                    {requests}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid, 
        requests: state.friends.requests,
        unreadRequests: state.friends.unreadRequests
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        removeRequest: (requestId, requests) => {dispatch(removeRequest(requestId, requests));},
        readRequests: (uid) => {dispatch(readRequests(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);