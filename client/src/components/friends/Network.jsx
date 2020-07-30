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

    componentDidUpdate(prevProps){
     
    }

    deleteRequest(id){
        const {
            requests,
            removeRequest
        } = this.props;

        removeRequest(id, requests);
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
        requests: state.friends.requests
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        removeRequest: (requestId, requests) => {dispatch(removeRequest(requestId, requests));},
        readRequests: (uid) => {dispatch(readRequests(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);